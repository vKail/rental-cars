import { useCarStore } from "../../context/car-store"
import { CarsFrom } from "../components/cars-form"

export const CarsUpdateView = ({id} : {id: Number}) => {
    const {cars} = useCarStore();
    const currentCar = cars.find((car) => car.id === id);
    return (
        <div className="flex flex-col max-w-fit items-center justify-center p-10 bg-white">
            <h1 className="text-lg font-medium">Agregar un nuevo vehiculo</h1>
            <CarsFrom currentCar={currentCar}/>
        </div>
    )
}