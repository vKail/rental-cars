'use client';

import React, { useState } from 'react';

const PassForget: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simula el envío de una solicitud de recuperación de contraseña
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e0f7fa] to-slate-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {!submitted ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Recuperar Contraseña
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
              >
                Recuperar Contraseña
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ¡Revisa tu correo!
            </h2>
            <p className="text-gray-600">
              Hemos enviado un mensaje a <span className="font-medium">{email}</span> para reestablecer tu contraseña.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassForget;
