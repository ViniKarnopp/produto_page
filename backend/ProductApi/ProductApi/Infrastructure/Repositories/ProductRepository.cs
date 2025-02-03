using ProductApi.Model;

namespace ProductApi.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Product product)
        {
            product.SetProductId(_context.Products.Count() + 1);
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void Del(int id)
        {
            
            var product = _context.Products.Where(d => d.productid == id).First();
            _context.Products.Remove(product);
            _context.SaveChanges();
            System.IO.File.Delete(path: product.imageurl);

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
