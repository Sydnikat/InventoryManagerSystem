using Inventory.Stock.Dal.Categories.DbEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Stock.Dal.Categories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IMSContext context;

        private DbSet<Category> _categories => context.Categories;

        public CategoryRepository(IMSContext context)
        {
            this.context = context;
        }

        public async Task<List<Domain.Categories.Category>> FindAll()
        {
            return await _categories.AsNoTracking()
                .Include(c => c.Items)
                .ToListAsync()
                .ToDomainOrNull(CategoryConverter.ToDomain);
        }

        public async Task<Domain.Categories.Category> FindById(long id)
        {
            return await _categories.AsNoTracking()
                .Include(c => c.Items)
                .Where(c => c.Id == id)
                .SingleOrDefaultAsync()
                .ToDomainOrNull(CategoryConverter.ToDomain);
        }

        public async Task<Domain.Categories.Category> Insert(Domain.Categories.Category category)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category));

            var dbCategory = category.ToDalOrNull(CategoryConverter.ToDalNew);

            await _categories.AddAsync(dbCategory);

            await context.SaveChangesAsync();

            return dbCategory.ToDomainOrNull(CategoryConverter.ToDomain);
        }

        public async Task<Domain.Items.Item> InsertItem(long categoryId, Domain.Items.Item item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            var dbItem = item.ToDalOrNull(Items.DbEntities.ItemConverter.ToDalNew);

            var category = await _categories
                .Include(c => c.Items)
                .Where(c => c.Id == categoryId)
                .SingleOrDefaultAsync();

            if (category == null)
                return null;

            category.Items.Add(dbItem);

            await context.SaveChangesAsync();

            return dbItem.ToDomainOrNull(Items.DbEntities.ItemConverter.ToDomain);
        }

        public async Task<bool> DeleteById(long id)
        {
            var category = await _categories
                .Where(c => c.Id == id)
                .SingleOrDefaultAsync();

            if (category == null)
                return false;

            _categories.Remove(category);

            await context.SaveChangesAsync();

            return true;
        }
    }
}
