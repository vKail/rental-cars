'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  sessionStorage.getItem('user') == null ? router.push('/login') : router.push('/dashboard')  
}
