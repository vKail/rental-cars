'use client'
import { useCarStore } from "@/features/cars/context/car-store";
import { CarsFilterView } from "@/features/cars/presentation/views/cars-filter-view";
import { CarsCardView } from "@/features/cars/presentation/views/cars-view";


const VehiclePage = () => {
    return (
        <div className="flex flex-row">
            <div>
                <CarsFilterView />
            </div>
            <div>
                <h1>Vehicle Page</h1>
                <CarsCardView />
            </div>
            
           
        </div>
    );
    }

export default VehiclePage;