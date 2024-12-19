
import { IModule } from '@/shared/interfaces/IModule';
import { Calendar, CarFront, Filter, LayoutDashboard, List, Plus, User } from 'lucide-react';

export const modules: IModule[] = [
  {
      name: "Dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      subModules: [
          {
              name: "view",
              label: "Lista",
              icon: List,
          },
          {
              name: "new",
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
              name: "view",
              label: "Lista",
              icon: List,
          },
          {
              name: "new",
              label: "Crear",
              icon: Plus,
          },
          {
              name: "information",
              label: "Buscar",
              icon: Filter,
          },
          {
                name: "reservations",
                label: "Reservaciones",
                icon: Calendar,
          },

      ],
  },
  {
      name: "Users",
      label: "Usuarios",
      icon: User,
      subModules: [
          {
              name: "view",
              label: "Lista",
              icon: List,
          },
          {
              name: "new",
              label: "Crear",
              icon: Plus,
          },
      ],
  },
  {
      name: "Rentals",
      label: "Rentas",
      icon: Calendar,
      subModules: [
          {
              name: "view",
              label: "Lista",
              icon: List,
          },
      ],
  },
];

