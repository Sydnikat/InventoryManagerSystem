using Inventory.Events.IntegrationEvents;
using Inventory.Stock.Web.IntegrationEvents;
using MassTransit;
using MassTransit.MultiBus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Stock.Web.Config
{
    public static class MassTransitBuilder
    {
        public static void AddMassTransitSetup(this IServiceCollection services, IConfiguration config)
        {
            configureRabbitmq(services, config);

            var sp = services.BuildServiceProvider();
            var settings = sp.GetService<IRabbimqSettings>();

            services.AddMassTransit(s =>
            {
                s.AddConsumer<CategoryItemsStockChangedHandler>();

                s.UsingRabbitMq((ctx, c) =>
                {
                    c.Host(new Uri(settings.Host),
                        hostConfig =>
                        {
                            hostConfig.Username(settings.Username);
                            hostConfig.Password(settings.Password);
                        });
                    c.ReceiveEndpoint(settings.EventQueueName, e =>
                    {
                        e.ConfigureConsumer<CategoryItemsStockChangedHandler>(ctx);
                    });
                });

            });

            services.AddMassTransitHostedService();
        }

        private static void configureRabbitmq(IServiceCollection services, IConfiguration config)
        {
            services.Configure<RabbimqSettings>(config.GetSection(nameof(RabbimqSettings)));

            services.AddSingleton<IRabbimqSettings>(sp => sp.GetRequiredService<IOptions<RabbimqSettings>>().Value);
        }
    }
}
