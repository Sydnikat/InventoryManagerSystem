using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.StockClient.DTOs.Responses
{
    public class CategoryResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }
        public List<ItemResponse> Items { get; set; }
    }
}
