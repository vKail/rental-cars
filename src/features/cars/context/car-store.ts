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
    fetchCarsByFilters: (params: Partial<ICarFilter>) => void;
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
                try {
                    const cars = await DataSourceImpl.getInstance().getAllCars();
                    set({ cars: cars });
                    toast.success('Cars fetched successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cars';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
            fetchCarsAvialable: async () => {
                try {
                    const cars = await DataSourceImpl.getInstance().getAllCarsAvailables();
                    set({ cars: cars });
                    toast.success('Available cars fetched successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch available cars';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
            fetchCarsByFilters: async (params: Partial<ICarFilter>) => {
                try {
                    const cars = await DataSourceImpl.getInstance().getAllCarsAvailablesByFilter(params);
                    set({ cars: cars });
                    toast.success('Filtered cars fetched successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch filtered cars';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
            addCar: async (car: Partial<ICar>) => {
                try {
                    const newCar = await DataSourceImpl.getInstance().createCar(car);
                    set({ cars: [...get().cars, newCar] });
                    toast.success('Car added successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to add car';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
            updateCar: async (id: number, car: Partial<ICar>) => {
                try {
                    await DataSourceImpl.getInstance().updateCar(id, car);
                    set({
                        cars: get().cars.map((existingCar) =>
                            existingCar.id === id ? { ...existingCar, ...car } : existingCar
                        )
                    });
                    toast.success('Car updated successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to update car';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
            deleteCar: async (id: number) => {
                try {
                    await DataSourceImpl.getInstance().deleteCar(id);
                    set({ cars: get().cars.filter(car => car.id !== id) });
                    toast.success('Car deleted successfully');
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to delete car';
                    set({ error: errorMessage });
                    toast.error(errorMessage);
                }
            },
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage),
        },
    ) as StateCreator<CarStore>,
);