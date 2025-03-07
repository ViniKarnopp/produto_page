import api from "@/api";

export async function DeleteProduct(Id: number) {
    await api.delete("/api/product/" + Id)
    .then((e) => console.log("Deletado com Sucesso"))
    .catch((error) => {
        if(error.response.status === 404){
            console.log("Falhou em Deletar o Produto");
            console.log(error.response.message);
        }
    });
    return true;
}