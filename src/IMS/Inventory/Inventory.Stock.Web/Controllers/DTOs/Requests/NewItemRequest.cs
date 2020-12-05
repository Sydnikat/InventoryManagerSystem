using Inventory.Stock.Domain.Categories;
using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Controllers.DTOs.Requests
{
    public class NewItemRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double StockPrice { get; set; }

        [Required]
        public double SellPrice { get; set; }

        [Required]
        [Range(minimum: 0, maximum: int.MaxValue)]
        public int Stock { get; set; }

        public Item ToNew(Category category)
            => new Item(
                id: 0,
                name: Name,
                categoryId: category.Id,
                stockPrice: StockPrice,
                sellPrice: SellPrice,
                stock: Stock);
    }
}
