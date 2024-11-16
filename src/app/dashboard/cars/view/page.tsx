'use client'
import { useCarStore } from "@/features/cars/context/car-store";
import { CarsCardView } from "@/features/cars/presentation/views/cars-view";


const VehiclePage = () => {
    return (
        <div>
            <h1>Vehicle Page</h1>
           <CarsCardView />
        </div>
    );
    }

export default VehiclePage;