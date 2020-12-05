using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Config
{
    public class RedisSettings : IRedisSettings
    {
        public string Url { get; set; }
        public string CategoriesInstance { get; set; }
    }

    public interface IRedisSettings
    {
        public string Url { get; set; }
        public string CategoriesInstance { get; set; }
    }
}
