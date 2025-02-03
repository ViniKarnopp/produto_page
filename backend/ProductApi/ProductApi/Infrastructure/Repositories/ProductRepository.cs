using ProductApi.Model;

namespace ProductApi.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public List<Product> Get()
        {
            return _context.Products.ToList();
        }

        public Product? Get(int id)
        {
            return _context.Products.Find(id);
        }
    }
}
