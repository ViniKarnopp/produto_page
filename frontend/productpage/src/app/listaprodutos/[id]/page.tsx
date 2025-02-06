import { ProductProps } from "../page";
import { handler } from "../api/product/index";

export default async function DetalheProduto({params} : {params : Promise<{id : string}>}) {
    const {id} = await params;

    const response = await handler.get('api/product/{id}' + {id});

  const data: ProductProps = response.data;

  console.log(data);

  return (
    <div>
        <h1>Detalhe do Produto</h1>
    </div>
  );
}