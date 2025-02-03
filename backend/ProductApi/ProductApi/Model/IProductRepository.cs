namespace ProductApi.Model
{
    /* A interface IProductRepository com a lista dos métodos utilizados pelo ProductController
     * para as operações de banco de dados.*/
    public interface IProductRepository
    {
        void Add(Product product);

        void Del(int id);
        bool Update(Product product);

        List<Product> Get(double? precoMinimo, double? precoMaximo, string? categoria);
        Product? Get(int id);
    }
}
