import { useEffect } from "react";
import { useCarStore } from "../../context/car-store"
import { CarsTable } from "../components/cars-table"
import { useCarView } from "../../hooks/useCarView";

export const CarsList = () => {
    const {cars, fetchCars} = useCarStore();
    const {onAdd} = useCarView();
    useEffect(() => {
        fetchCars();
    }, [fetchCars])
    return (
        <div className="flex-1 overflow-auto ">
            <div className="flex flex-row justify-between p-2">
                <h1 className="font-bold text-2xl">Lista de vehículos registrados</h1>
                <button className="transition-colors w-24 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
                    onClick={() => onAdd()}
                >Nuevo</button>
            </div>
            <CarsTable cars={cars} />
        </div>
    )
}