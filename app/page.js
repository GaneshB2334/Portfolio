"use client";
import ChatUI from "@/components/ChatUI";
import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import "@/components/ui/button.css";
import { ArrowUpRight, Link } from "lucide-react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="relative h-screen w-screen">
      <div className="flex lg:flex-row max-md:flex-col">
        <Navbar />
        <div className="">
          <Content />
        </div>
      </div>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="z-50 button-30"
      >
        Ask AI <ArrowUpRight className="ml-3" />
      </button>
      {isChatOpen && <ChatUI setIsChatOpen={setIsChatOpen} />}
    </main>
  );
}
