'use client'
import { useEffect } from "react";
import { useReservationStore } from "../../context/reservation-store"
import { ReservationTable } from "../components/reservations-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AllReservationsListView = () => {
    const {fetchAllReservations, reservations} = useReservationStore();

    useEffect(() => {
        fetchAllReservations()
    },[])

    return(
        <div className="flex flex-col">
            <div>
                <Button>
                    <Link href='/dashboard/cars/information'>Entregar vehículo</Link>
                </Button>
            </div>
            <div>
                <ReservationTable reservations={reservations} />
            </div>
        </div>
    ) 
}