import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StarBgCanvas from "@/components/StarBgCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ganesh Portfolio",
  description: "A portfolio website for Ganesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        minHeight: "100vh",
      }} className={inter.className}>
        <StarBgCanvas />
        {children}
      </body>
    </html>
  );
}
