"use client";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useScroll } from "framer-motion";

export default function Home() {
  const scroll = useScroll();

  return (
    <main className="relative h-screen w-screen">
      <div className="flex lg:flex-row max-md:flex-col">
        <Navbar />
        <div className="">
          <Content />
        </div>
      </div>
    </main>
  );
}
