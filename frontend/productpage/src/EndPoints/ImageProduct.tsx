import api from '../api/index';

export async function ImageProduct({params} : {params : Promise<{Id : string}>}) {
    const {Id} = await params;

    const response = await api.get("/api/product/" + Id + "/download");
    const imagedata : Blob = response.data;

    return(imagedata);
}