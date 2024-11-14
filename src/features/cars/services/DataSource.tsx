import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { ICar } from "../models/ICar";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";

interface DataSource {
    getAllCars: ()  =>  Promise<ICar[]>,
    getCarById: (id: number) => Promise<ICar>,
    createCar: (data: ICar) => Promise<ICar>,
    updateCar: (id : number, data: ICar) => Promise<void>,
    deleteCar: (id: number) => Promise<void>
}

export class DataSourceImpl implements DataSource {
    private httpClient: HttpHandler
    constructor () {
        this.httpClient = AxiosClient.getInstance()
    }
    async getAllCars (): Promise<ICar[]>{
        const response = await this.httpClient.get<ICar[]>('/cars')
        return response;
    }
    async getCarById (id: number) : Promise<ICar>{
        const response = await this.httpClient.get<ICar>(`/cars/${id}`)
        return response;
    };
    async createCar (data: ICar): Promise<ICar>{
        const response = await this.httpClient.post<ICar>('/cars', {data})
        return response;
    };
    async updateCar (id: number, data: ICar): Promise<void>{
        await this.httpClient.put<Partial<ICar>>(`/cars/${id}`, {data})
        
    };
    async deleteCar (id: number): Promise<void>{
        await this.httpClient.delete(`/cars/${id}`)
    };

    

     
}