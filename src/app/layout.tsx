import type { Metadata } from "next";

import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";

import "./globals.css";

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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Sidebar />
        <Footer />
      </body>
    </html>
  );
}
