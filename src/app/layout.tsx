import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Tienda virtual de ropa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
