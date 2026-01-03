"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if(!token) return
    async function checkUser(){
     try {
       const res = await fetch("http://localhost:8000/api/v1/users/me",
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`
           }
         }
       )
       if(res.ok){
         router.replace('/dashboard')
       }else{
        localStorage.removeItem("jwt")
        router.replace("/auth/login")
       }
     } catch (error) {
      console.error("Auth check fail.", error)
     }
    }

    checkUser()

  }, [router]);

  return (
    <main className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-neutral-200 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">RegulAI</h1>
        <p className="text-lg mb-6">
          Regulation-to-Action Engine for Nepalese SMEs. Turn complex legal and tax regulations into clear, actionable compliance steps.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/auth/login" className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">Login</Link>
          <Link href="/auth/signup" className="px-6 py-3 bg-gray-200 text-blue-900 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Sign Up</Link>
        </div>
        <div className="mt-8 text-xs text-gray-400">2025-12-29 (UTC)</div>
      </div>
    </main>
  );
}
