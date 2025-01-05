import { create, StateCreator } from "zustand";
import {
  IReservation,
  IReservationData,
  IReservationResponse,
} from "../models/IReservation";
import { persist } from "zustand/middleware";
import { ReservationDataSourceImpl } from "../services/DataSource";

interface ReservationStore {
  reservations: IReservationResponse[];
  fetchAllReservations: () => void;
  fetchAllReservationsByUser: () => void;
  addReservation: (reservation: IReservationData) => void;
  updateReservation: (id: number, reservation: IReservationData) => void;
  deleteReservation: (id: number) => void;
}

const STORE_NAME = "reservation";
const DEFAULT_RESERVATIONS: IReservationResponse[] = [];

export const useReservationStore = create<ReservationStore>(
  persist(
    (set, get) => ({
      reservations: DEFAULT_RESERVATIONS,
      fetchAllReservations: async () => {
        try {
          const reservation =
            await ReservationDataSourceImpl.getInstance().getAllReservations();
          set({ reservations: reservation });
        } catch (error) {}
      },
      fetchAllReservationsByUser: async () => {
        try {
          const reservation =
            await ReservationDataSourceImpl.getInstance().getAllReservationsByUser();
          set({ reservations: reservation });
        } catch (error) {}
      },
      addReservation: async (reservation: IReservationData) => {
        try {
          await ReservationDataSourceImpl.getInstance().createReservation(
            reservation
          );
        } catch (error) {
          console.log(error);
        }
      },
      updateReservation: async (id: number, reservation: IReservationData) => {
        try {
          await ReservationDataSourceImpl.getInstance().updateReservation(
            id,
            reservation
          );
        } catch (error) {
          console.log(error);
        }
      },
      deleteReservation: async (id: number) => {
        try {
          set({
            reservations: get().reservations.filter(
              (reservation) => reservation.id !== id
            ),
          });
          await ReservationDataSourceImpl.getInstance().deleteReservation(id);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: STORE_NAME,
    }
  ) as StateCreator<ReservationStore>
);
