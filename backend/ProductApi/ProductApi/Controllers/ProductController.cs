
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
            if (productView.Photo != null)
            {
                var extensao = productView.Photo.FileName.Split('.')[1];
                if (extensao != "jpg" && extensao != "jpeg" && extensao != "png") 
                {
                    return BadRequest("Photo usando tipo de arquivo inválido!");
                }
                if(productView.Photo.Length > 2000000) 
                {
                    return BadRequest("Photo deve ter no máximo até 2MBs!");
                }
            }
            var filePath = Path.Combine("Storage", productView.Photo.FileName);

            using Stream fileStream = new FileStream(filePath, FileMode.Create);
            productView.Photo.CopyTo(fileStream);

            var product = new Product(productView.Nome, productView.Descricao, productView.Preco, productView.Categoria, filePath);

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

        [HttpGet]
        [Route("{id}/download")]
        public IActionResult DownloadPhoto(int id)
        {
            var product = _productRepository.Get(id);

            var dataBytes = System.IO.File.ReadAllBytes(product.ImageUrl);

            var extensao = "image/" + product.ImageUrl.Split('.')[1];

            return File(dataBytes, extensao);
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
            if (productView.Photo != null)
            {
                var extensao = productView.Photo.FileName.Split('.')[1];
                if (extensao != "jpg" && extensao != "jpeg" && extensao != "png")
                {
                    return BadRequest("Photo usando tipo de arquivo inválido!");
                }
                if (productView.Photo.Length > 2000000)
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
            if (productView.Photo != null)
            {
                var filePath = Path.Combine("Storage", productView.Photo.FileName);
                using Stream fileStream = new FileStream(filePath, FileMode.Create);
                product.SetImageUrl(filePath);
            }
            else 
            {
                product.SetImageUrl("");
            }
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
