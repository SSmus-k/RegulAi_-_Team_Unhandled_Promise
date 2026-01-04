"use client"

import DashboardLayout from '../../components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if(!token) {
      router.replace('/auth/login')
      return
    }
  
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

          setChecking(false)
        } catch (error) {
          console.log(error)
        }
      }
  
      getUser()
  
  }, [router])
  if (checking) return null;
  return <DashboardLayout>{children}</DashboardLayout>;
}
