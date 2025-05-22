import type { Metadata } from "next";
import "./globals.css";

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
      <body className="body">
        {children}
      </body>
    </html>
  );
}
