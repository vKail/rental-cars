import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { ICar, ICarResponse } from "../models/ICar";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { CarsAdapter } from "../adapters/CarsAdapter";
import { ICarFilter } from "../models/ICarFilter";

interface DataSource {
    getAllCars: ()  =>  Promise<ICarResponse[]>,
    getAllCarsAvailables: () => Promise<ICarResponse[]>,
    getAllCarsAvailablesByFilter: (params : Partial<ICarFilter>) => Promise<ICarResponse[]>,
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
        const response = await this.httpClient.get<ICarResponse[]>('/api/v1/vehicles/vehicles_available')
        return response;
    }
    async getAllCarsAvailablesByFilter(params: Partial<ICarFilter>): Promise<ICarResponse[]> {
        const searchParams = new URLSearchParams();
        (Object.keys(params) as (keyof ICarFilter)[]).forEach((key) => {
            const value = params[key];
            
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    searchParams.append(key, String(item));
                });
            } else if (value !== undefined) {
                searchParams.append(key, String(value));
            }
        }); 
        const response = await this.httpClient.get<ICarResponse[]>(`/api/v1/vehicles/vehicles_available?${searchParams.toString()}`);
        return response;
    }
    
    async getCarById (id: number) : Promise<ICar>{
        const response = await this.httpClient.get<ICarResponse>(`/api/v1/vehicles/${id}`)
        return response;
    };
    async createCar (vehicle: Partial<ICar>): Promise<Partial<ICar>>{
        const response = await this.httpClient.post<ICarResponse>('/api/v1/vehicles', {vehicle})
        return CarsAdapter.toDomain(response);
    };
    async updateCar (id: number, vehicle: Partial<ICar>): Promise<Partial<ICar>>{
        const response = await this.httpClient.put<ICarResponse>(`/api/v1/vehicles/${id}`, {vehicle})
        return CarsAdapter.toDomain(response);
        
    };
    async deleteCar (id: number): Promise<void>{
        await this.httpClient.delete(`/api/v1/vehicles/${id}`)
    };

    static getInstance (): DataSourceImpl {
        return new DataSourceImpl()
    }
    
     
}