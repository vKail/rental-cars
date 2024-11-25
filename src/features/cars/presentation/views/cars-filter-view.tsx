'use client'
import { useEffect, useState } from "react";
import { useCarStore } from "../../context/car-store";
import { CarsFilterComponent } from "../components/cars-filter"

export const CarsFilterView = () => {
    const {cars, fetchCars} = useCarStore();
    const [models, setModels] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const minRates = ["10.00", "20.00", "30.00", "40.00", "50.00"];
    const maxRates = ["100.00", "200.00", "300.00", "400.00", "500.00"];
    cars.forEach((car) => {
        if (car.model && !models.includes(car.model)) setModels([...models, car.model]);
        if (car.year && !years.includes(car.year)) setYears([...years, car.year]);
        
    });
    useEffect(() => {
        fetchCars();
    }, [fetchCars])
    return (
        <div>
            <CarsFilterComponent models={models} years={years} minRates={minRates} maxRates={maxRates} />
        </div>
    )
}