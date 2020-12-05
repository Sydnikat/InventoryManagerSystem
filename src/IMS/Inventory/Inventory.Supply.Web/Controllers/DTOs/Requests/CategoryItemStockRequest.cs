using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.Controllers.DTOs.Requests
{
    public class CategoryItemStockRequest
    {
        [Required]
        public long ItemId { get; set; }

        [Required]
        public double StockPrice { get; set; }
        public int Stock { get; set; }
    }
}
