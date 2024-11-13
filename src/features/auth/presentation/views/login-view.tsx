import { LoginForm } from "../components/login-form";

export const LoginView = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center p-10 bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Rental-Cars</h1>
        <h2 className="text-lg text-gray-700">Bienvenido de vuelta, es un gusto ayudarte </h2>
      </div>
      <LoginForm />
      <p className="py-4">Olvidaste tu constraseña, <u>Haz click aqui</u></p>
    </div>
  );
};
