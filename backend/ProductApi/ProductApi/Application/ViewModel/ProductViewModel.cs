namespace ProductApi.Application.ViewModel
{
    public class ProductViewModel
    {
        public string Descricao { get; set; }
        public double Preco {  get; set; }
        public string Categoria { get; set; }
        public IFormFile Photo { get; set; }
    }
}
