using Inventory.Stock.Dal.Items.DbEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Inventory.Stock.Dal.Categories.DbEntities
{
    public class CategoryConverter
    {
        public static Func<Category, Domain.Categories.Category> ToDomain => category
            => new Domain.Categories.Category(
                id: category.Id,
                name: category.Name,
                items: category.Items.ToDomainOrNull(ItemConverter.ToDomain).ToList()
                );

        public static Func<Domain.Categories.Category, Category> ToDal => category
            => new Category(
                id: category.Id,
                name: category.Name,
                items: category.Items.ToDalOrNull(ItemConverter.ToDal).ToList()
                );

        public static Func<Domain.Categories.Category, Category> ToDalNew => category
            => new Category(
                id: 0,
                name: category.Name,
                items: new List<Item>()
                );
    }
}
