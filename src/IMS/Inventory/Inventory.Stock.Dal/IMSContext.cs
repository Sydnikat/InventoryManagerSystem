using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Inventory.Stock.Dal
{
    public class IMSContext : DbContext
    {
        public IMSContext(DbContextOptions<IMSContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Categories.DbEntities.Category> Categories { get; set; }
        public DbSet<Items.DbEntities.Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(
                assembly: Assembly.GetAssembly(typeof(IMSContext)));
        }
    }
}
