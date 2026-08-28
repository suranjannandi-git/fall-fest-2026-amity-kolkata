import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Qiskit Fall Fest 2026 - Amity Kolkata University",
  description: "Join the global celebration of quantum computing. Learn, explore, and connect with the quantum community at Qiskit Fall Fest 2026.",
  keywords: ["Qiskit", "Quantum Computing", "Fall Fest", "IBM Quantum", "Quantum Education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="min-h-screen flex flex-col bg-[#f3f3f3]">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
