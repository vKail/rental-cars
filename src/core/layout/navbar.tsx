"use client";
import { UseAuthStore } from "@/features/auth/context/auth-user-store";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const { user, logout } = UseAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  }
  return (
    <div className="sticky top-0 px-2 bg-white ">
      <nav className=" flex flex-row justify-between m-2 border-b ">
      <div className="flex flex-row justify-center items-center ">
        <h1 className="font-semibold">Rental-Cars</h1>
        <Image
          src="/images/logo.png"
          alt="Principal logo for Rental Cars App"
          width={50}
          height={50}
          className="object-contain"
          priority
        />
      </div>
      {user ? (
       <div className="flex items-center space-x-4 bg-white ">
       <Image
         src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
         alt="User profile picture"
         width={48}
         height={48}
         className="w-10 h-10 border-2 border-gray-200 rounded-full shrink-0"
       />
       <div className="flex flex-col">
         <p className="text-base font-medium text-gray-800">
           {user.name} {user.lastname}
         </p>
         <p className="text-xs text-gray-600">{user.email}</p>
       </div>
       <button onClick={handleLogout} className="flex transition-colors w-20 h-8 items-center justify-center m-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Salir</button>
     </div>
     
      ) : (
        <div className="flex flex-row items-center">
          <Link
            className="transition-colors m-2 font-medium text-xs bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
            href="/login"
          >
            Iniciar Sesión
          </Link>
          <Link
            className="transition-colors m-2 font-medium text-xs bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
            href="/register"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
    </div>
  );
};
