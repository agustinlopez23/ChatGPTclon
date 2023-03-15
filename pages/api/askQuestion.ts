// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

import { adminDb } from "../../firebaseAdmin";
import query from "../../lib/queryApi";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a Prompt" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid ChatId" });
    return;
  }
  const response = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar:
        "https://storage.googleapis.com/replit/images/1677193261030_e09b895e492b152af64a8b259cd929eb.jpeg",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);
  res.status(200).json({ answer: message.text });
}
