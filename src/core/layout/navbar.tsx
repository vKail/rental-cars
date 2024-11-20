"use client";
import { UseAuthStore } from "@/features/auth/context/auth-user-store";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  const { user } = UseAuthStore();
  return (
    <nav className="flex flex-row justify-between m-2  border-b">
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
      <div className="flex flex-row items-center">
        <Link
          className="transition-colors m-2  bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
          href="/login"
        >
          Iniciar Sesión
        </Link>
        <Link
          className="transition-colors m-2 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
          href="/register"
        >
          Registrarse
        </Link>
      </div>
    </nav>
  );
};
