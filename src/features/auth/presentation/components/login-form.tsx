'use client'
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { yupResolver } from '@hookform/resolvers/yup';
import { IAuth } from "../../models/IAuth";
import Link from "next/link";

export const LoginForm = () => {
    const { initialValues, validationSchema, onSubmit } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm<IAuth>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <form
            className="flex flex-col w-full max-w-sm p-6 bg-white shadow-md border border-gray-200 rounded-2xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <label htmlFor="label" className="text-base font-medium pb-3">Correo </label>
            <input
                type="email"
                {...register('email')}
                placeholder="Correo"
                defaultValue={initialValues.email}
                className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>

            <label htmlFor="label" className="text-base font-medium pb-3">Contraseña </label>
            <input
                type="password"
                {...register('password')}
                placeholder="Contraseña"
                defaultValue={initialValues.password}
                className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <span className="text-red-500 text-sm">{errors.password?.message}</span>

            <div className="">
          <span className="text-slate-900 text-sm">
            Olvidaste tu contraseña?
          </span>
          <Link href="/passwordRecovery">
            <span className="text-blue-400 text-sm">
              {" "}
              <u>Haz click aquí</u>
            </span>
          </Link>
        </div>

            <button
                type="submit"
                className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};
