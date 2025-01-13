import { IModule } from "@/shared/interfaces/IModule";
import {
  Calendar,
  CarFront,
  Filter,
  LayoutDashboard,
  List,
  Plus,
  User,
} from "lucide-react";

export const modulesByRole: Record<
  "administrador" | "client" | "employee",
  IModule[]
> = {
  administrador: [
    {
      route: "dashboard/cars",
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
          name: "allreservations",
          label: "Reservaciones",
          icon: List,
        },
      ],
    },
    {
      route: "dashboard/users",
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
      route: "dashboard/rentals",
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
    {
      route: "reservation_car",
      label: "Reservar un vehículo",
      icon: LayoutDashboard,
      subModules: [
        {
          name: "information",
          label: "Información",
          icon: Filter,
        },
      ],
    },
  ],
  client: [
    {
      route: "reservation_car",
      label: "Reservar un vehículo",
      icon: LayoutDashboard,
      subModules: [
        {
          name: "information",
          label: "Información",
          icon: Filter,
        },
      ],
    },
  ],
  employee: [
    {
      route: "dashboard/cars",
      label: "Carros",
      icon: CarFront,
      subModules: [
        {
          name: "view",
          label: "Lista",
          icon: List,
        },
        {
          name: "reservations",
          label: "Reservaciones",
          icon: Calendar,
        },
      ],
    },
    {
      route: "dashboard/rentals",
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
    {
      route: "reservation_car",
      label: "Reservar un vehículo",
      icon: LayoutDashboard,
      subModules: [
        {
          name: "information",
          label: "Información",
          icon: Filter,
        },
      ],
    },
  ],
};
