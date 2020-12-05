using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inventory.Events.IntegrationEvents;
using Inventory.Supply.Web.Controllers.DTOs.Requests;
using Inventory.Supply.Web.IntegrationEvents;
using Inventory.Supply.Web.StockClient;
using Inventory.Supply.Web.StockClient.DTOs.Responses;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Supply.Web.Controllers
{
    [Route("api/supplies")]
    [ApiController]
    public class SupplyController : ControllerBase
    {
        private readonly IStockApiClient stockApiClient;
        private readonly IPublishEndpoint publishEndpoint;

        public SupplyController(IStockApiClient stockClient, IPublishEndpoint publishEndpoint)
        {
            this.stockApiClient = stockClient;
            this.publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetCategories()
        {
            var result = await stockApiClient.GetCategoriesAsync().ConfigureAwait(false);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult> ChangeStock([FromBody] StockChangedRequest request)
        {
            await publishEndpoint.Publish(new CategoryItemsStockChangedEvent
            {
                UserId = request.UserId,
                ChangeRequested = DateTimeOffset.Now,
                ChangedItems = request.Items
                .Select(item =>
                {
                    return new StockInfo
                    {
                        ItemId = item.ItemId,
                        NewQuantity = item.Stock,
                        NewStockPrice = item.StockPrice
                    };
                })
                .ToList()
            });

            return Ok();
        }
    }
}
