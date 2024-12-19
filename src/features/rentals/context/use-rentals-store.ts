import { IRental, IRentalCreate, IRentalResponse, IRentalUpdate } from "../models/IRental";
import { createJSONStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";
import { RentalDataSourceImpl } from "../services/DataSource";

interface RentalStore {
    rentals: IRentalResponse[];
    error: string;
    fetchRentals: () => void;
    getRentalById: (id: number) => void;
    addRental: (rental: IRentalCreate) => void;
    updateRental: (id: number, rental: IRentalUpdate) => void;
    deleteRental: (id: number) => void;
}

const STORE_NAME = 'rental';

export const useRentalStore = create<RentalStore>(
    persist(
        (set, get) => ({
            rentals: [],
            error: '',
            fetchRentals: async () => {
                try {
                    const rentals = await RentalDataSourceImpl.getInstance().getAllRentals();
                    set({ rentals });
                } catch (error) {
                    set({ error: 'Error fetching rentals' });
                }
            },

            getRentalById: async (id: number) => {
                try {
                    const rental = await RentalDataSourceImpl.getInstance().getRentalById(id);
                    return rental;
                } catch (error) {
                    set({ error: 'Error fetching rental' });
                    throw error;
                }
            },
            
            addRental: async (rental: IRentalCreate) => {
                try {
                    const newRental = await RentalDataSourceImpl.getInstance().createRental(rental);
                    set({ rentals: [...get().rentals, newRental] });
                } catch (error) {
                    set({ error: 'Error creating rental' });
                }
            },

            updateRental: async (id: number, rental: IRentalUpdate) => {
                try {
                    const updatedRental = await RentalDataSourceImpl.getInstance().updateRental(id, rental);
                    set({
                        rentals: get().rentals.map(r => 
                            r.reservation_id === id ? updatedRental : r
                        )
                    });
                } catch (error) {
                    set({ error: 'Error updating rental' });
                }
            },

            deleteRental: async (id: number) => {
                try {
                    await RentalDataSourceImpl.getInstance().deleteRental(id);
                    set({ 
                        rentals: get().rentals.filter(rental => rental.reservation_id !== id)
                    });
                } catch (error) {
                    set({ error: 'Error deleting rental' });
                }
            },
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage),
        },
    ) as StateCreator<RentalStore>,
);