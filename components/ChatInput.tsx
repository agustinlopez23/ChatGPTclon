"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import ModelSelection from "./ModelSelection";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    //Notify user
    const notification = toast.loading("ChatGPT is processing your inquiry");
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //Notifications to say succesfull
      toast.success("Response is Ready! ", {
        id: notification,
      });
    });
  };
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm active:outline-none">
      <form className="p-5 space-x-5 flex" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        {/* models selection */}
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
