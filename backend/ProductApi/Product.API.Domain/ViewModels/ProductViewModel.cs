using System.Text.Json.Serialization;

namespace ProductApi.Application.ViewModel
{
    //ViewModel representando o produto usado no ProductController
    public class ProductViewModel
    {
        public string Nome { get; set; }
        public string? Descricao { get; set; }
        public double Preco {  get; set; }
        public string Categoria { get; set; }
        public string? PhotoBase64 { get; set; }
        public string? PhotoType { get; set; }
    }
}
