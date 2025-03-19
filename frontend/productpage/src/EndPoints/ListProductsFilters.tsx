import api from "@/api";

export async function ListProductsFilters(
  _precoMinimo: number,
  _precoMaximo: number,
  _categoria: string
) {
  if (_precoMinimo == 0 && _precoMaximo == 0) {
    const body = {
      categoria: _categoria,
    };
    const response = await api
      .get("/api/product", { params: body })
      .catch((error) => {
        console.log(error);
      });
    return response ? response.data : null;
  } else {
    const body = {
      precoMinimo: _precoMinimo.toFixed(2),
      precoMaximo: _precoMaximo.toFixed(2),
      categoria: _categoria,
    };
    const response = await api
      .get("/api/product", { params: body })
      .catch((error) => {
        console.log(error);
      }); 
    return response ? response.data : null;
  }
}
