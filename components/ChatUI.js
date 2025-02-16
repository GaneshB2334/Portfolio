"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function ChatUI({ setIsChatOpen }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      setInput("");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
    setLoading(false);
  };

  const HandleSendQuestion = (question) => {
    const input = question.slice(2);
    setInput(input);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed z-[1000] top-0 left-0 h-screen w-screen bg-black bg-opacity-80 flex lg:justify-center p-5">
      <div className="w-full max-w-lg bg-gray-900 p-6 rounded-xl shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-center">
            Ask AI about Ganesh
          </h1>
          <button className="" onClick={() => setIsChatOpen(false)}>
            <X />
          </button>
        </div>

        <div className="h-80 overflow-y-auto mb-4 space-y-3 p-2 bg-gray-800 rounded-lg">
          {messages.map(
            (msg, index) =>
              msg.content && (
                <div
                  key={index}
                  className={`p-3 max-w-[80%] rounded-lg text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-500 text-white"
                      : "mr-auto bg-gray-700 text-white"
                  }`}
                >
                  <ReactMarkdown
                    className="prose prose-invert"
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-400 underline hover:text-blue-300"
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="text-yellow-300" {...props} />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )
          )}
        </div>
        <form>
          <div className="relative overflow-hidden w-full">
            <div className="relative w-full overflow- bg-black bg-opacity-50 p-2 rounded-lg mb-3">
              <motion.div
                className="flex gap-4 pr-40"
                animate={{ x: ["0%", "-350%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 flex-shrink-0">
                    {[
                      "🌐 Introduce Ganesh...",
                      "🛠️ What technologies does Ganesh specialize in?",
                      "💡 What projects has Ganesh worked on?",
                      "🔗 How can I connect with Ganesh?",
                    ].map((text, index) => (
                      <button
                        key={`${i}-${index}`}
                        onClick={() => HandleSendQuestion(text)}
                        type="button"
                        className="rounded-full border px-4 py-1 flex-shrink-0 bg-gray-800 text-white"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? (
                <p className="animate-pulse whitespace-nowrap">...</p>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
