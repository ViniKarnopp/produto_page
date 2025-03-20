import Axios  from "axios";

//Endereco da API Backend
const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  });

  export default api;