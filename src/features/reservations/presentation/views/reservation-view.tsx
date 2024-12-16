'use client'
import { useCarStore } from "@/features/cars/context/car-store";
import { ReservationInfo } from "../components/reservation-info"
import { UseAuthStore } from "@/features/auth/context/auth-user-store";

interface IParams {
    car_id: number;
}

export const ReservationView = ({car_id}: IParams) => {
    const {cars} = useCarStore();
    const {user} = UseAuthStore();
    const user_id = user?.id ?? 0;
    const car = cars.find((car) => car.id === car_id) || {};
    return (
        <div>
            <ReservationInfo car={car} user_id={user_id} />
        </div>
    )
}
