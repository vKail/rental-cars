import { useCarStore } from "../context/car-store";
import { ICar } from "../models/ICar";
import * as yup from "yup"
import { ICarFilter } from "../models/ICarFilter";

export const useCarFilter = () => {
    const { fetCarsByFilters } = useCarStore();
    const defaultValues : Partial<ICarFilter> = {
        brand: [],
        model: [],
        year: [],
        vehicle_type: [],
        daily_rate: [],
    };

    const validationSchema = yup.object().shape({
        brand: yup.array().required('Brand is required').default([]),
        model: yup.array().required('Model is required').default([]),
        year: yup.array().required('Year is required').default([]),
        vehicle_type: yup.array().required('Vehicle type is required').default([]),
        daily_rate: yup.array().required('Daily rate is required').default([]),
    })

    const onSubmit = (values: Partial<ICarFilter>) => {
        fetCarsByFilters(values);
        console.log(values);
      };
      

    return {
        defaultValues,
        validationSchema,
        onSubmit
    }
}