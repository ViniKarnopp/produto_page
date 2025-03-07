import axios from "axios";

export async function AddProduct(
  _nome: string,
  _descricao: string,
  _preco: number,
  _categoria: string,
  _foto: File
) {
  let executou: boolean = false;
  const axiosConfig = { headers: { "Content-Type": "multipart:form-data" } };

  if (_foto.size > 0) {
    const data = {
      nome: _nome,
      descricao: _descricao,
      preco: _preco.toFixed(2),
      categoria: _categoria,
      photo: _foto,
    };
    console.log(data);
    await axios
      .post("/api/product/save", data, axiosConfig)
      .then(() => (executou = true))
      .catch((error) => {
        console.log(error);
      });
  } else {
    const data = {
        nome: _nome,
        descricao: _descricao,
        preco: _preco.toFixed(2),
        categoria: _categoria
      };
    await axios
      .post("/api/product/save", data, axiosConfig)
      .then(() => (executou = true))
      .catch((error) => {
        console.log(error);
      });
  }
  return executou;
}
