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

  const response = await ListProducts();
  const data: ProductProps[] = response.data;


  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">
            Produtos
        </h1>
        <h3 className="mx-2">Buscar Produtos</h3>
        <form className="flex gap-2 my-4 mx-2">
          <span>Preço Mínimo: </span>
          <input
          className="border border-gray-200"
          type="number"
          name="PrecoMinimo"
          min="0"
          step="0.01"
          />
          <span> Preço Máximo: </span>
          <input
          className="border border-gray-200"
          type="number"
          name="PrecoMaximo"
          min="0"
          step="0.01"
          />
          <span className="align-center"> Categoria: </span>
          <select
          className="border border-gray-200"
          name="Categoria"
          >
            <option value="">Todas</option>
            <option value="Eletrônico">Eletrônico</option>
            <option value="Roupas">Roupas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Livros">Livros</option>
            <option value="Outros">Outros</option>
          </select>
          <button
          className="bg-zinc-900 text-white p-1 rounded-md"
          type="submit"
          >Buscar</button>
        </form>
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
