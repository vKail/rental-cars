import { AxiosInstance } from "axios";
import {
  IReservation,
  IReservationData,
  IReservationResponse,
} from "../models/IReservation";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import toast from "react-hot-toast";
import { errorToJSON } from "next/dist/server/render";
import { ReservationAdapter } from "../adapters/ReservationAdapter";

interface DataSource {
  getAllReservations: () => Promise<IReservationResponse[]>;
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

  async getAllReservations(): Promise<IReservationResponse[]> {
    const response = await this.httpClient.get<IReservationResponse[]>(
      "api/v1/reservations"
    );
    return response;
  }

  async getReservationById(id: number): Promise<IReservation> {
    const response = await this.httpClient.get<IReservationResponse>(
      `api/v1/reservations/${id}`
    );
    return ReservationAdapter.toDomain(response);
  }

  async createReservation(
    reservation: IReservationData
  ): Promise<IReservation> {
    const response = await this.httpClient.post<IReservationResponse>(
      "api/v1/reservations",
      reservation
    );
    return ReservationAdapter.toDomain(response);
  }

  async updateReservation(
    id: number,
    reservation: IReservationData
  ): Promise<IReservation> {
    const response = await this.httpClient.put<IReservationResponse>(
      `api/v1/reservations/${id}`,
      reservation
    );
    return ReservationAdapter.toDomain(response);
  }

  async deleteReservation(id: number): Promise<void> {
    const response = await this.httpClient.delete(`api/v1/reservations/${id}`);
  }

  static getInstance(): DataSource {
    return new ReservationDataSourceImpl();
  }
}
