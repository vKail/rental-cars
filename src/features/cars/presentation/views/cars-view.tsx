import { useEffect } from "react";
import { useCarStore } from "../../context/car-store";
import { CarCardComponent } from "../components/cars-card-component";

export const CarsCardView = () => {
    const {cars, fetchCars} = useCarStore();
    useEffect(() => {
        fetchCars();
    }, [fetchCars]);
    return (
        <>
            <CarCardComponent cars={cars}/>
        </>
    )
}