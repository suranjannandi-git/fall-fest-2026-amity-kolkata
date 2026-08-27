import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Qiskit Fall Fest 2026 - Global Quantum Computing Celebration",
  description: "Join the global celebration of quantum computing. Learn, explore, and connect with the quantum community at Qiskit Fall Fest 2026.",
  keywords: ["Qiskit", "Quantum Computing", "Fall Fest", "IBM Quantum", "Quantum Education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}