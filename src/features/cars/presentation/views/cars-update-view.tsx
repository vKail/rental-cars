import { useCarStore } from "../../context/car-store"
import { CarsFrom } from "../components/cars-form"

export const CarsUpdateView = ({id} : {id: Number}) => {
    const {cars} = useCarStore();
    const currentCar = cars.find((car) => car.id === id);
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Editar información del vehiculo</h1>
            <CarsFrom currentCar={currentCar}/>
        </div>
    )
}