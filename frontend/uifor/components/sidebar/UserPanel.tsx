"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User{
  username: string,
  email: string,
  business_type: string
}

export default function UserPanel() {

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
useEffect(() => {
  const token = localStorage.getItem("jwt")
  if(!token) router.replace('/auth/login')

    async function getUser(){
try {
        const res = await fetch("http://localhost:8000/api/v1/users/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if(!res.ok){
          router.replace('/')
        }
  
        const data: User = await res.json()
        console.log(data)
        setUser(data)
} catch (error) {
  console.log(error)
}

    }

    getUser()

}, [])



  return (
    <div className="flex flex-col items-center text-cyan-100">
      <div className="w-16 h-16 rounded-full bg-cyan-700/60 flex items-center justify-center text-2xl font-bold mb-2">
      {user?.username.slice(0,1).toUpperCase()}
      </div>
      <div className="font-semibold">{user?.username}</div>
      <div className="text-xs text-cyan-200">{user?.email}</div>
      <div className="mt-4 text-xs text-cyan-300">{user?.business_type || "Premium Account"}</div>
    </div>
  );
}
