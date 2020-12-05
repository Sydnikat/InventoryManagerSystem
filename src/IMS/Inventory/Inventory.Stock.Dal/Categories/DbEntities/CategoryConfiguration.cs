using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Stock.Dal.Categories.DbEntities
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder
                .Property(c => c.Name)
                .IsRequired();

            builder
                .HasMany(c => c.Items)
                .WithOne()
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasData(
                new Category(
                    id: 1,
                    name: "Medicines",
                    items: new List<Items.DbEntities.Item>()),
                new Category(
                    id: 2,
                    name: "Bandages",
                    items: new List<Items.DbEntities.Item>())
                );
        }
    }
}
