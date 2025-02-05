import axios from "axios";

interface ProductProps {
  ProductId: number;
  Nome: string;
  Descricao: string;
  Preco: number;
  Categoria: string;
  ImageUrl: string;
}

interface ResponseProps {
  products: ProductProps[];
}

export default async function ListaProdutos() {
  const response = await axios.get("https://localhost:7048/api/product");

  const data: ResponseProps = response.data;

  console.log(data);

  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">
            Produtos
        </h1>
        <div className="flex flex-col gap-4 mx-2">
            {data.products.map(p => (
                <div key={p.ProductId} className="bg-gray-200 p-4 rounded-md">
                    <h2 className="font-bold">{p.Nome}</h2>
                    <p>{p.Descricao}</p>
                    <p>{p.Preco}</p>
                    <p>{p.Categoria}</p>
                </div>
            ))}
        </div>
        
    </div>
  );
}
