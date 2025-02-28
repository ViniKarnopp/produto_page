import api from "@/api";

export async function DeleteProduct(Id: number) {
    await api.delete("/api/product/" + Id)
    .then((e) => console.log("Deletado com Sucesso"))
    .catch((e) => console.log("Falhou em Deletar"));
    return true;
}