"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

function SkeletonBubble() {
  return (
    <div className="mr-auto max-w-[82%] rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="animate-pulse space-y-2">
        <div className="h-3 w-3/4 rounded bg-white/20" />
        <div className="h-3 w-1/2 rounded bg-white/20" />
        <div className="h-3 w-2/3 rounded bg-white/20" />
      </div>
    </div>
  );
}

export default function ChatUI({ setIsChatOpen }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You help visitors learn about Ganesh Bastapure. Only answer questions related to Ganesh, his work, projects, experience, and contact details. Avoid tool-specific details. Ganesh is a Software Development Engineer at Krushna53. He has built Namaha PDF, Email Campaign Hub, ChimeChat, Share The Doc, Cine Match, dashboards, and mentor-mentee product workflows. Contact links: **[LinkedIn](https://linkedin.com/in/ganeshbastapure)**, **[GitHub](http://github.com/ganeshB2334/)**, **[Gmail](mailto:bastapureganesh21@gmail.com)**.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const formatPrompt = (messagesList) => {
    return messagesList.map((m) => `${m.role}: ${m.content}`).join("\n");
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (!chatRef.current) return;
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: formatPrompt(newMessages) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (question) => {
    const cleanedQuestion = question.replace(/^[^A-Za-z0-9]+/, "").trim();
    sendMessage(cleanedQuestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const visibleMessages = messages.filter((m) => m.role !== "system");
  const showEmptyState = visibleMessages.length === 0 && !loading;

  return (
    <div className="theme-scrollbar fixed left-0 top-0 z-[1000] flex h-screen w-screen items-start overflow-y-auto bg-black/85 p-4 backdrop-blur-sm lg:justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#050505] p-5 text-white shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-[-0.03em]">
            Ask AI about Ganesh
          </h1>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white hover:text-white"
            onClick={() => setIsChatOpen(false)}
            aria-label="Close AI modal"
            type="button"
          >
            <X size={17} />
          </button>
        </div>

        <div
          ref={chatRef}
          className="theme-scrollbar mb-4 h-96 md:h-[500px] space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.025] p-3"
        >
          {showEmptyState ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-2xl font-bold text-white/60">
                Ask me anything about <br /> Ganesh Bastapure!
              </p>
            </div>
          ) : (
            <>
              {visibleMessages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`max-w-[82%] rounded-xl border p-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "ml-auto border-white bg-white text-black"
                      : "mr-auto border-white/10 bg-white/[0.04] text-white"
                  }`}
                >
                  <ReactMarkdown
                    className="prose prose-invert max-w-none"
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-current underline underline-offset-4 opacity-80 hover:opacity-100"
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-semibold text-current"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ))}

              {loading && <SkeletonBubble />}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative overflow-hidden w-full">
            <div className="relative mb-3 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-2">
              <motion.div
                className="flex gap-4 pr-40"
                animate={{ x: ["0%", "-350%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex shrink-0 gap-4">
                    {[
                      "🌐 Introduce Ganesh...",
                      "🧩 What has Ganesh built?",
                      "💡 What projects has Ganesh worked on?",
                      "🔗 How can I connect with Ganesh?",
                    ].map((text, index) => (
                      <button
                        key={`${i}-${index}`}
                        onClick={() => handleSuggestionClick(text)}
                        type="button"
                        disabled={loading}
                        className="flex-shrink-0 rounded-full border border-white/10 px-4 py-1 text-xs font-medium text-white/65 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
              className="w-full rounded-full border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white"
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="whitespace-nowrap animate-pulse">Sending</span>
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