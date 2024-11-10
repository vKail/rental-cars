'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Intenta iniciar sesión con las credenciales proporcionadas estaticas por falta de backend

    if(email == 'user@user' && password == 'password'){
      router.push('/main');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        user: { email, password }
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Login exitoso:', data);

        // Guarda las cookies directamente sin JSON.stringify
        Cookies.set('token', data.data.access_token, { expires: 3 });

        router.push('/main');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el login', error);
      alert('Hubo un error durante el login. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e0f7fa] to-slate-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Botón de Iniciar Sesión */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </div>

          <div>
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
              onClick={() => router.push('/register')}
            >
              Crear Nuevo Usuario
            </button>
          </div>
        </form>

        {/* Mensaje de Olvidaste tu contraseña */}
        <div className="text-center mt-6">
          <a href="/forget" className="text-sm text-indigo-600 hover:text-indigo-500">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
