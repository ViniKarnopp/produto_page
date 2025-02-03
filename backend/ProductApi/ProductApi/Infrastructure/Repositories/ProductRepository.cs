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
            
            var product = _context.Products.Where(d => d.productid == id).First();
            _context.Products.Remove(product);
            _context.SaveChanges();
            System.IO.File.Delete(path: product.imageurl);

        }
        //Atualiza produto conforme dados informados.
        public bool Update(Product product)
        {
            var productAlt = _context.Products.Where(d => d.productid == product.productid).First();
            if (productAlt != null)
            {
                productAlt.SetNome(product.nome);
                productAlt.SetDescricao(product.descricao);
                productAlt.SetPreco(product.preco);
                productAlt.SetCategoria(product.categoria);
                if(product.imageurl != "") 
                {
                    System.IO.File.Delete(path: productAlt.imageurl);
                    productAlt.SetImageUrl(product.imageurl);

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
                    return _context.Products.Where(d => (d.preco >= precoMinimo || d.preco <= precoMaximo)).Where(d => d.categoria.Equals(categoria)).ToList();
                }
                else
                {
                    return _context.Products.Where(d => (d.preco >= precoMinimo || d.preco <= precoMaximo)).ToList();
                }
            }
            else 
            {
                if (categoria != null) 
                {
                    return _context.Products.Where(d => d.categoria.Equals(categoria)).ToList();
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
