'use client'
import { useCarStore } from "@/features/cars/context/car-store";
import { CarsFilterView } from "@/features/cars/presentation/views/cars-filter-view";
import { CarsList } from "@/features/cars/presentation/views/cars-list-view";
import { CarsCardView } from "@/features/cars/presentation/views/cars-view";


const VehiclePage = () => {
    return (
        <div>
            <CarsList />
        </div>
    );
    }

export default VehiclePage;