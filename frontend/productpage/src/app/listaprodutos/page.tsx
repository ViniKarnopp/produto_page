import axios from 'axios';

interface ProductProps {
    productid: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
}

interface ResponseProps {
    products: ProductProps[]
}

const url = 'https://localhost:7048/api/product'


export default async function ListaProdutos() {
    

    //const response = await axios.get(url)
    const response = await fetch(url)
    const data: ResponseProps = await response.json()

    console.log(data);
    
    return (
        <div>
            <h1>Página que Lista os Produtos</h1>
        </div>
    );
}