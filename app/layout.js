import StarBgCanvas from "@/components/StarBgCanvas";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ganesh Portfolio",
  description: "A portfolio website for Ganesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StarBgCanvas />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
