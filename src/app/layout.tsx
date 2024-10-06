import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exoplanet Quiz App",
  description: "Test your knowledge of famous exoplanets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[url('/space-background.webp')] bg-cover bg-center bg-fixed`}>
        <div className="min-h-screen bg-black bg-opacity-50">
          {children}
        </div>
      </body>
    </html>
  );
}
