import { ProductProps } from "../page";
import { DetailProduct } from "@/EndPoints/DetailProduct";
import { DeleteProduct } from "@/EndPoints/DeleteProduct";
//import { ImageProduct } from "@/EndPoints/ImageProduct";

export default async function DetalheProduto({params} : {params : Promise<{id : string}>}) {
    const {id} = await params;

    const response = await DetailProduct(id);
    const Detalhes : ProductProps = response.data;
    //const ImageData = ImageProduct(Id);
    //const ImageUrl = URL.createObjectURL(ImageData);

     async function Deletar() {
      "use server";
      const response = await DeleteProduct(Detalhes.ProductId);
      if(!response) {
        console.log("Falhou");
      }
    }
  

  return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Detalhe do Produto</h1>
        <div className="flex justify-center">
          <div className="text-left">
            <h2>Produto: {Detalhes.Nome}</h2>
            <p>Descrição: {Detalhes.Descricao}</p>
            <p>Preço: R$ {Detalhes.Preco.toFixed(2)}</p>
            <p>Categoria: {Detalhes.Categoria}</p>
            <div>
              <button className="bg-zinc-900 text-white p-1 rounded-md" 
              onClick={Deletar}>Deletar</button>&nbsp;&nbsp;
              <a className="bg-zinc-900 text-white p-1.5 rounded-md"
              href={"/atualizaproduto/" + Detalhes.ProductId}>Atualizar</a>
            </div>
          </div>
        </div>
    </div>
  );
}