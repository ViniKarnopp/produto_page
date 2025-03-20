import Link from "next/link";
//Página de Not-Found, caso o usuário tente acessar uma página que não existe
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center font-bold mt-9 text-3xl">Página 404 | Não Encontrada!</h1>
            <p>Essa página que tentou acessar não existe!</p>
            <Link href='/'>
                Voltar para Home
            </Link>
        </div>
    );
}