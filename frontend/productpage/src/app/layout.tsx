import "./globals.css";
import {Header} from '../components/header';
import { Provider } from "@/components/ui/provider"

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
        </Provider>
      </body>
    </html>
  );
}
