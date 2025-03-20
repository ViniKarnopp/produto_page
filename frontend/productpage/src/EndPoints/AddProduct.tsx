import api from "@/api";

//Função que adiciona um produto na API Backend.
export async function AddProduct(
  _nome: string,
  _descricao: string,
  _preco: number,
  _categoria: string,
  _foto: string | undefined,
  _fotoType: string | undefined
) {

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
    .post("/api/product", data)
    .catch((error) => {
      console.log(error.response);
      return false;
    });
  return true;
}
