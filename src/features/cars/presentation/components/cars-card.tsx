import Image from "next/image";
import { ICar } from "../../models/ICar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CarCardViewProps {
  cars: Partial<ICar>[];
}

export const CarCardComponent = ({ cars }: CarCardViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {cars.map((car) => (
        <div
          className="flex flex-col h-[500px] w-80 max-w-[300px] border rounded-2xl shadow-sm p-4 mx-auto bg-white"
          key={car.id}
        >
          <div className="flex flex-col h-full">
            <div className="w-full h-[200px] relative mb-4">
              <Image
                className="rounded-xl object-cover"
                src={car.image || "/default-car.jpg"}
                alt={car.model || "Default Model"}
                fill
                sizes="(max-width: 300px) 100vw"
                priority
              />
            </div>
            
            <div className="flex flex-col flex-grow space-y-2">
              <div className="flex mx-2">
                <p className="font-medium w-32">Marca:</p>
                <p>{car.brand}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Modelo:</p>
                <p>{car.model}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Año:</p>
                <p>{car.year}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Nro Puertas:</p>
                <p>{car.door_count}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Tipo:</p>
                <p>{car.vehicle_type}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Capacidad:</p>
                <p>{car.storage}</p>
              </div>
              <div className="flex mx-2">
                <p className="font-medium w-32">Costo diario:</p>
                <p>${car.daily_rate}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button className="w-full">
                <Link href={`/dashboard/cars/reservation/${car.id}`} className="w-full">
                  Alquilar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
