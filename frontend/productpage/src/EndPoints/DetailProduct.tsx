import api from '../api/index';

export async function DetailProduct(Id : string){

    const response = await api.get("/api/product/" + Id);
    return(response);
}