using Inventory.Stock.Domain.Categories;
using Inventory.Stock.Domain.Items;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Stock.Dal.Categories
{
    public interface ICategoryRepository
    {
        Task<Category> FindById(long id);
        Task<List<Category>> FindAll();
        Task<Category> Insert(Category category);
        Task<Item> InsertItem(long categoryId, Item item);
        Task<bool> DeleteById(long id);
    }
}
