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
      content:
        "You are a model who will help the user to know about Ganesh Bastapure. You will only reply to the question related ganesh bastaure and for any other question then try not answer. And send the response in formatted manner. Ganesh Bastapure is a 21-year-old Software Development Engineer (SDE) at Peerbuddy, where he started as a Frontend Developer Intern on September 9 and was promoted to SDE on February 1. He is currently in his 3rd year of a Computer Science Engineering degree and has six months of experience in frontend development. His linkedin **[Linkedin](https://linkedin.com/in/ganeshbastapure)**, his github **[GitHub](http://github.com/ganeshB2334/)**, his mail **[Gmail](mailto:bastapureganesh21@gmail.com)**. If someone asks about how to connect with ganesh give them my linkedin,github and gmail. His expertise lies in full-stack web development using the MERN stack, along with Next.js, TypeScript, Tailwind CSS, Framer Motion, Redux, MongoDB, Docker, and Kubernetes. At Peerbuddy, he played a key role in building dynamic user interfaces and enhancing mentor-mentee connections. Among his notable projects is ChimeChat, A modern, real-time chatting platform built with the MERN stack. Users can engage in seamless conversations, share images, and manage profiles effortlessly. The app provides a responsive interface, enabling users to search for other members and stay connected on any device. Deployed using Render for the backend and Vercel for the frontend, the app ensures a smooth and fast user experience with secure JWT-based authentication. (**[Live App](https://chimechat-app.vercel.app)** | **[GitHub](http://github.com/ganeshB2334/chat-app/)**) and another project is Share-The-Doc : Share-the-Doc is a simple and efficient document-sharing platform that allows users to upload files and generate unique shareable links or QR codes for easy access. Whether you need to share notes, reports, or important documents, this platform makes it seamless. Users can instantly download files by scanning the QR code or using the shared link, eliminating the hassle of email attachments or cloud storage permissions. It's a quick, secure, and user-friendly solution for document sharing. (**[Live App](https://share-the-doc.vercel.app)** | **[GitHub](http://github.com/ganeshB2334/share-the-doc/)**). If someone asks about his projects then give them the information about ChimeChat and Share-The-Doc.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      setInput("");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: formatPrompt(newMessages) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
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
    }

    setInput("");
    setLoading(false);
  };

  const formatPrompt = (messages) => {
    return messages.map((m) => `${m.role}: ${m.content}`).join("\n");
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
    <div className="fixed z-[1000] top-0 left-0 h-screen w-screen bg-black bg-opacity-80 flex items-center lg:justify-center p-5">
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
          {messages
            .filter((_, index) => index !== 0)
            .map(
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
