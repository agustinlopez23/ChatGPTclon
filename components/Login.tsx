"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
function Login() {
  return (
    <div className="bg-[#3bb5aa] h-screen flex flex-col items-center justify-center text-center ">
      <Image
        src="https://storage.googleapis.com/replit/images/1677193261030_e09b895e492b152af64a8b259cd929eb.jpeg"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        className="text-white font-bold text-3xl animate-pulse mt-5"
        onClick={() => signIn("google")}
      >
        Sign In to Use ChatGPT
      </button>
    </div>
  );
}

export default Login;
