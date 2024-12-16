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
    user_id:            number;
    vehicle_id:         number;
    reservation_date:   Date;
    refund_date:        Date;
    created_at:         Date;
    updated_at:         Date;
    status_reservation: string;
}
