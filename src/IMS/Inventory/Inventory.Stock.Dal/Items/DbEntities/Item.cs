using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Inventory.Stock.Dal.Items.DbEntities
{
    public class Item
    {
        public Item()
        {
        }

        public Item(long id, string name, long categoryId, double stockPrice, double sellPrice, int stock)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
            StockPrice = stockPrice;
            SellPrice = sellPrice;
            Stock = stock;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public long CategoryId { get; set; }
        public double StockPrice { get; set; }
        public double SellPrice { get; set; }
        public int Stock { get; set; }
    }
}
