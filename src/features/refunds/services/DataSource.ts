import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";

interface DataSource {
    getAllRefunds(): Promise<IRefundResponse[]>;
    getRefundById(id: string): Promise<IRefund>;
    createRefund(refund: IRefund): Promise<IRefund>;
    updateRefund(refund: IRefund): Promise<IRefund>;
    deleteRefund(id: string): Promise<void>;
}

export class RefundDataSourceImpl implements DataSource {
    private httpClient: HttpHandler;
    constructor(){
        this.httpClient = AxiosClient.getInstance();
    }
    async getAllRefunds(): Promise<IRefundResponse[]> {
        return this.httpClient.get<IRefundResponse[]>('/api/v1/refunds');

    } 
    async getRefundById(id: string): Promise<IRefund> {
        return this.httpClient.get<IRefundResponse>(`/api/v1/refunds/${id}`);
    }

    async createRefund(refund: IRefund): Promise<IRefund> {
        return this.httpClient.post<IRefundResponse>('/api/v1/refunds', refund);
    }

    async updateRefund(refund: IRefund): Promise<IRefund> {
        return this.httpClient.put<IRefundResponse>(`/api/v1/refunds/${refund.id}`, refund);
    }

    async deleteRefund(id: string): Promise<void> {
        return this.httpClient.delete(`/api/v1/refunds/${id}`);
    }

}