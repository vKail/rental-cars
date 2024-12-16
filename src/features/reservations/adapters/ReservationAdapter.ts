import { IReservation, IReservationResponse } from "../models/IReservation";


export class ReservationAdapter {
    static toDomain(data : IReservationResponse) : IReservation {
        return {
            id: data.id,
            user_id: data.user_id,
            vehicle_id: data.user_id,
            reservation_date: data.reservation_date,
            refund_date: data.reservation_date
        }
    }
}