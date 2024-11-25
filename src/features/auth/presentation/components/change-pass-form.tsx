"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRecoveryEmail, IRecoveryPassword } from "../../models/IRecovery";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useParams } from "next/navigation";

export const ChangePassForm = () => {
  const { initialValues, validationSchema, onSubmit } = useChangePassword();
  const { reset_password_token } = useParams<{ reset_password_token: string }>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<IRecoveryPassword, 'reset_password_token'>>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, reset_password_token))}
      className="flex flex-col w-full max-w-sm p-6 bg-white shadow-md border border-gray-200 rounded-2xl"
    >
      <label htmlFor="label" className="text-base font-medium pb-3">
        Contraseña{" "}
      </label>
      <input
        type="text"
        {...register("password")}
        placeholder="Contraseña"
        defaultValue={initialValues.password}
        className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <span className="text-red-500 text-sm">{errors.password?.message}</span>
      <label htmlFor="label" className="text-base font-medium pb-3">
        Confirmar contraseña{" "}
      </label>
      <input
        type="text"
        {...register("password_confirmation")}
        placeholder="Contraseña"
        defaultValue={initialValues.password_confirmation}
        className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <span className="text-red-500 text-sm">{errors.password_confirmation?.message}</span>
      <button
        type="submit"
        className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
      >
        Enviar
      </button>
    </form>
  );
};
