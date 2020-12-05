using Inventory.Events.IntegrationEvents;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.Config
{
    public static class MassTransitBuilder
    {
        public static void AddMassTransitSetup(this IServiceCollection services, IConfiguration config)
        {
            configureSqlServer(services, config);

            var sp = services.BuildServiceProvider();
            var settings = sp.GetService<IRabbimqSettings>();

            services.AddMassTransit(s =>
            {
                s.UsingRabbitMq((ctx, c) =>
                {
                    c.Host(new Uri(settings.Host),
                        hostConfig =>
                        {
                            hostConfig.Username(settings.Username);
                            hostConfig.Password(settings.Password);
                        });
                });

                EndpointConvention.Map<ICategoryItemsStockChangedEvent>(new Uri(settings.EventQueue));
            });

            services.AddMassTransitHostedService();
        }

        private static void configureSqlServer(IServiceCollection services, IConfiguration config)
        {
            services.Configure<RabbimqSettings>(config.GetSection(nameof(RabbimqSettings)));

            services.AddSingleton<IRabbimqSettings>(sp => sp.GetRequiredService<IOptions<RabbimqSettings>>().Value);
        }
    }
}
