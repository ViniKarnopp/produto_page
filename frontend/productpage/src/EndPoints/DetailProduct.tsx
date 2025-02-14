import api from '../api/index';

export async function DetailProduct({params} : {params : Promise<{Id : string}>}){
    const {Id} = await params;

    const response = await api.get("/api/product/" + Id);
    return(response.data);
}