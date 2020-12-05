using Inventory.Stock.Domain.Categories;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Cache
{
    public class CategoriesCache
    {
        private readonly IDistributedCache cache;
        private readonly DistributedCacheEntryOptions cacheEntryOptions;

        public CategoriesCache(IDistributedCache cache)
        {
            this.cache = cache;
            this.cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(2));
        }

        public async Task<Category> TryGet(long categoryId)
        {
            var valueString = await cache.GetStringAsync(getCacheKey(categoryId));
            if (valueString == null)
                return null;
            else
                return JsonConvert.DeserializeObject<Category>(valueString);
        }

        public async Task Set(Category category)
        {
            var valueString = JsonConvert.SerializeObject(category);
            await cache.SetStringAsync(key: getCacheKey(category.Id), value: valueString, options: cacheEntryOptions);
        }

        public Task Invalidate(long categoryId) => cache.RemoveAsync(getCacheKey(categoryId));

        private string getCacheKey(long categoryId) => $"categories-{categoryId}";
    }
}
