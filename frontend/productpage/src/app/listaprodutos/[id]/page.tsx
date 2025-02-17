import { ProductProps } from "../page";
import { DetailProduct } from "@/EndPoints/DetailProduct";
//import { ImageProduct } from "@/EndPoints/ImageProduct";

export default async function DetalheProduto({params} : {params : Promise<{id : string}>}) {
    const {id} = await params;

    const response = await DetailProduct(id);
    const Detalhes : ProductProps = response.data;
    //const ImageData = ImageProduct(Id);
    //const ImageUrl = URL.createObjectURL(ImageData);
  

  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Detalhe do Produto</h1>
        <div className="flex justify-center">
          <div className="bg-gray-200 p-4 rounded-md text-left">
            <h2>Produto: {Detalhes.Nome}</h2>
            <p>Descrição: {Detalhes.Descricao}</p>
            <p>Preço: R$ {Detalhes.Preco.toFixed(2)}</p>
            <p>Categoria: {Detalhes.Categoria}</p>
          </div>
        </div>
    </div>
  );
}