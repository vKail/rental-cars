import Link from "next/link";
import { ChangePassForm } from "../components/change-pass-form";

export const ChangePassView = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center p-10 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Rental-Cars</h1>
        <h2 className="text-lg text-gray-700">
          Bienvenido de vuelta, es un gusto ayudarte{" "}
        </h2>
        <h2 className="text-lg text-blue-400">
          Ingresa tu nueva contraseña{" "}
        </h2>
      </div>
      <ChangePassForm />
    </div>
  );
};
