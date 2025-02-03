using Microsoft.EntityFrameworkCore;
using ProductApi.Model;

namespace ProductApi.Infrastructure
{
    /*A classe ConnectionContext é responsável por fazer a conexão ao banco de dados e
     * manipular os dados do banco postgress usando a EntityFrameworkCore*/
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

