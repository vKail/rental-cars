import { CarsFrom } from "../components/cars-form"

export const CarsCreateView = () => {
    return (
        <div className="flex flex-col max-w-fit items-center justify-center p-10 bg-white">
            <h1 className="text-lg font-medium">Agregar un nuevo vehiculo</h1>
            <CarsFrom />
        </div>
    )
}