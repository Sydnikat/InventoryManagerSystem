using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Config
{
    public class RabbimqSettings : IRabbimqSettings
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EventQueue { get; set; }
        public string EventQueueName { get; set; }
    }

    public interface IRabbimqSettings
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EventQueue { get; set; }
        public string EventQueueName { get; set; }
    }
}
