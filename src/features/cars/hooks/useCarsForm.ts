import * as yup from "yup";
import { ICar } from "../models/ICar";
import { useCarStore } from "../context/car-store";
import { useRouter } from "next/navigation";

export const useCarForm = (currentCar?: Partial<ICar>) => {
  const { addCar, updateCar } = useCarStore();
  const router = useRouter();
  const defaultValues: Partial<ICar> = {
    brand: currentCar?.brand || "",
    model: currentCar?.model || "",
    license_plate: currentCar?.license_plate || "",
    year: currentCar?.year || 0,
    vehicle_type: currentCar?.vehicle_type || "",
    status: currentCar?.status || "",
    daily_rate: currentCar?.daily_rate || "",
    image: currentCar?.image || "",
    motor: currentCar?.motor || "",
    chasis: currentCar?.chasis || "",
    door_count: currentCar?.door_count || 0,
    storage: currentCar?.storage || 0,
  };

  const validationSchema = yup.object().shape({
    brand: yup.string().required("La marca es requerida"),
    model: yup.string().required("El modelo es requerido"),
    license_plate: yup.string().required("La placa es requerida"),
    year: yup.number().required("El año es requerido ").min(1999).max(2024),
    vehicle_type: yup.string().required("El tipo de vehículo es requerido"),
    status: yup.string().required("El estado es requerido"),
    daily_rate: yup.string().required("El precio diario es requerido").min(1).max(500),
    image: yup.string().required("La imagen es requerida"),
    motor: yup.string().required("El motor es requerido").matches(/^[a-zA-Z0-9]*$/, "El motor solo puede contener letras y números"),
    chasis: yup.string().required("El chasis es requerido").matches(/^[a-zA-Z0-9]*$/, "El chasis solo puede contener letras y números"),
    door_count: yup.number().required("El número de puertas es requerido").min(2).max(5),
    storage: yup.number().required("El número de asientos es requerido").min(0).max(2),
  });

  const onSubmit = (values: Partial<ICar>) => {
    currentCar !== undefined
      ? updateCar(currentCar.id ?? 0, values)
      : addCar(values);
    router.push("/dashboard/cars/view");
  };

  return {
    defaultValues,
    validationSchema,
    onSubmit,
  };
};
