import { RecoveryPassForm } from "../components/recovery-pass-form";

export const RecoveryPassView = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center align-middle items-center">
      <h1 className="text-3xl font-bold mb-2">¿Olvidaste tu contraseña?</h1>
      <h2 className="text-xl font-medium mb-2 text-blue-400">
        Ingresa tu dirección de correo:
      </h2>
      <p className="p-3">Te enviaremos la información necesaria para que logres acceder a tu cuenta nuevamente.</p>
      <RecoveryPassForm />
    </div>
  );
};
