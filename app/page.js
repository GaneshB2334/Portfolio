"use client";
import ChatUI from "@/components/ChatUI";
import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import { useState } from "react";

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
      className="fixed bottom-0 right-0 m-10 bg-white h-16 w-16 rounded-full z-50 text-2xl">
        AI
      </button>
      {
        isChatOpen&& <ChatUI setIsChatOpen={setIsChatOpen} />
      }
    </main>
  );
}
