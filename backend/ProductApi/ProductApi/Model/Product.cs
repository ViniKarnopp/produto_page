using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductApi.Model
{
    [Table("product")]
    public class Product
    {
        [Key]
        public int productid { get; private set; }
        public string descricao { get; private set; }
        public double preco { get; private set; }
        public string categoria { get; private set; }
        public string imageurl { get; private set; }

        public Product(string descricao, double preco, string categoria, string imageurl) {
            this.descricao = descricao ?? throw new ArgumentNullException(nameof(descricao));
            this.preco = preco;
            this.categoria = categoria;
            this.imageurl = imageurl;
        }

        public Product() 
        {
        }
    }
}
