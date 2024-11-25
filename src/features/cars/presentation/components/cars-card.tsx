import Image from "next/image";
import { ICar } from "../../models/ICar";

interface CarCardViewProps {
  cars: Partial<ICar>[];
}

export const CarCardComponent = ({ cars }: CarCardViewProps) => {
  return (
    <div className="flex flex-row flex-wrap">
      {cars.map((car) => (
        <div
          className="flex flex-col justify-center items-center  w-64 h-72 border rounded-2xl shadow-sm p-2 m-4"
          key={car.id}
        >
          <div className="flex flex-col ">
            <Image
              className="rounded-xl m-2"
              src={car.image || "/default-car.jpg"}
              alt={car.model || "Default Model"}
              width={210}
              height={200}
            />
            <h1 className="flex mx-2">
              {" "}
              <p className="font-medium pr-1">Marca:</p> {car.brand}
            </h1>
            <h1 className="flex mx-2">
              {" "}
              <p className="font-medium pr-1">Modelo:</p> {car.model}
            </h1>
            <h1 className="flex mx-2">
              {" "}
              <p className="font-medium pr-1">Año:</p> {car.year}
            </h1>
            <h1 className="flex mx-2">
              {" "}
              <p className="font-medium pr-1">Costo diario:</p> {car.daily_rate}{" "}
              $
            </h1>
            <button className=" font-light text-white border rounded-md bg-new-black hover:bg-new-back-hover m-2">
              Alquilar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
