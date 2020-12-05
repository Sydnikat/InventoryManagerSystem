using Inventory.Stock.Domain.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Controllers.DTOs.Responses
{
    public class CategoryResponse
    {
        public CategoryResponse(long id, string name, List<ItemResponse> items)
        {
            Id = id;
            Name = name;
            Items = items;
        }

        public long Id { get; }

        public string Name { get; }
        public List<ItemResponse> Items { get; }

        public static CategoryResponse Of(Category category)
            => new CategoryResponse(
                id: category.Id,
                name: category.Name,
                items: category.Items.Select(ItemResponse.Of).ToList()
                );
    }
}
