import api from '../api/index';

//Função que busca os detalhes de um produto de acordo com o ID fornecido.
export async function DetailProduct(Id : string){

    const response = await api.get("/api/product/" + Id);
    return(response.data);
}