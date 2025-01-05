import { useRouter } from "next/navigation";
import { useReservationStore } from "../context/reservation-store"
import { IReservationData } from "../models/IReservation";

export const useReservationView = () => {
    const {deleteReservation } = useReservationStore();
    const router = useRouter();

    const onDelete = (id : number) => {
        deleteReservation(id);
    }

    const onEdit = (id: number) => {
        router.push(`/dashboard/cars/reservation/${id}`)        
    }

    return {
        onDelete,
        onEdit
    }
}

