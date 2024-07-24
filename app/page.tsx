"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, MoreHorizontal, Send, User2, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/genai",
  });

  return (
    <main className="flex flex-col h-screen">
      <div className="border p-2 rounded-md text-2xl bg-white z-10 fixed top-0 left-0 w-full text-center">
        Nach-AI
      </div>
      <div className="flex-grow overflow-auto p-4 pt-20"> {/* Ajustado padding-top para el espacio del título */}
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
