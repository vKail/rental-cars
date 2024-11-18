import { CarsFilterView } from "@/features/cars/presentation/views/cars-filter-view"
import { CarsCardView } from "@/features/cars/presentation/views/cars-view"

const InfoPage = () => {
    return (
          <div className="flex flex-row">
            <div>
                <CarsFilterView />
            </div>
            <div>
                <CarsCardView />
            </div>
            
           
        </div>
    )
}

export default InfoPage