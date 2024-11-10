'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Explain: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si la cookie "token" existe
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
    if (tokenCookie) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleStart = () => {
    //if (isAuthenticated) {
      router.push('main/search');  
    //} else {
    //   alert('Debes estar autenticado para continuar.');
    //   router.push('/');
    //}
  };

  return (
    <div className="text-black min-h-screen min-w-full bg-white flex flex-col items-center py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start mt-10 min-w-fit px-40">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-black">Rentar un carro nunca habia sido tan sencillo</h1>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-16 w-full lg:w-1/2">
          <div className="flex items-start space-x-4 py-6 border-t border-gray-200">
            <span className="text-2xl font-semibold text-black">1</span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">Busca un carro adecuado a tí</h2>
              <p className="text-gray-500">
                A través de nuestro filtro personalizado selecciona el carro que más se ajuste a tus necesidades y gustos. Nuestro filtro te permitirá seleccionar el carro por marca, modelo, año, color, entre otros.
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5639/5639164.png"
              alt="Imagen 1"
              className="w-20 h-20"
            />
          </div>

          <div className="flex items-start space-x-4 py-6 border-t border-gray-200">
            <span className="text-2xl font-semibold text-black">2</span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">Registra los datos del alquiler</h2>
              <p className="text-gray-500">
                Mediante un formulario sencillo y rápido, registra los datos del alquiler, selecciona la fecha de inicio y fin del alquiler, selecciona el método de pago y listo.
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3200/3200751.png"
              alt="Imagen 2"
              className="w-20 h-20"
            />
          </div>

          <div className="flex items-start space-x-4 py-6 border-t border-gray-200">
            <span className="text-2xl font-semibold text-black">3</span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">Disfruta y Devuelve</h2>
              <p className="text-gray-500">
                Una vez registrado el alquiler, solo queda disfrutar del carro y devolverlo en la fecha acordada. Recuerda que debes devolver el carro en las mismas condiciones en las que lo recibiste.
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2417/2417300.png"
              alt="Imagen 3"
              className="w-20 h-20"
            />
          </div>
        </div>
      </div>

      <button
        className="mt-10 bg-red-500 text-white font-semibold py-3 px-6 rounded-full"
        onClick={handleStart}
      >
        Comencemos
      </button>
    </div>
  );
};

export default Explain;
