import { useEffect, useState } from "react";
import { useCarStore } from "../../context/car-store";
import { CarsFilterComponent } from "../components/cars-filter-component"

export const CarsFilterView = () => {
    const {cars, fetchCars} = useCarStore();
    const [models, setModels] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [dailyRates, setDailyRates] = useState<string[]>([]);
    cars.forEach((car) => {
        if (car.model && !models.includes(car.model)) setModels([...models, car.model]);
        if (car.year && !years.includes(car.year)) setYears([...years, car.year]);
        if (car.daily_rate && !dailyRates.includes(car.daily_rate)) setDailyRates([...dailyRates, car.daily_rate]);
    });
    useEffect(() => {
        fetchCars();
    }, [fetchCars])
    return (
        <div>
            <CarsFilterComponent models={models} years={years} dailyRates={dailyRates} />
        </div>
    )
}