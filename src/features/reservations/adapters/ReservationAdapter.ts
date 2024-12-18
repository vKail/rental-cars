import { IReservation, IReservationResponse } from "../models/IReservation";


export class ReservationAdapter {
    static toDomain(data : IReservationResponse) : IReservation {
        return {
            id: data.id,
            user_id: data.user.id as number,
            vehicle_id: data.vehicle.id,
            reservation_date: data.reservation_date,
            refund_date: data.reservation_date
        }
    }
}