import api from "@/api";

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
    ImageBase64: _foto,
    ImageType: _fotoType,
  };
  console.log(data);
  await api
    .post("/api/product", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((error) => {
      console.log(error.response);
      return false;
    });
  return true;
}
