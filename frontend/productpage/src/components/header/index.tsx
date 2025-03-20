import Link from "next/link";
//Header da Página de Produtos. Aparece no topo da página de produtos durante toda a navegação.
export function Header() {
    return (
        <header className="flex px-2 py-4 bg-zinc-900 text-white">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <div>
                    Produtos
                </div>
                <ul className="flex items-center justify-center gap-2">
                    <li>
                        <Link href='/'>
                           Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/listaprodutos'>
                            Lista de Produtos
                        </Link>
                    </li>
                    <li>
                        <Link href='/cadastraproduto'>
                             Novo Produto
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}