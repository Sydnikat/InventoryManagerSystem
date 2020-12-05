using Inventory.Supply.Web.StockClient;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.Config
{
    public static class RefitBuilder
    {
        public static void AddRefit(this IServiceCollection services)
        {

            bool RetryableStatusPredicate(HttpStatusCode statusCode) =>
                statusCode == HttpStatusCode.BadGateway ||
                statusCode == HttpStatusCode.ServiceUnavailable ||
                statusCode == HttpStatusCode.GatewayTimeout;

            services.AddRefitClient<IStockApiClient>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri("http://inventory.stock.web"))
                .AddPolicyHandler(
                    Policy.Handle<HttpRequestException>()
                    .OrResult<HttpResponseMessage>(msg => RetryableStatusPredicate(msg.StatusCode))
                    .WaitAndRetryAsync(4, retryCount => TimeSpan.FromMilliseconds(100 * Math.Pow(2, retryCount))));
        }
    }
}
