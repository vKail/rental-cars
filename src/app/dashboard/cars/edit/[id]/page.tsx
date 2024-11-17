'use client'
import { CarsUpdateView } from "@/features/cars/presentation/views/cars-update-view";
import { useParams } from "next/navigation";

const CarEditPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 >Editar el vehículo</h1>
      <CarsUpdateView id={Number(id)} />
    </div>
  );
}

export default CarEditPage;