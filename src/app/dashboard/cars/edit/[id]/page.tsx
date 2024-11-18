'use client'
import { CarsUpdateView } from "@/features/cars/presentation/views/cars-update-view";
import { useParams } from "next/navigation";

const CarEditPage = () => {
  const { id } = useParams();

  return <CarsUpdateView id={Number(id)} />
}

export default CarEditPage;