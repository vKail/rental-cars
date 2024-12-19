import { useRentalStore } from "../../context/use-rentals-store";
import { RentalForm } from "../components/rental-form"

export const RentalUpdateView = ({ id }: { id: number }) => {
    const { rentals } = useRentalStore();
    const currentRental = rentals.find((rental) => rental.reservation_id === id);

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Actualizar información del alquiler</h1>
            <RentalForm currentRental={currentRental} />
        </div>
    )
}
