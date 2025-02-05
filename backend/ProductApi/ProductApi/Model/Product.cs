using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductApi.Model
{
    /*A classe Product representa a tabela product no banco através dela é que manipulado os dados
     para atualizar no banco de dados.*/
    [Table("product")]
    public class Product
    {
        [Key]
        [Column("productid")]
        public int ProductId { get; private set; }
        [Column("nome")]
        public string Nome { get; private set; }
        [Column("descricao")]
        public string? Descricao { get; private set; }
        [Column("preco")]
        public double Preco { get; private set; }
        [Column("categoria")]
        public string Categoria { get; private set; }
        [Column("imageurl")]
        public string? ImageUrl { get; private set; }

        public Product(string nome, string descricao, double preco, string categoria, string imageurl) {
            this.Nome = nome ?? throw new ArgumentNullException(nameof(nome));
            this.Descricao = descricao;
            this.Preco = preco;
            this.Categoria = categoria;
            this.ImageUrl = imageurl;
        }

        public void SetProductId(int id) 
        {
            this.ProductId = id;
        }
        public void SetNome(string nome)
        { 
            this.Nome = nome; 
        }
        public void SetDescricao(string descricao)
        {
            this.Descricao = descricao;
        }
        public void SetPreco(double preco)
        {
            this.Preco = preco;
        }
        public void SetCategoria(string categoria)
        {
            this.Categoria = categoria;
        }
        public void SetImageUrl(string imageurl) 
        { 
            this.ImageUrl = imageurl; 
        }

        public Product() 
        {
        }
    }
}
