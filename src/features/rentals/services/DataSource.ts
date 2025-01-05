import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { IRental, IRentalCreate, IRentalResponse, IRentalUpdate } from "../models/IRental";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";

interface DataSource {
    getAllRentals: () => Promise<IRentalResponse[]>,
    getRentalById: (id: number) => Promise<IRentalResponse>,
    createRental: (data: IRentalCreate) => Promise<IRentalResponse>,
    updateRental: (id: number, data: IRentalUpdate) => Promise<IRentalResponse>,
    deleteRental: (id: number) => Promise<void>
}

export class RentalDataSourceImpl implements DataSource {
    private httpClient: HttpHandler;
    private static instance: RentalDataSourceImpl;

    private constructor() {
        this.httpClient = AxiosClient.getInstance();
    }

    async getAllRentals(): Promise<IRentalResponse[]> {
        const response = await this.httpClient.get<IRentalResponse[]>('/api/v1/rentals');
        return response;
    }

    async getRentalById(id: number): Promise<IRentalResponse> {
        const response = await this.httpClient.get<IRentalResponse>(`/api/v1/rentals/${id}`);
        return response;
    }

    async createRental(rental: IRentalCreate): Promise<IRentalResponse> {
        const response = await this.httpClient.post<IRentalResponse>('/api/v1/rentals', { rental });
        return response;
    }

    async updateRental(id: number, rental: IRentalUpdate): Promise<IRentalResponse> {
        const response = await this.httpClient.put<IRentalResponse>(`/api/v1/rentals/${id}`, { rental });
        return response;
    }

    async deleteRental(id: number): Promise<void> {
        await this.httpClient.delete(`/api/v1/rentals/${id}`);
    }

    static getInstance(): RentalDataSourceImpl {
        if (!RentalDataSourceImpl.instance) {
            RentalDataSourceImpl.instance = new RentalDataSourceImpl();
        }
        return RentalDataSourceImpl.instance;
    }
}