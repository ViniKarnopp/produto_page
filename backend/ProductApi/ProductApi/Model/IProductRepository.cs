namespace ProductApi.Model
{
    public interface IProductRepository
    {
        void Add(Product product);

        List<Product> Get();
        Product? Get(int id);
    }
}
