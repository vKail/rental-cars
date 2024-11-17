import { useEffect } from "react";
import { useCarStore } from "../../context/car-store"
import { CarsTable } from "../components/cars-table"

export const CarsList = () => {
    const {cars, fetchCars} = useCarStore();
    useEffect(() => {
        fetchCars();
    }, [fetchCars])
    return (
        <div className="flex-1 overflow-auto">
            <CarsTable cars={cars} />
        </div>
    )
}