import { AddProduct } from "@/EndPoints/AddProduct";

export default async function CadastraProduto() {

  async function Salvar(DadosForm : FormData){
    "use server";
    //Atribuindo valores do input a váriaveis
    const Nome = DadosForm.get("NomeProduto") as string;
    console.log(Nome);
    const PrecoString = DadosForm.get("PrecoProduto") as string;
    const Preco = Number(PrecoString);
    const Categoria = DadosForm.get("Categoria") as string;
    const Descricao = DadosForm.get("DescricaoProduto") as string;
    console.log(Descricao);
    const Foto = DadosForm.get("FotoProduto") as File;
    console.log(Foto);
    const response = AddProduct(Nome, Descricao, Preco, Categoria, Foto);
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
              <label htmlFor="NomeProduto">Nome: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="text"
                name="NomeProduto"
                id="NomeProduto"
                placeholder="Nome do Produto"
                required
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="Descricao">Descrição: </label>
            </div>
            <div className="column-9 column textarea">
              <textarea
                className="border border-zinc-900 rounded-md"
                id="Descricao"
                name="Descricao"
                cols={22}
                rows={4}
                placeholder="Descrição do Produto"
              />
            </div>
          </div>
          <div className="row">
            <div className="column-3 column label">
              <label htmlFor="Preco">Preço: </label>
            </div>
            <div className="column-9 column input">
              <input
                className="border border-zinc-900 rounded-md"
                type="number"
                name="Preco"
                min="0"
                step="0.01"
                placeholder="R$ Preço do Produto"
                required
              />
            </div>
            <div className="row">
              <div className="column-3 column label">
                <label htmlFor="Categoria">Categoria: </label>
              </div>
              <div className="column-9 column input">
                <select
                  className="border border-zinc-900 rounded-md"
                  name="Categoria"
                  id="Categoria"
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
                <input type="file" name="FotoProduto" id="FotoProduto"/>
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
