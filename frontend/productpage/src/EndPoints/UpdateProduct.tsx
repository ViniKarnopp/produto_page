import api from "@/api";

//Função que atualiza o produto conforme o id e os dados informados.
export async function UpdateProduct(
  _productId: number,
  _nome: string, 
  _descricao: string, 
  _preco: number, 
  _categoria: string, 
  _foto: string | undefined, 
  _fotoType: string | undefined ) {
    const data = {
        Nome: _nome,
        Descricao: _descricao,
        Preco: _preco.toFixed(2),
        Categoria: _categoria,
        PhotoBase64: _foto,
        PhotoType: _fotoType,
      };
      console.log(data);
      await api
        .put("/api/product/" + _productId, data)
        .catch((error) => {
          console.log(error.response);
          return false;
        });
      return true;
}