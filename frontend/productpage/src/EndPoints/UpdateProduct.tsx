import api from "@/api";

export async function UpdateProduct(_ProductId: number, _Nome: string, _Descricao: string, _Preco: number, _Categoria: string, _Foto: File ) {
    let Executou : boolean = false;
    
    if (_Foto.size > 0) {
        const data = {
            Nome: _Nome,
            Descricao: _Descricao,
            Preco: _Preco.toFixed(2),
            Categoria: _Categoria,
            Photo: _Foto
        };
        await api.put("/api/product/" + _ProductId, data)
        .then((e) => Executou = true)
        .catch((error) => {
            if(error.response.status === 404){
                console.log("Falhou em Atualizar o Produto");
                console.log(error.response.message);
            }
        });
    } else {
        const data = {
            Nome: _Nome,
            Descricao: _Descricao,
            Preco: _Preco.toFixed(2),
            Categoria: _Categoria
        };
        await api.put("/api/product/" + _ProductId, data)
        .then((e) => Executou = true)
        .catch((error) => {
            if(error.response.status === 404){
                console.log("Falhou em Atualizar o Produto");
                console.log(error.response.message);
            }
        });
    }
    return (Executou);
}