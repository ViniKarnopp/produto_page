namespace ProductApi.Model
{
    public interface IProductRepository
    {
        void Add(Product product);

        void Del(int id);

        List<Product> Get();
        Product? Get(int id);
    }
}
