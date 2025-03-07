
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

        [HttpPost]
        public IActionResult Add([FromForm] ProductViewModel productView)
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
            //Checando se o arquivo Photo é o do tipo válido e se tem o tamanho até 2MBs
            if (productView.PhotoType != null)
            {
                if (productView.PhotoType != "image/jpg" && productView.PhotoType != "image/jpeg" && productView.PhotoType != "image/png") 
                {
                    return BadRequest("Photo usando tipo de arquivo inválido!");
                }
                byte[] imageBytes = Convert.FromBase64String(productView.PhotoBase64);
                if (imageBytes.Length > 2000000) 
                {
                    return BadRequest("Photo deve ter no máximo até 2MBs!");
                }
            }
            

            var product = new Product(productView.Nome, productView.Descricao, productView.Preco, productView.Categoria, productView.PhotoType, productView.PhotoBase64);

            _productRepository.Add(product);
            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Search(int id)
        {


            var products = _productRepository.Get(id);
            var response = System.Text.Json.JsonSerializer.Serialize(products);
            return Ok(response);
        }


        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) 
        {
            _productRepository.Del(id);
            return Ok("Produto Deletado com Sucesso!");
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, [FromForm] ProductViewModel productView) 
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
            //Checando se o arquivo Photo é o do tipo válido e se tem o tamanho até 2MBs
            if (productView.PhotoType != null)
            {
                if (productView.PhotoType != "image/jpg" && productView.PhotoType != "image/jpeg" && productView.PhotoType != "image/png")
                {
                    return BadRequest("Photo usando tipo de arquivo inválido!");
                }
                byte[] imageBytes = Convert.FromBase64String(productView.PhotoBase64);
                if (imageBytes.Length > 2000000)
                {
                    return BadRequest("Photo deve ter no máximo até 2MBs!");
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
