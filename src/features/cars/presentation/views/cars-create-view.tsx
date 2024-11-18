import { CarsFrom } from "../components/cars-form"

export const CarsCreateView = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Agregar un nuevo vehiculo</h1>
            <CarsFrom />
        </div>
    )
}