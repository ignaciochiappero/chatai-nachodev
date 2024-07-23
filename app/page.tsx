"use client";
import { useChat } from "ai/react";
import {
  Bot,
  Loader,
  Loader2,
  MoreHorizontal,
  Plus,
  Send,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Markdown from "./component/markdown";
import { ChangeEvent, useState } from "react";
import SelectedImages from "./component/selectedImages";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-lg">
      
      <div className="border p-2 rounded-md text-2xl">
        Nach-AI
      </div>
      
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </main>
  );
}