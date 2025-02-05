using System.Linq;
using ProductApi.Model;

namespace ProductApi.Infrastructure.Repositories
{
    /*A classe ProductRepository implementa a interface IProductRepository. Implementando os métodos
     * que farão as operações de pesquisa, adicionar, atualizar e deletar dados na tabela product
     no banco de dados.*/

    public class ProductRepository : IProductRepository
    {
        //Conecta ao banco de dados
        private readonly ConnectionContext _context = new ConnectionContext();

        //Adiciona novo produto.
        public void Add(Product product)
        {
            product.SetProductId(_context.Products.Count() + 1);
            _context.Products.Add(product);
            _context.SaveChanges();
        }
        //Deleta produto de acordo com o productid informado.
        public void Del(int id)
        {
            
            var product = _context.Products.Where(d => d.ProductId == id).First();
            _context.Products.Remove(product);
            _context.SaveChanges();
            System.IO.File.Delete(path: product.ImageUrl);

        }
        //Atualiza produto conforme dados informados.
        public bool Update(Product product)
        {
            var productAlt = _context.Products.Where(d => d.ProductId == product.ProductId).First();
            if (productAlt != null)
            {
                productAlt.SetNome(product.Nome);
                productAlt.SetDescricao(product.Descricao);
                productAlt.SetPreco(product.Preco);
                productAlt.SetCategoria(product.Categoria);
                if(product.ImageUrl != "") 
                {
                    System.IO.File.Delete(path: productAlt.ImageUrl);
                    productAlt.SetImageUrl(product.ImageUrl);

                }
                _context.SaveChanges();
                return true;
            }
            else 
            {
                return false;
            }
        }
        //Lista os produtos conforme os filtros informados preço mínimo e preço máximo e categoria
        public List<Product> Get(double? precoMinimo, double? precoMaximo, string? categoria)
        {
            if (precoMinimo >= 0 & precoMaximo >= 0)
            {
                if (categoria != null)
                {
                    return _context.Products.Where(d => (d.Preco >= precoMinimo || d.Preco <= precoMaximo)).Where(d => d.Categoria.Equals(categoria)).ToList();
                }
                else
                {
                    return _context.Products.Where(d => (d.Preco >= precoMinimo || d.Preco <= precoMaximo)).ToList();
                }
            }
            else 
            {
                if (categoria != null) 
                {
                    return _context.Products.Where(d => d.Categoria.Equals(categoria)).ToList();
                }
                else 
                {
                    return _context.Products.ToList();
                }
            }
        }
        //Pesquisa dados de um produto conforme o productid informado.
        public Product? Get(int id)
        {
            return _context.Products.Find(id);
        }
    }
}
