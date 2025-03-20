
using Microsoft.AspNetCore.Mvc;
using ProductApi.Application.ViewModel;
using ProductApi.Handlers.Interface;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductHandler _productHandler;

        public ProductController(IProductHandler productHandler)
        {
            _productHandler = productHandler ?? throw new ArgumentNullException(nameof(productHandler));
        }

        //Rota da API para buscar produtos com os filtros Preço Mínimo, Preço Máximo e Categoria.
        [HttpGet]
        public IActionResult Get(double precoMinimo, double precoMaximo, string? categoria)
        {
            var response = _productHandler.GetByFiltersAsync(precoMinimo,precoMaximo,categoria);
            if (response.Result.StartsWith("BadRequest"))
            {
                return BadRequest(response.Result);
            } else
            {
                return Ok(response.Result);
            }
        }

        //Rota da API para adicionar novo produto.
        [HttpPost]
        public IActionResult Add(ProductViewModel productView)
        {
            var response = _productHandler.AddProductAsync(productView);
            if (response.Result.StartsWith("BadRequest"))
            {
                return BadRequest(response.Result);
            }
            else
            {
                return Ok();
            }

        }

        //Rota da API que busca os detalhes de um produto de acordo com o ID.
        [HttpGet]
        [Route("{id}")]
        public IActionResult Search(int id)
        {
            var response = _productHandler.GetProductByIdAsync(id);
            return Ok(response.Result);
        }

        //Rota da API que deleta um produto de acordo com o ID.
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) 
        {
            var response = _productHandler.DeleteProductAsync(id);
            return Ok(response.Result);
        }
        
        //Rota da API que atualiza um produto de acordo com ID e os dados informados.
        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, ProductViewModel productView) 
        {
            var response = _productHandler.UpdateProductAsync(id, productView);
            if (response.Result.StartsWith("BadRequest"))
            {
                return BadRequest(response.Result);
            }
            else
            {
                return Ok(response.Result);
            }
        }
    }
}
