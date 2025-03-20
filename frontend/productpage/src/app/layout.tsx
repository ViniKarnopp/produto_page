import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import {Header} from '../components/header';
import { Provider } from "@/components/ui/provider"
import { ToastContainer } from "react-toastify";

//Layout Base da Página de Produtos
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <Provider>
        <Header/>
        {children}
        <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
