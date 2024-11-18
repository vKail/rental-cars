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
import { Pencil, Trash, Trash2 } from "lucide-react";
import { useCarView } from "../../hooks/useCarView";

interface CarsTableProps {
    cars: Partial<ICar>[];
}
export const CarsTable = ({ cars }: CarsTableProps) => {
    const {onDelete, onEdit} = useCarView();
  
  return (
    <div className="">
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
              <TableCell><p className={`flex border-none rounded-md justify-center items-center p-1 m-1 h-7 w-20 text-white ${car.status == 'in_repair' ? 'bg-red-400  font-semibold' : 'bg-green-400  font-semibold'}` }>{car.status}</p></TableCell>
              <TableCell>{car.license_plate}</TableCell>
              <TableCell>{car.vehicle_type}</TableCell>
              <TableCell className="text-right">{car.daily_rate}</TableCell>
                <TableCell>
                    <button className="p-1 m-1" onClick={() => onDelete(car.id ?? 0)}>
                        <Trash2 size={18} className="text-red-500 transition hover:scale-110" />
                    </button>
                    <button className="p-1 m-1" onClick={() => onEdit(car.id ?? 0)}>
                        <Pencil size={18} className="text-blue-400  transition hover:scale-110" />
                    </button >
                </TableCell>
            </TableRow>
          ))}
        
      </TableBody>
    </Table>
    </div>
  );
};
