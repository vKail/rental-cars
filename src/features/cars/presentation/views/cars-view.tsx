'use client'
import { useEffect } from "react";
import { useCarStore } from "../../context/car-store";
import { CarCardComponent } from "../components/cars-card";

export const CarsCardView = () => {
    const {cars, fetchCars} = useCarStore();
    useEffect(() => {
        fetchCars();
    }, [fetchCars]);
    return (
        <div>
            <CarCardComponent cars={cars}/>
        </div>
    )
}