import Link from "next/link";
import { LoginForm } from "../components/login-form";

export const LoginView = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center p-10 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Rental-Cars</h1>
        <h2 className="text-lg text-gray-700">
          Bienvenido de vuelta, es un gusto ayudarte{" "}
        </h2>
      </div>
      <LoginForm />
      <div className="p-2">
        <span className="text-slate-900 text-sm">No tienes una cuenta?</span>
        <Link href="/register">
          <span className="text-blue-400 text-sm">
            {" "}
            <u>Registrate aquí</u>
          </span>
        </Link>
       
      </div>
    </div>
  );
};
