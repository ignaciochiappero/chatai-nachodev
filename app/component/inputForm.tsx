import { Loader2, Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      imagePromises.push(
        new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            const base64String = e.target?.result?.toString();
            resolve(base64String as string);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    }

    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prevImages: string[]) => {
        const updatedImages: string[] = [
          ...prevImages,
          ...(base64Strings as string[]),
        ];
        return updatedImages;
      });
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event, {
      data: {
        images: JSON.stringify(images),
      },
    });
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset to original height
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-3xl mx-auto flex flex-row gap-2 items-center h-full mt-5 overflow-hidden"
    >
      <div className="p-2 flex flex-row relative overflow-hidden">
        {/* 
        <Plus
          onClick={() => document.getElementById("fileInput")?.click()} // Click event handler
          className="cursor-pointer p-3 h-10 w-10 stroke-stone-200"
        />
        <SelectedImages images={images} setImages={setImages} /> 
        */}
      </div>
      {/* 
      <input
        className="hidden"
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelection}
      /> 
      */}
      <textarea
        ref={textareaRef}
        placeholder={isLoading ? "Generando . . ." : "Preguntar algo. . . "}
        value={input}
        disabled={isLoading}
        onChange={handleInputChange}
        className="px-2 pl-4 outline-none w-full py-2 text-[#ffffff] placeholder:text-[#8f8f8f] dark:placeholder:text-[#d1d5db] text-left focus:placeholder-transparent disabled:bg-transparent rounded-full bg-gray-600 
        dark:bg-gray-950  resize-none overflow-y-auto"
        rows={1} // Start with a single row
        style={{ minHeight: '40px', maxHeight: '150px', lineHeight: '1.5', height: 'auto' }} // Adjust height and line height
        onInput={adjustTextareaHeight}
      />
      <button
        type="submit"
        className="rounded-full shadow-lg dark:shadow-sm dark:shadow-purple-200 border flex flex-row"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="p-3 h-10 w-10 stroke-stone-400 animate-spin"
          />
        ) : (
          <Send className="p-3 h-10 w-10 stroke-stone-400 " />
        )}
      </button>
    </form>
  );
};

export default InputForm;
