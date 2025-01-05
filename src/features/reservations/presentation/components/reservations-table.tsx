import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { Pencil, Trash, Trash2, Eye } from "lucide-react";
import { useReservationView } from "../../hooks/useReservationView";
import { IReservationResponse } from "../../models/IReservation";
import { UseAuthStore } from "@/features/auth/context/auth-user-store";
import Link from "next/link";
interface ReservationsTableProps {
    reservations: IReservationResponse[]
}
export const ReservationTable = ({ reservations }: ReservationsTableProps) => {
  const { onDelete, onEdit } = useReservationView();
     const {user} = UseAuthStore()
  return (
    <div className="">
      <Table>
        <TableCaption>Reservaciones.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Tipo de vehículo</TableHead>
            <TableHead>Costo diario</TableHead>
            <TableHead>Fecha de inicio</TableHead>
            <TableHead>Fecha de devolución</TableHead>
            {
              user?.role === 'administrador' && (
                <TableHead>Acciones</TableHead>
              )
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.vehicle.brand}</TableCell>
              <TableCell>{reservation.vehicle.model}</TableCell>
              <TableCell>{reservation.vehicle.license_plate}</TableCell>
              <TableCell>{reservation.vehicle.vehicle_type}</TableCell>
              <TableCell>{reservation.vehicle.daily_rate}</TableCell>
              <TableCell>{reservation.reservation_date.toString()}</TableCell>
              <TableCell>{reservation.refund_date.toString()}</TableCell>
              {
              user?.role === 'administrador' && (
                <TableCell>
                  {/* <button
                    className="p-1 m-1"
                    onClick={() => onDelete(reservation.id ?? 0)}
                  >
                    <Trash2
                      size={18}
                      className="text-red-500 transition hover:scale-110"
                    />
                  </button> */}
                  {/* <button className="p-1 m-1" onClick={() => onEdit(reservation.id ?? 0)}>
                    <Pencil
                      size={18}
                      className="text-blue-400  transition hover:scale-110"
                    />
                  </button> */}
                  <Link href={`/dashboard/rentals/new/${reservation.id}`}>
                    
                      <Eye
                        size={18}
                        className="text-blue-400  transition hover:scale-110"
                      />
                    
                  </Link>
                </TableCell>
              )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
