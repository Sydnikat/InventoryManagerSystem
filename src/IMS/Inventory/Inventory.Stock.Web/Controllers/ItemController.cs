using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inventory.Stock.Dal.Items;
using Inventory.Stock.Web.Cache;
using Inventory.Stock.Web.Controllers.DTOs.Requests;
using Inventory.Stock.Web.Controllers.DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Stock.Web.Controllers
{
    [Route("api/stock/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository itemRepository;
        private CategoriesCache cache;

        public ItemController(IItemRepository itemRepository, CategoriesCache cache)
        {
            this.itemRepository = itemRepository;
            this.cache = cache;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ItemResponse>> SaveItem(long id, [FromBody] ItemUpdateRequest request)
        {
            if (request == null)
                return BadRequest();

            var item = await itemRepository.FindById(id).ConfigureAwait(false);

            item.SellPrice = request.SellPrice;
            item.StockPrice = request.StockPrice;
            item.Stock = request.Stock;


            var success = await itemRepository.Update(item).ConfigureAwait(false);

            if (success)
            {
                await cache.Invalidate(item.CategoryId);
                return Ok(ItemResponse.Of(item));
            }
            else
                return Conflict();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(long id)
        {
            var item = await itemRepository.FindById(id).ConfigureAwait(false);

            if (item == null)
                return NotFound();

            var success = await itemRepository.DeleteById(item.Id).ConfigureAwait(false);
            if (success)
            {
                await cache.Invalidate(item.CategoryId);
                return Ok();
            }
            else
                return Conflict();
        }
    }
}
