using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Stock.Dal.Items
{
    public interface IItemRepository
    {
        Task<Item> FindById(long id);
        Task<List<Item>> FindAll();
        Task<List<Item>> FindAll(List<long> ids);
        Task<bool> Update(Item item);
        Task<bool> UpdateAll(List<Item> items);
        Task<bool> DeleteById(long id);
    }
}
