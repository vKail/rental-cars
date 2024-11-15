import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { ICar, ICarResponse } from "../models/ICar";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { CarsAdapter } from "../adapters/CarsAdapter";

interface DataSource {
    getAllCars: ()  =>  Promise<ICarResponse[]>,
    getAllCarsAvailables: () => Promise<ICarResponse[]>,
    getCarById: (id: number) => Promise<ICar>,
    createCar: (data:  Partial<ICar>) => Promise<Partial<ICar>>,
    updateCar: (id : number, data: Partial<ICar>) => Promise<Partial<ICar>>,
    deleteCar: (id: number) => Promise<void>
}

export class DataSourceImpl implements DataSource {
    private httpClient: HttpHandler
    constructor () {
        this.httpClient = AxiosClient.getInstance()
    }
    async getAllCars (): Promise<ICarResponse[]>{
        const response = await this.httpClient.get<ICarResponse[]>('/api/v1/vehicles')
        return response;
    }
    async getAllCarsAvailables (): Promise<ICarResponse[]>{
        const response = await this.httpClient.get<ICarResponse[]>('/api/v1/vehicles/available')
        return response;
    }
    async getCarById (id: number) : Promise<ICar>{
        const response = await this.httpClient.get<ICarResponse>(`/api/v1/vehicles/${id}`)
        return response;
    };
    async createCar (data: Partial<ICar>): Promise<Partial<ICar>>{
        const response = await this.httpClient.post<ICarResponse>('/api/v1/vehicles', {data})
        return CarsAdapter.toDomain(response);
    };
    async updateCar (id: number, data: Partial<ICar>): Promise<Partial<ICar>>{
        const response = await this.httpClient.put<ICarResponse>(`/api/v1/vehicles/${id}`, {data})
        return CarsAdapter.toDomain(response);
        
    };
    async deleteCar (id: number): Promise<void>{
        await this.httpClient.delete(`/cars/${id}`)
    };

    static getInstance (): DataSourceImpl {
        return new DataSourceImpl()
    }
    
     
}