using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Events.IntegrationEvents
{
    public class StockInfo
    {
        public long ItemId { get; set; }
        public int NewQuantity { get; set; }
        public double NewStockPrice { get; set; }
    }
    public interface ICategoryItemsStockChangedEvent
    {
        public List<StockInfo> ChangedItems { get; set; }
        public DateTimeOffset ChangeRequested { get; set; }
        public string UserId { get; set; }
    }
}
