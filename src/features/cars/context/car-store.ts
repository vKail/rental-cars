import { ICar } from "../models/ICar";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";
import toast from "react-hot-toast";
import { DataSourceImpl } from "../services/DataSource";
import { ICarFilter } from "../models/ICarFilter";

interface CarStore {
    cars: Partial<ICar>[];
    error: string;
    fetchCars: () => void;
    fetchCarsAvialable: () => void;
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
            error: '',
            fetchCars: async () => {
                const cars = await DataSourceImpl.getInstance().getAllCars();
                set({cars: cars});
            },
            fetchCarsAvialable: async () => {
                const cars = await DataSourceImpl.getInstance().getAllCarsAvailables();
                set({cars: cars});
            },
            fetchCarsByFilters: async (params: Partial<ICarFilter>) => {
                const cars = await DataSourceImpl.getInstance().getAllCarsAvailablesByFilter(params);
                set({cars: cars});
            },
            
            addCar: async (car: Partial<ICar>) => {
                const newCar = await DataSourceImpl.getInstance().createCar(car);
               
            },
            updateCar: async (id: number, car: Partial<ICar>) => {
                    await DataSourceImpl.getInstance().updateCar(id, car);
                
            },
            deleteCar: async (id: number) => {
                set({cars : get().cars.filter(car => car.id !== id)})
                await DataSourceImpl.getInstance().deleteCar(id);
            },
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage),
        },
    ) as StateCreator<CarStore>,
);

