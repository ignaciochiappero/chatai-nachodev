import React, { useEffect, useRef } from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      id="chatbox"
      className="flex flex-col w-full max-w-3xl mx-auto text-left mt-4 gap-4 whitespace-pre-wrap overflow-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }} // Ajusta la altura según sea necesario
    >
      {messages.map((m, index) => (
        <div
          key={m.id || index}
          className={`p-4 shadow-md rounded-md ml-10 relative ${
            m.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <Markdown text={m.content} />
          {m.role === "user" ? (
            <User2 className="absolute -left-10 top-2 border rounded-full p-1 shadow-lg" />
          ) : (
            <Bot
              className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#ffffff] ${
                isLoading && index === messages.length - 1 ? "animate-bounce" : ""
              }`}
            />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
