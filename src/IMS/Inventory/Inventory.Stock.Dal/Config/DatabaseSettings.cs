using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Dal.Config
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string MSSQLConnection { get; set; }
    }

    public interface IDatabaseSettings
    {
        public string MSSQLConnection { get; set; }
    }
}
