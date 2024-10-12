import "./globals.css";
import Navbar from "@/components/Navbar";

import { Nunito } from "next/font/google";

import AuthProvider from "@/components/AuthProvider";

export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${nunito.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
