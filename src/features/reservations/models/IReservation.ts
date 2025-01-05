import { ICar } from "@/features/cars/models/ICar";
import { IUser } from "@/features/users/models/IUser";

export interface IReservation {
    id:               number;
    user_id:          number;
    vehicle_id:       number;
    reservation_date: Date;
    refund_date:      Date;
}

export interface IReservationData extends Omit<IReservation, 'id'>{}

export interface IReservationResponse {
    id:                 number;
    reservation_date:   Date;
    refund_date:        Date;
    status_reservation: string;
    vehicle:            ICar;
    user:               Partial<IUser>;
}

