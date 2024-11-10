'use client';

import React, { useState } from 'react';

const SearchFilterPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const handleSearch = () => {
    // Simular la llamada a la API y mostrar la respuesta en consola
    console.log(`Buscando vehículos para: ${query}, Marca: ${brand}, Color: ${color}, Modelo: ${model}, Precio: ${price}, Año desde: ${yearFrom}, Año hasta: ${yearTo}`);
    // Aquí podrías agregar una llamada a la API real con fetch o axios
  };

  const handleShowAll = () => {
    console.log('Mostrando todos los vehículos');
    // Aquí podrías agregar una llamada a la API real para obtener todos los vehículos
  };

  return (
    <div className="text-black min-h-screen bg-gradient-to-r from-blue-100 to-slate-50 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">¿Qué estás buscando?</h1>
      <div className="w-full max-w-3xl space-y-4">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/751/751381.png"
            alt="icono"
            className="absolute left-2 top-4 w-6 h-6"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ingresa tu búsqueda general..."
            className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9394/9394452.png"
            alt="icono"
            className="absolute left-2 top-4 w-6 h-6"
          />
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Marca"
            className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/993/993814.png"
            alt="icono"
            className="absolute left-2 top-4 w-6 h-6"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/112/112963.png"
            alt="icono"
            className="absolute left-2 top-4 w-6 h-6"
          />
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Modelo"
            className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2854/2854320.png"
            alt="icono"
            className="absolute left-2 top-4 w-6 h-6"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2858/2858416.png"
              alt="icono"
              className="absolute left-2 top-4 w-6 h-6"
            />
            <input
              type="date"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              placeholder="Año desde"
              className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative flex-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2858/2858416.png"
              alt="icono"
              className="absolute left-2 top-4 w-6 h-6"
            />
            <input
              type="date"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              placeholder="Año hasta"
              className="w-full pl-10 p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Buscar
          </button>
          <button
            onClick={handleShowAll}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Mostrar Todos
          </button>
        </div>
      </div>
      <div className="mt-8 w-full max-w-3xl text-gray-700">
        <p className="text-center">Aquí se muestran los resulados??? Confirma Adrián</p>
      </div>
    </div>
  );
};

export default SearchFilterPage;
