using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Domain.Items
{
    public class Item
    {
        public Item(long id, string name, long categoryId, double stockPrice, double sellPrice, int stock)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
            StockPrice = stockPrice;
            SellPrice = sellPrice;
            Stock = stock;
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long CategoryId { get; set; }
        public double StockPrice { get; set; }
        public double SellPrice { get; set; }
        public int Stock { get; set; }
    }
}
