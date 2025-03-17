import api from "@/api";

export async function ListProducts() {
    try {
        const response = await api.get("/api/product");
        return (response.data);
    }
    catch (error) {
        console.log(error);
    }
}