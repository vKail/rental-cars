'use client'
import { ReservationView } from "@/features/reservations/presentation/views/reservation-view";
import { useParams } from "next/navigation";


const ReservationPage = () => {
    const {id} = useParams();
    return <ReservationView car_id={Number(id)} />;
}

export default ReservationPage;