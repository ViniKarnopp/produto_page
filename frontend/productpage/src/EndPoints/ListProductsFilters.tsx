import api from "@/api";

export async function ListProductsFilters(
  _precoMinimo: number,
  _precoMaximo: number,
  _categoria: string
) {
  if (_precoMinimo == 0 && _precoMaximo == 0) {
    const data = {
      categoria: _categoria,
    };
    const response = await api
      .get("/api/product", { params: data })
      .catch((error) => {
        throw error;
      });
    return (response.data);
  } else {
    const data = {
      precoMinimo: _precoMinimo.toFixed(2),
      precoMaximo: _precoMaximo.toFixed(2),
      categoria: _categoria,
    };
    const response = await api
      .get("/api/product", { params: data })
      .catch((error) => {
        throw error.status;
      }); 
    return (response.data);
  }
}
