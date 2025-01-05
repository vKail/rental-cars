import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRental, IRentalResponse, RentalStatus } from "../../models/IRental";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRentalView } from "../../hooks/userRentalView";

interface RentalsTableProps {
  rentals: IRentalResponse[];
}

const getRentalStatusClass = (status: number) => {
  switch (status) {
    case RentalStatus.AVAILABLE:
      return "bg-green-500";
    case RentalStatus.UNAVAILABLE:
      return "bg-red-500";
    case RentalStatus.DAMAGED:
      return "bg-yellow-500";
    case RentalStatus.RESERVED:
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

const getRentalStatusText = (status: number) => {
  switch (status) {
    case RentalStatus.AVAILABLE:
      return "Disponible";
    case RentalStatus.UNAVAILABLE:
      return "No Disponible";
    case RentalStatus.DAMAGED:
      return "Dañado";
    case RentalStatus.RESERVED:
      return "Reservado";
    default:
      return "Desconocido";
  }
};

export const RentalsTable = ({ rentals }: RentalsTableProps) => {
  const { onDelete, onEdit } = useRentalView();

  return (
    <div className="w-full">
      <Table>
        <TableCaption>Alquileres registrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID Reserva</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Odómetro Inicial</TableHead>
            <TableHead>Odómetro Final</TableHead>
            <TableHead>Tarifa ID</TableHead>
            <TableHead>Fecha Devolución</TableHead>
            {/* <TableHead>Daños</TableHead> */}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.reservation_id}>
              <TableCell>{rental.reservation_id}</TableCell>
              <TableCell>
                <p
                  className={`flex border-none rounded-md justify-center items-center p-1 m-1 h-7 w-28 text-white font-semibold ${getRentalStatusClass(
                    Number(rental.car_status)
                  )}`}
                >
                  {getRentalStatusText(Number(rental.car_status))}
                </p>
              </TableCell>
              <TableCell>{rental.initial_odometer} km</TableCell>
              <TableCell>{rental.final_odometer || "Pendiente"} km</TableCell>
              <TableCell>{rental.rate_id}</TableCell>
              <TableCell>
                {rental.actual_refund_date
                  ? format(new Date(rental.actual_refund_date), "PPp", {
                      locale: es,
                    })
                  : "Pendiente"}
              </TableCell>
              {/* <TableCell>
                {rental.damages?.length || 0} daño(s) reportado(s)
              </TableCell> */}
              <TableCell className="space-x-2">
                <button
                  className="p-1 m-1"
                  onClick={() => onDelete(rental.reservation_id)}
                >
                  <Trash2
                    size={18}
                    className="text-red-500 transition hover:scale-110"
                  />
                </button>
                <button
                  className="p-1 m-1"
                  onClick={() => onEdit(rental.reservation_id)}
                >
                  <Pencil
                    size={18}
                    className="text-blue-400 transition hover:scale-110"
                  />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};