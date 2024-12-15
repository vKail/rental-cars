import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useUserView } from "../../hooks/useUserView";
import { IUser } from "../../models/IUser";
interface usersTableProps {
  users: Partial<IUser>[];
}
export const UsersTable = ({ users }: usersTableProps) => {
  const { onDelete, onEdit } = useUserView();

  return (
    <div className="">
      <Table>
        <TableCaption>Usuarios registrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Nombre de Usario</TableHead>
            <TableHead>Correo electrónico</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Fecha de nacimiento</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
  {user.birthdate
    ? new Date(user.birthdate).toDateString() // Convertir la cadena a Date
    : ""}
</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button
                  className="p-1 m-1"
                  onClick={() => onDelete(user.id ?? 0)}
                >
                  <Trash2
                    size={18}
                    className="text-red-500 transition hover:scale-110"
                  />
                </button>
                <button
                  className="p-1 m-1"
                  onClick={() => onEdit(user.id ?? 0)}
                >
                  <Pencil
                    size={18}
                    className="text-blue-400  transition hover:scale-110"
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
