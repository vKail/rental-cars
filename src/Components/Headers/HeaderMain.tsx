'use client';

import React from 'react';

const Header: React.FC = () => {
  const handleSearchClick = () => {
    console.log('Buscador clicked');
  };

  const handleLogout = () => {
    console.log('Cerrar sesión clicked');
    // Aquí iría la lógica de cierre de sesión
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
      <div className="flex items-center">
        <img
          src="https://ferrariclubarg.com.ar/wp-content/uploads/como-convertir-una-imagen-con-fondo-transparente-scaled.webp"
          alt="Logo"
          className="h-10 w-auto mr-4"
        />
      </div>

      <div
        className="flex-1 text-center text-white font-semibold cursor-pointer"
        onClick={handleSearchClick}
      >
        Buscador
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
