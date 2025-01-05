import { RentalForm } from "../components/rental-form"

export const RentalCreateView = ({id} : {id : number}) => {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Registrar nuevo alquiler</h1>
            <RentalForm id={id}/>
        </div>
    )
}