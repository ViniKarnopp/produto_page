import api from "@/api";

export async function UpdateProduct(_productId: number, _nome: string, _descricao: string, _preco: number, _categoria: string, _foto: string, _fotoType: string ) {
    let Executou : boolean = false;
    
    if (_foto.length > 0) {
        const data = {
            nome: _nome,
            descricao: _descricao,
            preco: _preco.toFixed(2),
            categoria: _categoria,
            photoBase64: _foto,
            photoType: _fotoType,
        };
        await api.put("/api/product/" + _productId, data)
        .then((e) => Executou = true)
        .catch((error) => {
            if(error.response.status === 404){
                console.log("Falhou em Atualizar o Produto");
                console.log(error.response.message);
            }
        });
    } else {
        const data = {
            nome: _nome,
            descricao: _descricao,
            preco: _preco.toFixed(2),
            categoria: _categoria
        };
        await api.put("/api/product/" + _productId, data)
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