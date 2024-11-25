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
  };

  const validationSchema = yup.object().shape({
    brand: yup.string().required("Brand is required"),
    model: yup.string().required("Model is required"),
    license_plate: yup.string().required("License plate is required"),
    year: yup.number().required("Year is required").min(1900).max(2024),
    vehicle_type: yup.string().required("Vehicle type is required"),
    status: yup.string().required("Status is required"),
    daily_rate: yup.string().required("Daily rate is required"),
    image: yup.string().required("Image is required"),
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
