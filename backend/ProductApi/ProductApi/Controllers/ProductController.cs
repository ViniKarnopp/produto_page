
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProductApi.Application.ViewModel;
using ProductApi.Model;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        }

        //Rota da API para buscar produtos com os filtros Preço Mínimo, Preço Máximo e Categoria.
        [HttpGet]
        public IActionResult Get(double precoMinimo, double precoMaximo, string? categoria)
        {
            //Checando se os filtros estão válidos
            if (precoMinimo < 0 || precoMaximo < 0) 
            {
                return BadRequest("precoMinimo e precoMaximo deve ser maior que 0!");
            }
            if (categoria != null) 
            {
                if (categoria != "Eletrônico" && categoria != "Roupas" && categoria != "Alimentos" &&
                    categoria != "Livros" && categoria != "Outros") 
                {
                    return BadRequest("Categoria Inválida!");
                }
            }

            var products = _productRepository.Get(precoMinimo, precoMaximo, categoria);
            var response = System.Text.Json.JsonSerializer.Serialize(products);
            return Ok(response);
        }

        //Rota da API para adicionar novo produto.
        [HttpPost]
        public IActionResult Add(ProductViewModel productView)
        {
            //Checando se os campos estão conforme o mínimo pedido.
            //Nome deve ter no mínimo três caracteres
            if(productView.Nome.Length < 3)
            {
                return BadRequest("Nome deve ter no mínimo três caracteres!");
            }
            //Preco deve ser positivo.
            if(productView.Preco < 0) 
            {
                return BadRequest("Preco deve ter valor positivo!");
            }
            //Categoria de ser obrigatóriamente uma das seguites:
            //Eletrônico, Roupas, Alimentos, Livros ou Outros
            if(productView.Categoria != null) 
            {
                if(productView.Categoria != "Eletrônico" && productView.Categoria != "Roupas" &&
                    productView.Categoria != "Alimentos" && productView.Categoria != "Livros" &&
                    productView.Categoria != "Outros") 
                {
                    return BadRequest("Categoria Inválida!");
                }
            }
            

            var product = new Product(productView.Nome, productView.Descricao, productView.Preco, productView.Categoria, productView.PhotoType, productView.PhotoBase64);

            _productRepository.Add(product);
            return Ok();
        }

        //Rota da API que busca os detalhes de um produto de acordo com o ID.
        [HttpGet]
        [Route("{id}")]
        public IActionResult Search(int id)
        {


            var products = _productRepository.Get(id);
            var response = System.Text.Json.JsonSerializer.Serialize(products);
            return Ok(response);
        }

        //Rota da API que deleta um produto de acordo com o ID.
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) 
        {
            _productRepository.Del(id);
            return Ok("Produto Deletado com Sucesso!");
        }
        
        //Rota da API que atualiza um produto de acordo com ID e os dados informados.
        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, ProductViewModel productView) 
        {
            //Checando se os campos estão conforme o mínimo pedido.
            //Nome deve ter no mínimo três caracteres
            if (productView.Nome.Length < 3)
            {
                return BadRequest("Nome deve ter no mínimo três caracteres!");
            }
            //Preco deve ser positivo.
            if (productView.Preco < 0)
            {
                return BadRequest("Preco deve ter valor positivo!");
            }
            //Categoria de ser obrigatóriamente uma das seguites:
            //Eletrônico, Roupas, Alimentos, Livros ou Outros
            if (productView.Categoria != null)
            {
                if (productView.Categoria != "Eletrônico" && productView.Categoria != "Roupas" &&
                    productView.Categoria != "Alimentos" && productView.Categoria != "Livros" &&
                    productView.Categoria != "Outros")
                {
                    return BadRequest("Categoria Inválida!");
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
                return Ok("Produto Atualizado com Sucesso!");
            }
            else 
            {
                return BadRequest("Produto Não Atualizado com Sucesso!");
            }
        }
    }
}
