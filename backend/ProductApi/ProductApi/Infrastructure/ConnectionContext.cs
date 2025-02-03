using Microsoft.EntityFrameworkCore;
using ProductApi.Model;

namespace ProductApi.Infrastructure
{
    public class ConnectionContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

            => optionsBuilder.UseNpgsql(
                   "Server=localhost;" +
                   "Port=5432;Database=products;" +
                   "User Id=postgres;" +
                   "Password=123;"
                );

    }
}

