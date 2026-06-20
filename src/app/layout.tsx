import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Le Cheffon Fat",
  description: "Recipe search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Sidebar />
        <Footer />
      </body>
    </html>
  );
}
