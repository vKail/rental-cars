import * as yup from "yup";
import { ICar } from "../models/ICar";
import { useCarStore } from "../context/car-store";

export const useCarForm = () => {
    const {addCar} = useCarStore();
  const defaultValues: Partial<ICar> = {
    brand: '',
    model: '',
    license_plate: '',
    year: 0,
    vehicle_type: '',
    status: '',
    daily_rate: '',
  };

  const validationSchema = yup.object().shape({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    license_plate: yup.string().required('License plate is required'),
    year: yup.number().required('Year is required'),
    vehicle_type: yup.string().required('Vehicle type is required'),
    status: yup.string().required('Status is required'),
    daily_rate: yup.string().required('Daily rate is required'),
  });

  const onSubmit = (values: Partial<ICar>) => {
    addCar(values);
  }

  return {
    defaultValues,
    validationSchema,
    onSubmit
  }
};
