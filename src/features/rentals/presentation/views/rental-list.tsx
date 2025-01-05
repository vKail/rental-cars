import { useEffect } from "react";
import { useRentalStore } from "../../context/use-rentals-store";
import { useRentalView } from "../../hooks/userRentalView";
import { RentalsTable } from "../components/rental-table";

export const RentalsList = () => {
  const { rentals, fetchRentals } = useRentalStore();
  const { onAdd } = useRentalView();

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Lista de Alquileres Registrados</h1>
        <button
          className="transition-colors w-24 bg-black text-white p-2 rounded-lg hover:bg-gray-800"
          onClick={() => onAdd()}
        >
          Nuevo
        </button>
      </div>
      <RentalsTable rentals={rentals} />
    </div>
  );
};