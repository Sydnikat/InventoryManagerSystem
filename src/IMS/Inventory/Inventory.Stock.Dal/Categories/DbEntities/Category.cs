using Inventory.Stock.Dal.Items.DbEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Inventory.Stock.Dal.Categories.DbEntities
{
    public class Category
    {
        public Category()
        {
        }

        public Category(long id, string name, List<Item> items)
        {
            Id = id;
            Name = name;
            Items = items;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Name { get; set; }
        public List<Item> Items { get; set; }
    }
}
