using Inventory.Events.IntegrationEvents;
using Inventory.Stock.Dal.Items;
using Inventory.Stock.Web.Cache;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.IntegrationEvents
{
    public class CategoryItemsStockChangedHandler : IConsumer<ICategoryItemsStockChangedEvent>
    {
        private readonly IItemRepository itemrepository;
        private CategoriesCache cache;

        public CategoryItemsStockChangedHandler(IItemRepository itemrepository, CategoriesCache cache)
        {
            this.itemrepository = itemrepository;
            this.cache = cache;
        }

        public async Task Consume(ConsumeContext<ICategoryItemsStockChangedEvent> context)
        {
            var itemIds = context.Message.ChangedItems.Select(i => i.ItemId).ToList();
            var items = await itemrepository.FindAll(itemIds).ConfigureAwait(false);

            var changedItems = context.Message.ChangedItems
                .Select(item =>
                {
                    var existingItem = items.FirstOrDefault(i => i.Id == item.ItemId);
                    if (existingItem != null)
                    {
                        existingItem.Stock = item.NewQuantity;

                        if (item.NewStockPrice != 0)
                            existingItem.StockPrice = item.NewStockPrice;
                    }

                    return existingItem;
                })
                .Where(i => i != null)
                .ToList();

            var success = await itemrepository.UpdateAll(changedItems).ConfigureAwait(false);

            if (success)
            {
                var changedCategoryIds = changedItems
                .Select(i => i.CategoryId)
                .Distinct();

                foreach (var id in changedCategoryIds)
                    await cache.Invalidate(id);
            }
        }
    }
}
