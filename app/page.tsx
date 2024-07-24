// page.tsx

"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, MoreHorizontal, Send, User2, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";
import ThemeToggle from "./component/ThemeToggle";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/genai",
  });

  return (
    <main className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans">
      <div className="border p-2 rounded-md text-2xl bg-white dark:bg-gray-800 z-10 fixed top-0 left-0 w-full text-center">
        <div className="flex justify-between items-center px-4">
          <span>Nach-AI</span>
          <ThemeToggle /> {/* Añade el ThemeToggle aquí */}
        </div>
      </div>
      <div className="flex-grow overflow-auto p-4 pt-20">
        {/* Ajusta el padding-top para el espacio del título */}
        <Messages messages={messages} isLoading={isLoading} />
      </div>
      <div className="p-4 border-t">
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </div>
    </main>
  );
}
