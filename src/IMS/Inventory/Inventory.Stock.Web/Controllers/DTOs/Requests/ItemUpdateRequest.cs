using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Controllers.DTOs.Requests
{
    public class ItemUpdateRequest
    {
        [Required]
        public double StockPrice { get; set; }

        [Required]
        public double SellPrice { get; set; }

        [Required]
        public int Stock { get; set; }
    }
}
