import { AxiosInstance } from "axios";
import { IReservation, IReservationData } from "../models/IReservation";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import toast from "react-hot-toast";
import { errorToJSON } from "next/dist/server/render";

interface DataSource {
  getAllReservations: () => Promise<IReservation[]>;
  getReservationById: (id: number) => Promise<IReservation>;
  createReservation: (data: IReservationData) => Promise<IReservation>;
  updateReservation: (
    id: number,
    data: IReservationData
  ) => Promise<IReservation>;
  deleteReservation: (id: number) => Promise<void>;
}

export class ReservationDataSourceImpl implements DataSource {
  httpClient: HttpHandler;
  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  async getAllReservations(): Promise<IReservation[]> {
    try {
      const response = await this.httpClient.get<IReservation[]>(
        "api/v1/reservations"
      );
      return response;
    } catch (error) {
      toast.error("Error al obtener las reservaciones");
      throw new Error("Error al obtener las reservaciones");
    }
  }

  async getReservationById(id: number): Promise<IReservation> {
    try {
      const response = await this.httpClient.get<IReservation>(
        `api/v1/reservations/${id}`
      );
      return response;
    } catch (error) {
      toast.error("Error al obtener la reservación");
      throw new Error("Error al obtener la reservación");
    }
  }

  async createReservation(
    reservation: IReservationData
  ): Promise<IReservation> {
    try {
      const response = await this.httpClient.post<IReservation>(
        "api/v1/reservations",
        reservation
      );
      return response;
    } catch (error) {
      toast.error("Error al crear la reservación");
      throw new Error("Error al crear la reservación");
    }
  }

  async updateReservation(
    id: number,
    reservation: IReservationData
  ): Promise<IReservation> {
    try {
      const response = await this.httpClient.put<IReservation>(
        `api/v1/reservations/${id}`,
        reservation
      );
      return response;
    } catch (error) {
      toast.error("Error al actualizar la reservación");
      throw new Error("Error al actualizar la reservación");
    }
  }

  async deleteReservation(id: number): Promise<void> {
    try {
      const response = await this.httpClient.delete(
        `api/v1/reservations/${id}`
      );
    } catch (error) {
      toast.error("Error al eliminar la reservación");
    }
  }
}
