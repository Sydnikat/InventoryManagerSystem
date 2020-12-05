using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Controllers.DTOs.Responses
{
    public class ItemResponse
    {
        public ItemResponse(long id, string name, long categoryId, double stockPrice, double sellPrice, int stock)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
            StockPrice = stockPrice;
            SellPrice = sellPrice;
            Stock = stock;
        }

        public long Id { get; }
        public string Name { get; }
        public long CategoryId { get; }
        public double StockPrice { get;}
        public double SellPrice { get; }
        public int Stock { get; }

        public static ItemResponse Of(Item item)
            => new ItemResponse(
                id: item.Id,
                name: item.Name,
                categoryId: item.CategoryId,
                stockPrice: item.StockPrice,
                sellPrice: item.SellPrice,
                stock: item.Stock
                );
    }
}
