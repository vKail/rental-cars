import { ICar } from "../models/ICar";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";
import { DataSourceImpl } from "../services/DataSource";

interface CarStore {
    cars: Partial<ICar>[];
    loading: boolean;
    error: string;
    fetchCars: () => void;
    addCar: (car: Partial<ICar>) => void;
    updateCar: (car: Partial<ICar>) => void;
    deleteCar: (id: number) => void;
}

const STORE_NAME = 'car';
const DEFAULT_CARS: ICar[] = [];

export const CarStore = create<CarStore>(
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
            addCar: async (car: Partial<ICar>) => {
                set({ loading: true });
                const newCar = await DataSourceImpl.getInstance().createCar(car);
                set({ cars: [...get().cars, newCar], loading: false });
               
            },
            updateCar: async (car: Partial<ICar>) => {
                set({ loading: true });
                if (car.id !== undefined) {
                    await DataSourceImpl.getInstance().updateCar(car.id, car);
                    const updatedCars = get().cars.map((c) => c.id === car.id ? car : c);
                    set({ cars: updatedCars, loading: false });
                } else {
                    set({ error: 'Car ID is undefined', loading: false });
                }
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

