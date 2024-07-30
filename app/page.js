"use client";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useScroll } from "framer-motion";

export default function Home() {
  const scroll = useScroll();

  return (
    <main className="relative h-screen w-screen">
      <div className="flex md:flex-row flex-col">
        <Navbar />
        <div className="overflow-y-scroll md:w-3/4 max-h-screen">
          <Content />
        </div>
      </div>
    </main>
  );
}
