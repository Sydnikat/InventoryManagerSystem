using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inventory.Stock.Dal.Categories;
using Inventory.Stock.Web.Cache;
using Inventory.Stock.Web.Controllers.DTOs.Requests;
using Inventory.Stock.Web.Controllers.DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Stock.Web.Controllers
{
    [Route("api/stock/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        private CategoriesCache cache;

        public CategoryController(ICategoryRepository categoryRepository, CategoriesCache cache)
        {
            this.categoryRepository = categoryRepository;
            this.cache = cache;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetCategories()
        {
            var rand = new Random();
            if (rand.Next() % 5 == 0)
                return StatusCode(StatusCodes.Status503ServiceUnavailable);

            var categories = await categoryRepository.FindAll().ConfigureAwait(false);

            foreach (var category in categories)
                await cache.Set(category);
            
          
            var response = categories.Select(CategoryResponse.Of).ToList();
            return Ok(response);
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryResponse>> GetCategory(long id)
        {
            var cachedValue = await cache.TryGet(id);
            if (cachedValue != null)
            {
                Ok(CategoryResponse.Of(cachedValue)); 
            }

            var category = await categoryRepository.FindById(id).ConfigureAwait(false);

            if (category == null)
                return NotFound();

            return Ok(CategoryResponse.Of(category));
        }

        [HttpPost]
        public async Task<ActionResult<CategoryResponse>> SaveCategory([FromBody] NewCategoryRequest request)
        {
            if (request == null)
                return BadRequest();

            var newCategory = request.ToNew();

            var savedCategory = await categoryRepository.Insert(newCategory).ConfigureAwait(false);

            return Created(nameof(SaveCategory), CategoryResponse.Of(savedCategory));

        }

        [HttpPost("{id}/items")]
        public async Task<ActionResult<ItemResponse>> SaveItem(long id, [FromBody] NewItemRequest request)
        {
            var category = await cache.TryGet(id);
            if (category == null)
            {
                category = await categoryRepository.FindById(id).ConfigureAwait(false);
            }

            if (category == null)
                return NotFound();

            var newItem = request.ToNew(category);

            var savedItem = await categoryRepository.InsertItem(category.Id, newItem);
            if (savedItem != null)
            {
                await cache.Invalidate(id);
                return Created(nameof(SaveItem), ItemResponse.Of(savedItem));
            }
            else
                return Conflict();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(long id)
        {
            var category = await categoryRepository.FindById(id).ConfigureAwait(false);

            if (category == null)
                return NotFound();

            var success = await categoryRepository.DeleteById(category.Id).ConfigureAwait(false);
            if (success)
            {
                await cache.Invalidate(id);
                return Ok();
            }
            else
                return Conflict();
        }
    }
}
