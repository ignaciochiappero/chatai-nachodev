"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, MoreHorizontal, Send, User2, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";
import ThemeToggle from "./component/ThemeToggle";
import Image from "next/image";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/genai",
  });

  const [theme, setTheme] = useState('light');

  return (
    <main className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans overflow-hidden">
      <div className="p-2 text-2xl bg-gray-300 dark:bg-gray-800 z-10 fixed top-0 left-0 w-full text-center">
        <div className="flex justify-between items-center px-4">

          {/* Contenedor del título */}
          <div className="flex items-center ">
            
                   
          <Image
              src="/LogoO.png"
              alt="Logo2"
              width={30}
              height={30}
              className="mr-2"
          />
            
            

            <div>
              <span className="text-black dark:text-white font-orbitron">nIA</span> <span className="text-xs ">by</span> <span className="text-sm">Nacho <span className="text-orange-500">Dev</span></span>

            </div>


          </div>
         
          <ThemeToggle />
        </div>
      </div>
      <div className="flex-grow overflow-auto p-4 pt-20">
        <Messages messages={messages} isLoading={isLoading} />
      </div>
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
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
