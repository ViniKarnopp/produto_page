using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Application.ViewModel;
using ProductApi.Model;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        //private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            //_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Get()
        {

            var products = _productRepository.Get();

            return Ok(products);
        }

        [HttpPost]
        public IActionResult Add([FromForm] ProductViewModel productView)
        {
            var filePath = Path.Combine("Storage", productView.Photo.FileName);

            using Stream fileStream = new FileStream(filePath, FileMode.Create);
            productView.Photo.CopyTo(fileStream);

            var product = new Product(productView.Descricao, productView.Preco, productView.Categoria, filePath);

            _productRepository.Add(product);
            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Search(int id)
        {


            var products = _productRepository.Get(id);
            //var employeesDTOS = _mapper.Map<EmployeeDTO>(employees);


            return Ok(products);
        }

        [HttpPost]
        [Route("{id}/download")]
        public IActionResult DownloadPhoto(int id)
        {
            var product = _productRepository.Get(id);

            var dataBytes = System.IO.File.ReadAllBytes(product.imageurl);

            var extensao = "image/" + product.imageurl.Split('.')[1];

            return File(dataBytes, extensao);
        }

        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            _productRepository.Del(id);
            return Ok("Produto Deletado com Sucesso!");
        }
    }
}
