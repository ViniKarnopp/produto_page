//import axios from "axios";
//import {handler} from "../api/product/index";
import { ListProducts } from "@/EndPoints/ListProducts";


 export interface ProductProps {
  ProductId: number;
  Nome: string;
  Descricao: string;
  Preco: number;
  Categoria: string;
  ImageUrl: string;
}


export default async function ListaProdutos() {

  //const response = await axios.get("https://localhost:7048/api/product");
  //const response = await handler;
  const response = await ListProducts();
  const data: ProductProps[] = response.data;


  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">
            Produtos
        </h1>
        <div className="flex flex-col gap-4 mx-2">
            {data.map(p => (
                <div key={p.ProductId} className="bg-gray-200 p-4 rounded-md">
                    <h2>Nome: {p.Nome}</h2>
                    <p>Descrição: {p.Descricao}</p>
                    <p>Preço: R$ {parseFloat(p.Preco.toString()).toFixed(2)}</p>
                    <p>Categoria: {p.Categoria}</p>
                </div>
            ))}
        </div>
        
    </div>
  );
}
