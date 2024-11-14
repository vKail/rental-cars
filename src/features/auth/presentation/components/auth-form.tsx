"use client";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "../../models/IUser";

export const AuthForm = () => {
  const { initialValues, validationSchema, onSubmit } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      className="flex flex-col h-full w-full max-w-lg p-3 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col  w-52">
          <label htmlFor="label">Nombre</label>
          <input
            className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
            type="text"
            {...register("name")}
            placeholder="Nombre"
            defaultValue={initialValues.name}
          />
          <span className="text-sm text-red-500">{errors.name?.message}</span>
        </div>
        <div className="flex flex-col w-52">
          <label htmlFor="label">Apellido</label>
          <input
            className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
            type="text"
            {...register("lastname")}
            placeholder="Apellido"
            defaultValue={initialValues.lastname}
          />
          <span className="text-sm text-red-500">
            {errors.lastname?.message}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-52">
          <label htmlFor="label">Teléfono</label>
          <input
            className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
            type="text"
            {...register("phone")}
            placeholder="Teléfono"
            defaultValue={initialValues.phone}
          />
          <span className="text-sm text-red-500">{errors.phone?.message}</span>
        </div>
        <div className="flex flex-col w-52">
          <label htmlFor="label">Fecha de Nacimiento</label>
          <input
            className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
            type="date"
            {...register("birthdate")}
            placeholder="Fecha de Nacimiento"
            defaultValue={initialValues.birthdate.toISOString().split("T")[0]}
          />
          <span className="text-sm text-red-500">
            {errors.birthdate?.message}
          </span>
        </div>
      </div>

      <label htmlFor="label">Dirección</label>
      <input
        className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
        type="text"
        {...register("address")}
        placeholder="Dirección"
        defaultValue={initialValues.address}
      />
      <span className="text-sm text-red-500">{errors.address?.message}</span>

      <label htmlFor="label">Usuario</label>
      <input
        className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
        type="text"
        {...register("username")}
        placeholder="Usuario"
        defaultValue={initialValues.username}
      />
      <span className="text-sm text-red-500">{errors.username?.message}</span>

      <label htmlFor="label">Correo</label>
      <input
        className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
        type="email"
        {...register("email")}
        placeholder="Correo"
        defaultValue={initialValues.email}
      />
      <span className="text-sm text-red-500">{errors.email?.message}</span>

      <label htmlFor="label">Contraseña</label>
      <input
        className="mb-3 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-700"
        type="password"
        {...register("password")}
        placeholder="Contraseña"
        defaultValue={initialValues.password}
      />
      <span className="text-sm text-red-500">{errors.password?.message}</span>

      <button
        className="mt-4 bg-slate-900 text-white p-2 rounded hover:bg-black"
        type="submit"
      >
        Registrarse
      </button>
    </form>
  );
};
