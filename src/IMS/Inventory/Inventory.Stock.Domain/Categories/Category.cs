using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Domain.Categories
{
    public class Category
    {
        public Category(long id, string name, List<Item> items)
        {
            Id = id;
            Name = name;
            Items = items;
        }

        public long Id { get; set; }

        public string Name { get; set; }
        public List<Item> Items { get; set; }
    }
}
