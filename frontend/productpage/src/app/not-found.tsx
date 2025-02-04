import Link from "next/link";

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