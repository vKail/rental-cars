import { ICar } from "../models/ICar";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";
import toast from "react-hot-toast";
import { DataSourceImpl } from "../services/DataSource";
import { ICarFilter } from "../models/ICarFilter";

interface CarStore {
    cars: Partial<ICar>[];
    loading: boolean;
    error: string;
    fetchCars: () => void;
    fetchCarsByFilters : (params: Partial<ICarFilter>) => void
    addCar: (car: Partial<ICar>) => void;
    updateCar: (id: number, car: Partial<ICar>) => void;
    deleteCar: (id: number) => void;
}

const STORE_NAME = 'car';
const DEFAULT_CARS: ICar[] = [];

export const useCarStore = create<CarStore>(
    persist(
        (set, get) => ({
            cars: [],
            loading: false,
            error: '',
            fetchCars: async () => {
                set({ loading: true });
                const cars = await DataSourceImpl.getInstance().getAllCars();
                set({cars: cars, loading: false});
                

            },
            fetchCarsByFilters: async (params: Partial<ICarFilter>) => {
                set({ loading: true });
                const cars = await DataSourceImpl.getInstance().getAllCarsAvailablesByFilter(params);
                set({cars: cars, loading: false});
            },
            
            addCar: async (car: Partial<ICar>) => {
                set({ loading: true });
                const newCar = await DataSourceImpl.getInstance().createCar(car);
                set({ cars: [...get().cars, newCar], loading: false });
               
            },
            updateCar: async (id: number, car: Partial<ICar>) => {
                set({ loading: true });
                    await DataSourceImpl.getInstance().updateCar(id, car);
                
            },
            deleteCar: async (id: number) => {
                set({ loading: true });
                const cars = get().cars.filter((c) => c.id !== id);
                set({ cars, loading: false });
                await DataSourceImpl.getInstance().deleteCar(id);

                
            },
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage),
        },
    ) as StateCreator<CarStore>,
);

