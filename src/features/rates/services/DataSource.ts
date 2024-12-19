// services/RateDataSource.ts
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { IRateCreate, IRateResponse, IRateUpdate } from "../models/IRates";

interface DataSource {
    getAllRates: () => Promise<IRateResponse[]>;
    getRateById: (id: number) => Promise<IRateResponse>;
    createRate: (data: IRateCreate) => Promise<IRateResponse>;
    updateRate: (id: number, data: IRateUpdate) => Promise<IRateResponse>;
    deleteRate: (id: number) => Promise<void>;
}

export class RateDataSourceImpl implements DataSource {
    private httpClient: HttpHandler;
    private static instance: RateDataSourceImpl;

    private constructor() {
        this.httpClient = AxiosClient.getInstance();
    }

    async getAllRates(): Promise<IRateResponse[]> {
        const response = await this.httpClient.get<IRateResponse[]>('/api/v1/rates');
        return response;
    }

    async getRateById(id: number): Promise<IRateResponse> {
        const response = await this.httpClient.get<IRateResponse>(`/api/v1/rates/${id}`);
        return response;
    }

    async createRate(rateData: IRateCreate): Promise<IRateResponse> {
        const response = await this.httpClient.post<IRateResponse>('/api/v1/rates', rateData);
        return response;
    }

    async updateRate(id: number, rateData: IRateUpdate): Promise<IRateResponse> {
        const response = await this.httpClient.put<IRateResponse>(`/api/v1/rates/${id}`, rateData);
        return response;
    }

    async deleteRate(id: number): Promise<void> {
        await this.httpClient.delete(`/api/v1/rates/${id}`);
    }

    static getInstance(): RateDataSourceImpl {
        if (!RateDataSourceImpl.instance) {
            RateDataSourceImpl.instance = new RateDataSourceImpl();
        }
        return RateDataSourceImpl.instance;
    }
}