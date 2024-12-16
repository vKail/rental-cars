import { create, StateCreator } from "zustand";
import { IReservation, IReservationData } from "../models/IReservation";
import { persist } from "zustand/middleware";
import { ReservationDataSourceImpl } from "../services/DataSource";

interface ReservationStore {
    reservations: IReservation[],
    fetchAllReservations:() => void,
    addReservation:(reservation: IReservationData) => void,
    updateReservation:(id: number, reservation: IReservationData) => void,
    deleteReservation:(id: number) => void,
}

const STORE_NAME = 'reservation';
const DEFAULT_RESERVATIONS: IReservation[] = [];

export const useReservationStore = create<ReservationStore>(
    persist((set, get) => ({
       reservations: DEFAULT_RESERVATIONS,
       fetchAllReservations: async () => {
            const reservation = await ReservationDataSourceImpl.getInstance().getAllReservations();
            set({reservations : reservation})
       },
       addReservation: async (reservation: IReservationData) => {
            const newReservation = await ReservationDataSourceImpl.getInstance().createReservation(reservation);
       },
       updateReservation: async (id: number, reservation: IReservationData) => {
            const updatedReservation = await ReservationDataSourceImpl.getInstance().updateReservation(id, reservation)
            
       },
       deleteReservation: async (id: number) => {
            set({reservations: get().reservations.filter(reservation => reservation.id !== id)})
            const deletedReservation = await ReservationDataSourceImpl.getInstance().deleteReservation(id)
       },
    }),    {
        name: STORE_NAME,
        }) as StateCreator<ReservationStore>

);