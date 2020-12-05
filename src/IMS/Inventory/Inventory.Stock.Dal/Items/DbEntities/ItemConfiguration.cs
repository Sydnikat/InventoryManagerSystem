using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Dal.Items.DbEntities
{
    internal class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder
                .Property(i => i.Name)
                .IsRequired();

            builder
                .Property(i => i.StockPrice)
                .IsRequired();

            builder
                .Property(i => i.SellPrice)
                .IsRequired();

            builder
                .Property(i => i.CategoryId)
                .IsRequired();

            builder.HasData(
                new Item(
                    id: 1,
                    name: "Penicilin",
                    categoryId: 1,
                    stockPrice: 10,
                    sellPrice: 20,
                    stock: 0
                    ),
                new Item(
                    id: 2,
                    name: "Plastic Bandage",
                    categoryId: 2,
                    stockPrice: 50,
                    sellPrice: 70,
                    stock: 0
                    )
                );
        }
    }
}
