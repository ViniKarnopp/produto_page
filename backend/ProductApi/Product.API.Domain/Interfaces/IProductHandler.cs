using ProductApi.Application.ViewModel;
using ProductApi.Model;

namespace ProductApi.Handlers.Interface
{
    public interface IProductHandler
    {
        public Task<string> GetByFiltersAsync(double precoMinimo, double precoMaximo, string? categoria);
        public Task<string> GetProductByIdAsync(int id);
        public Task<string> AddProductAsync(ProductViewModel productView);
        public Task<string> DeleteProductAsync(int id);
        public Task<string> UpdateProductAsync(int id, ProductViewModel productView);
    }
}
