using ProductApi.Application.ViewModel;
using ProductApi.Handlers.Interface;
using ProductApi.Model;

namespace ProductApi.Handlers
{
    public class ProductHandler : IProductHandler
    {
        private readonly IProductRepository _productRepository;


        public ProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<string> GetByFiltersAsync(double precoMinimo, double precoMaximo, string? categoria)
        {
            return await Task.FromResult(this.GetByFilters(precoMinimo, precoMaximo, categoria));
        }

        public async Task<string> GetProductByIdAsync(int id)
        {
            return await Task.FromResult(this.GetById(id));
        }

        public async Task<string> AddProductAsync(ProductViewModel productView)
        {
            return await Task.FromResult(this.AddProduct(productView));
        }

        public async Task<string> UpdateProductAsync(int id, ProductViewModel productView)
        {
            return await Task.FromResult(this.UpdateProductById(id,productView));
        }

        public async Task<string> DeleteProductAsync(int id)
        {
            return await Task.FromResult(this.DeleteProductById(id));
        }

        private string GetByFilters(double precoMinimo, double precoMaximo, string? categoria) {
            //Checando se os filtros estão válidos
            if (precoMinimo < 0 || precoMaximo < 0)
            {
                return "BadRequest:precoMinimo e precoMaximo deve ser maior que 0!";
            }
            if (categoria != null)
            {
                if (categoria != "Eletrônico" && categoria != "Roupas" && categoria != "Alimentos" &&
                    categoria != "Livros" && categoria != "Outros")
                {
                    return "BadRequest:Categoria Inválida!";
                }
            }

            var products = _productRepository.Get(precoMinimo, precoMaximo, categoria);
            var response = System.Text.Json.JsonSerializer.Serialize(products);
            return response;
        }

        private string GetById(int id) {
            var products = _productRepository.Get(id);
            var response = System.Text.Json.JsonSerializer.Serialize(products);
            return response;
        }

        private string AddProduct(ProductViewModel productView)
        {
            //Checando se os campos estão conforme o mínimo pedido.
            //Nome deve ter no mínimo três caracteres
            if (productView.Nome.Length < 3)
            {
                return "BadRequest:Nome deve ter no mínimo três caracteres!";
            }
            //Preco deve ser positivo.
            if (productView.Preco < 0)
            {
                return "BadRequest:Preco deve ter valor positivo!";
            }
            //Categoria de ser obrigatóriamente uma das seguites:
            //Eletrônico, Roupas, Alimentos, Livros ou Outros
            if (productView.Categoria != null)
            {
                if (productView.Categoria != "Eletrônico" && productView.Categoria != "Roupas" &&
                    productView.Categoria != "Alimentos" && productView.Categoria != "Livros" &&
                    productView.Categoria != "Outros")
                {
                    return "BadRequest:Categoria Inválida!";
                }
            }


            var product = new Product(productView.Nome, productView.Descricao, productView.Preco, productView.Categoria, productView.PhotoType, productView.PhotoBase64);

            _productRepository.Add(product);
            return "OK";
        }

        private string DeleteProductById(int id)
        {
            _productRepository.Del(id);
            return "Produto Deletado com Sucesso!";
        }

        public string UpdateProductById(int id, ProductViewModel productView)
        {
            //Checando se os campos estão conforme o mínimo pedido.
            //Nome deve ter no mínimo três caracteres
            if (productView.Nome.Length < 3)
            {
                return "BadRequest:Nome deve ter no mínimo três caracteres!";
            }
            //Preco deve ser positivo.
            if (productView.Preco < 0)
            {
                return "BadRequest:Preco deve ter valor positivo!";
            }
            //Categoria de ser obrigatóriamente uma das seguites:
            //Eletrônico, Roupas, Alimentos, Livros ou Outros
            if (productView.Categoria != null)
            {
                if (productView.Categoria != "Eletrônico" && productView.Categoria != "Roupas" &&
                    productView.Categoria != "Alimentos" && productView.Categoria != "Livros" &&
                    productView.Categoria != "Outros")
                {
                    return "BadRequest:Categoria Inválida!";
                }
            }
            Product product = new Product();
            product.SetProductId(id);
            product.SetNome(productView.Nome);
            product.SetDescricao(productView.Descricao);
            product.SetPreco(productView.Preco);
            product.SetCategoria(productView.Categoria);
            product.SetImageType(productView.PhotoType);
            product.SetImageBase64(productView.PhotoBase64);
            var retorno = _productRepository.Update(product);
            if (retorno == true)
            {
                return "Ok:Produto Atualizado com Sucesso!";
            }
            else
            {
                return "BadRequest:Produto Não Atualizado com Sucesso!";
            }
        }
    }
}
