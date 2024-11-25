"use client";

import { AlignJustify, Calendar, CarFront, Filter, LayoutDashboard, List, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { Nav } from './nav';
import { IModule } from '@/shared/interfaces/IModule';

const modules: IModule[] = [
  {
      name: "Dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      subModules: [
          {
              name: "list",
              label: "Lista",
              icon: List,
          },
          {
              name: "create",
              label: "Crear",
              icon: Plus,
          },
      ],
  },
  {
      name: "Cars",
      label: "Carros",
      icon: CarFront,
      subModules: [
          {
              name: "list",
              label: "Lista",
              icon: List,
          },
          {
              name: "create",
              label: "Crear",
              icon: Plus,
          },
          {
              name: "filters",
              label: "Buscar",
              icon: Filter,
          },
      ],
  },
  {
      name: "Users",
      label: "Usuarios",
      icon: User,
      subModules: [
          {
              name: "list",
              label: "Lista",
              icon: List,
          },
          {
              name: "create",
              label: "Crear",
              icon: Plus,
          },
      ],
  },
  {
      name: "Reservations",
      label: "Reservaciones",
      icon: Calendar,
      subModules: [
          {
              name: "list",
              label: "Lista",
              icon: List,
          },
          {
              name: "create",
              label: "Crear",
              icon: Plus,
          },
      ],
  },
];

export const SideBar = () => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className="flex">
      <div className={`
        flex flex-col bg-white transition-all duration-500 ease-in-out border-r 
        ${isClosed ? 'w-16' : 'w-64'}
      `}>
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