import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};
function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    setActive(false);
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };
  return (
    <div className={`chatRow justify-center ${active && "bg-gray-700/50"} `}>
      <Link
        href={`/chat/${id}`}
        className="flex flex-1 gap-1 py-3 overflow-hidden"
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 hidden md:inline-flex truncate">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
      </Link>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700 "
        onClick={removeChat}
      />
    </div>
  );
}

export default ChatRow;
