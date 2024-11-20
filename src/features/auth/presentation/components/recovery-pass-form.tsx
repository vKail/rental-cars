"use client";
import { useForm } from "react-hook-form";
import { useRecovery } from "../../hooks/useRecovery";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRecoveryEmail } from "../../models/IRecovery";

export const RecoveryPassForm = () => {
  const { initialValues, validationSchema, onSubmit } = useRecovery();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRecoveryEmail>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-sm p-6 bg-white shadow-md border border-gray-200 rounded-2xl"
    >
      <label htmlFor="label" className="text-base font-medium pb-3">
        Correo{" "}
      </label>
      <input
        type="email"
        {...register("email")}
        placeholder="example@example.com"
        defaultValue={initialValues.email}
        className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <span className="text-red-500 text-sm">{errors.email?.message}</span>
      <button
        type="submit"
        className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
      >
        Enviar
      </button>
    </form>
  );
};
