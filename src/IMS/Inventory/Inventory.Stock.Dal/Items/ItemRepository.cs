using Inventory.Stock.Dal.Items.DbEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Stock.Dal.Items
{
    public class ItemRepository : IItemRepository
    {
        private readonly IMSContext context;

        private DbSet<Item> _items => context.Items;

        public ItemRepository(IMSContext context)
        {
            this.context = context;
        }

        public async Task<List<Domain.Items.Item>> FindAll()
        {
            return await _items.AsNoTracking()
                .ToListAsync()
                .ToDomainOrNull(ItemConverter.ToDomain);
        }

        public async Task<Domain.Items.Item> FindById(long id)
        {
            return await _items.AsNoTracking()
               .Where(i => i.Id == id)
               .SingleOrDefaultAsync()
               .ToDomainOrNull(ItemConverter.ToDomain);
        }

        public async Task<bool> Update(Domain.Items.Item item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            var dbItem = await _items
               .Where(i => i.Id == item.Id)
               .SingleOrDefaultAsync();

            if (dbItem == null)
                return false;

            dbItem.SellPrice = item.SellPrice;
            dbItem.StockPrice = item.StockPrice;
            dbItem.Stock = item.Stock;

            await context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteById(long id)
        {
            var item = await _items
                .Where(c => c.Id == id)
                .SingleOrDefaultAsync();

            if (item == null)
                return false;

            _items.Remove(item);

            await context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Domain.Items.Item>> FindAll(List<long> ids)
        {
            return await _items.AsNoTracking()
               .Where(i => ids.Contains(i.Id))
               .ToListAsync()
               .ToDomainOrNull(ItemConverter.ToDomain);
        }

        public async Task<bool> UpdateAll(List<Domain.Items.Item> items)
        {
            var dbItems = await _items
                .Where(i => items.Select(item => item.Id).Contains(i.Id))
                .ToListAsync();

            if (dbItems == null)
                return false;

            items.ForEach(item =>
            {
                var dbItem = dbItems.FirstOrDefault(i => i.Id == item.Id);
                if (dbItem != null)
                {
                    dbItem.Stock = item.Stock;
                    dbItem.StockPrice = item.StockPrice;
                }
            });

            await context.SaveChangesAsync();

            return true;
        }
    }
}
