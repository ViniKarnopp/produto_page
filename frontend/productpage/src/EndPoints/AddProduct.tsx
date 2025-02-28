import api from "@/api";

export async function AddProduct(_Nome: string, _Descricao: string, _Preco: number, _Categoria: string, _Foto: File ) {
    let Executou : boolean = false;
    
    if (_Foto.size > 0) {
        const data = {
            Nome: _Nome,
            Descricao: _Descricao,
            Preco: _Preco.toFixed(2),
            Categoria: _Categoria,
            Photo: _Foto
        };
        await api.post("/api/product", data)
        .then((e) => Executou = true)
        .catch((e) => Executou = false);
    } else {
        const data = {
            Nome: _Nome,
            Descricao: _Descricao,
            Preco: _Preco.toFixed(2),
            Categoria: _Categoria
        };
        await api.post("/api/product", data)
        .then((e) => Executou = true)
        .catch((e) => Executou = false);
    }
    return (Executou);
}