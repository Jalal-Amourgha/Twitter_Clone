import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "./Providers";
import { AppWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppWrapper>
            <Layout> {children}</Layout>
          </AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
