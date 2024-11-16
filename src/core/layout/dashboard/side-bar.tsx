"use client";

import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { Nav } from './nav';
import { IModule } from '@/shared/interfaces/IModule';

const modules: IModule[] = [
  { name: 'Dashboard', subModules: [] },
  { name: 'Users', subModules: [] },
  { name: 'Cars', subModules: [] },
  { name: 'Reservations', subModules: [] },
  { name: 'Reports', subModules: [] },
  { name: 'Settings', subModules: [] },
];

export const SideBar = () => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Contenedor principal que incluye botón y nav */}
      <div className={`
        flex flex-col bg-gray-50
        transition-all duration-500 ease-in-out
        ${isClosed ? 'w-16' : 'w-64'}
      `}>
        {/* Botón de toggle */}
        <div className="flex w-full p-2">
          <button 
            onClick={() => setIsClosed(!isClosed)}
            className={`
              p-2 transition-transform duration-500 ease-in-out
              ${isClosed ? 'rotate-180' : 'rotate-0'}
            `}
          >
            <AlignJustify size={32} />
          </button>
        </div>

        {/* Nav */}
        <div className={`
          flex-1  ease-in-out
          ${isClosed ? 'opacity-0 transition-opacity duration-150' : 'opacity-100 transition-opacity duration-500'}
        `}>
          <Nav modules={modules} />
        </div>
      </div>
    </div>
  );
};