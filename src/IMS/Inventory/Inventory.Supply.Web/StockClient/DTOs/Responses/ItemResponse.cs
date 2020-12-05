using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.StockClient.DTOs.Responses
{
    public class ItemResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long CategoryId { get; set; }
        public double StockPrice { get; set; }
        public double SellPrice { get; set; }
        public int Stock { get; set; }
    }
}
