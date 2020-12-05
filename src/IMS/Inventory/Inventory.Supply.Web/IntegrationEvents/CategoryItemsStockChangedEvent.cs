using Inventory.Events.IntegrationEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.IntegrationEvents
{
    public class CategoryItemsStockChangedEvent : ICategoryItemsStockChangedEvent
    {
        public List<StockInfo> ChangedItems { get; set; }
        public DateTimeOffset ChangeRequested { get; set; }
        public string UserId { get; set; }
    }
}
