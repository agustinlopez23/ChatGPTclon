"use client";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { RingLoader } from "react-spinners";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import ModelSelection from "./ModelSelection";
function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* new chats */}
          <NewChat />
          <div className="hidden sm:inline">
            {/* model selection */}
            <ModelSelection />
          </div>
          {/* map througth the chatrows */}
          <div className="flex flex-col space-y-2 my-2">
            {loading ? (
              <div className="flex justify-center items-center">
                <RingLoader
                  color="#3bb5aa"
                  className="p-2 text-center mt-10"
                  size={50}
                />
              </div>
            ) : (
              chats?.docs.map(chat => <ChatRow key={chat.id} id={chat.id} />)
            )}
          </div>
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="user-avatar"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

export default SideBar;
