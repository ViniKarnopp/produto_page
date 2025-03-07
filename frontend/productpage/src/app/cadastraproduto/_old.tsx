import { AddProduct } from "@/EndPoints/AddProduct";

export default async function CadastraProduto() {

  async function Salvar(dadosForm : FormData){
    "use server";
    //Atribuindo valores do input a váriaveis
    const nome = dadosForm.get("nomeProduto") as string;
    const precoString = dadosForm.get("precoProduto") as string;
    const preco = Number(precoString);
    const categoria = dadosForm.get("categoria") as string;
    const descricao = dadosForm.get("descricaoProduto") as string;
    const foto = dadosForm.get("fotoProduto") as File;
    const response = AddProduct(nome, descricao, preco, categoria, foto);
    if(!response) {
      console.log("Falhou a Execução");
    } else {
      console.log("Executou");
    }
  }
  
  return (
    <div>
      <h1 className="h1">Cadastro de Produto</h1>
      <br />
      <br />
      <div className="flex justify-center">
        <form className="flex-col text-left" action={Salvar}>
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="nomeProduto">Nome: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="text"
                name="nomeProduto"
                id="nomeProduto"
                placeholder="Nome do Produto"
                required
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="descricaoProduto">Descrição:</label>
            </div>
            <div className="column-9 column textarea">
              <textarea
                className="border border-zinc-900 rounded-md"
                id="descricaoProduto"
                name="descricaoProduto"
                cols={22}
                rows={4}
                placeholder="Descrição do Produto"
              />
            </div>
          </div>
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="precoProduto">Preço: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="number"
                name="precoProduto"
                id="precoProduto"
                min="0"
                step="0.01"
                placeholder="R$ Preço do Produto"
                required
              />
            </div>
            <div className="row">
              <div className="column-3 column label">
                <label htmlFor="=categoria">Categoria: </label>
              </div>
              <div className="column-9 column input">
                <select
                  className="border border-zinc-900 rounded-md"
                  name="categoria"
                  id="categoria"
                  required
                >
                  <option value="Eletrônico">Eletrônico</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Livros">Livros</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="column-3 column label">
                <label>Foto: </label>
              </div>
              <div className="column-9 column input">
                <input type="file" name="fotoProduto" id="fotoProduto"/>
              </div>
            </div>
            <div className="row">
              <button
                className="bg-zinc-900 text-white p-1 rounded-md"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
