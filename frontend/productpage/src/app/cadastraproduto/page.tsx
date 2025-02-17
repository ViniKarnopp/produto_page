
export default function CadastraProduto() {
    return(
        <div>
            <h1 className="justify-center">Cadastro de Produtos</h1>
            <br /><br />
            <div className="flex justify-center">
                <form className="flex-col text-left">
                    <div className="row">
                        <div className="column-3 column label">
                          <label htmlFor="NomeProduto">Nome: </label>
                        </div>
                        <div className="column-9 column input">
                           <input type="text" name="NomeProduto" id="NomeProduto" />
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="column-3 column label">
                              <label htmlFor="Descricao">Descrição: </label>
                        </div>
                        <div className="column-9 column">
                           <textarea id="Descricao" name="Descricao" cols={30} rows={4} placeholder="Descrição do Produto" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}