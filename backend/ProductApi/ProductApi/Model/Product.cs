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
        public int productid { get; private set; }
        public string nome { get; private set; }
        public string? descricao { get; private set; }
        public double preco { get; private set; }
        public string categoria { get; private set; }
        public string? imageurl { get; private set; }

        public Product(string nome, string descricao, double preco, string categoria, string imageurl) {
            this.nome = nome ?? throw new ArgumentNullException(nameof(nome));
            this.descricao = descricao;
            this.preco = preco;
            this.categoria = categoria;
            this.imageurl = imageurl;
        }

        public void SetProductId(int id) 
        {
            this.productid = id;
        }
        public void SetNome(string nome)
        { 
            this.nome = nome; 
        }
        public void SetDescricao(string descricao)
        {
            this.descricao = descricao;
        }
        public void SetPreco(double preco)
        {
            this.preco = preco;
        }
        public void SetCategoria(string categoria)
        {
            this.categoria = categoria;
        }
        public void SetImageUrl(string imageurl) 
        { 
            this.imageurl = imageurl; 
        }

        public Product() 
        {
        }
    }
}
