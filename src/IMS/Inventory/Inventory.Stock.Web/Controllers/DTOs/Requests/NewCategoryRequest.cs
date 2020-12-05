using Inventory.Stock.Domain.Categories;
using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Controllers.DTOs.Requests
{
    public class NewCategoryRequest
    {
        [Required]
        [MaxLength(length: 100)]
        [MinLength(length: 3)]
        public string Name { get; set; }

        public Category ToNew()
            => new Category(
                id: 0,
                name: Name,
                items: new List<Item>());
    }
}
