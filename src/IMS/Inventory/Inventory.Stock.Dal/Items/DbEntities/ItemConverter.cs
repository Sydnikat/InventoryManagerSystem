using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Dal.Items.DbEntities
{
    public class ItemConverter
    {
        public static Func<Item, Domain.Items.Item> ToDomain => item
            => new Domain.Items.Item(
                id: item.Id,
                name: item.Name,
                categoryId: item.CategoryId,
                stockPrice: item.StockPrice,
                sellPrice: item.SellPrice,
                stock: item.Stock
                );

        public static Func<Domain.Items.Item, Item> ToDal => item
            => new Item(
                id: item.Id,
                name: item.Name,
                categoryId: item.CategoryId,
                stockPrice: item.StockPrice,
                sellPrice: item.SellPrice,
                stock: item.Stock
                );

        public static Func<Domain.Items.Item, Item> ToDalNew => item
            => new Item(
                id: 0,
                name: item.Name,
                categoryId: item.CategoryId,
                stockPrice: item.StockPrice,
                sellPrice: item.SellPrice,
                stock: item.Stock
                );
    }
}
