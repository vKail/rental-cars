// context/rate-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RateDataSourceImpl } from "../services/DataSource";
import { IRateCreate, IRateResponse, IRateUpdate } from "../models/IRates";

interface RateStore {
    rates: IRateResponse[];
    error: string;
    fetchRates: () => void; 
    getRateById: (id: number) => void;
    createRate: (rate: IRateCreate) => void;
    updateRate: (id: number, rate: IRateUpdate) => void;
    deleteRate: (id: number) => Promise<void>;
}

const STORE_NAME = 'rate-store';

export const useRateStore = create<RateStore>()(
    persist(
        (set, get) => ({
            rates: [],
            error: '',

            fetchRates: async () => {
                try {
                    const rates = await RateDataSourceImpl.getInstance().getAllRates();
                    set({ rates });
                } catch (error) {
                    set({ error: 'Error al cargar las tarifas' });
                }
            },

            getRateById: async (id: number) => {
                try {
                    const rate = await RateDataSourceImpl.getInstance().getRateById(id);
                    return rate;
                } catch (error) {
                    set({ error: 'Error al cargar la tarifa' });
                    return undefined;
                }
            },

            createRate: async (rateData: IRateCreate) => {
                try {
                    const newRate = await RateDataSourceImpl.getInstance().createRate(rateData);
                    set({ rates: [...get().rates, newRate] });
                } catch (error) {
                    set({ error: 'Error al crear la tarifa' });
                }
            },

            updateRate: async (id: number, rateData: IRateUpdate) => {
                try {
                    const updatedRate = await RateDataSourceImpl.getInstance().updateRate(id, rateData);
                    set({
                        rates: get().rates.map(r => 
                            r.id === id ? updatedRate : r
                        )
                    });
                } catch (error) {
                    set({ error: 'Error al actualizar la tarifa' });
                }
            },

            deleteRate: async (id: number) => {
                try {
                    await RateDataSourceImpl.getInstance().deleteRate(id);
                    set({ rates: get().rates.filter(r => r.id !== id) });
                } catch (error) {
                    set({ error: 'Error al eliminar la tarifa' });
                }
            }
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);