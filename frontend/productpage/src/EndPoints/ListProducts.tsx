import api from '../api/index';

export async function ListProducts() {
    const response = await api.get("/api/product");

    return(response);
}