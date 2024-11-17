import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCarStore } from "../../context/car-store";
import { useEffect } from "react";
import { ICar } from "../../models/ICar";

interface CarsTableProps {
    cars: Partial<ICar>[];
}
export const CarsTable = ({ cars }: CarsTableProps) => {
  
  return (
    <Table>
      <TableCaption>Carros registrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Marca</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Año</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Matrícula</TableHead>
          <TableHead>Tipo de vehículo</TableHead>
          <TableHead >Costo diario</TableHead>
          <TableHead >Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell className="w-[100px]">{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.status}</TableCell>
              <TableCell>{car.license_plate}</TableCell>
              <TableCell>{car.vehicle_type}</TableCell>
              <TableCell className="text-right">{car.daily_rate}</TableCell>
                <TableCell>
                    <button className="transition border rounded-md p-1 m-1 w-16 bg-blue-500 text-white font-medium hover:bg-blue-600 hover:scale-105">Editar</button>
                    <button className="transition border rounded-md p-1 m-1 w-16 bg-red-500 text-white font-medium hover:bg-red-600 hover:scale-105">Eliminar</button>
                </TableCell>
            </TableRow>
          ))}
        
      </TableBody>
    </Table>
  );
};
