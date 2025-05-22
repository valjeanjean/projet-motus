import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Orbitron } from "next/font/google";

export const metadata: Metadata = {
  title: "MOTUS",
  description: "Jeu Motus [] Projet MASTER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet"/>
      </head>
        <body className="body">
          <Header />
            {children}
        </body>
    </html>
  );
}
