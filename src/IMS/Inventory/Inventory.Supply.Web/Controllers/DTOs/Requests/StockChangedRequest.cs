using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.Controllers.DTOs.Requests
{
    public class StockChangedRequest
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public List<CategoryItemStockRequest> Items { get; set; }
    }
}
