import { useCarStore } from "../context/car-store";
import { ICarFilter } from "../models/ICarFilter";

export const useCarFilter = () => {
    const { fetchCarsByFilters } = useCarStore();
    const defaultValues : Partial<ICarFilter> = {
        brands: [],
        models: [],
        years: [],
        vehicle_type: [],
        max_price: [],
        min_price: []
    };

    const onSubmit = (values: Partial<ICarFilter>) => {
        fetchCarsByFilters(values);
      };

      const onReset = () => {
        
      }
      

    return {
        defaultValues,
        onSubmit
    }
}