
export interface IRental {
    id:                 number;
    reservation_id:     number;
    actual_refund_date: Date;
    car_status:         number;
    initial_odometer:   number;
    final_odometer:     number;
    rate_id:            number;
    damages?:            Damage[];
}

export interface IRentalCreate extends Omit<IRental, "id" | "actual_refund_date"> {}

export interface IRentalUpdate extends IRental {
    damages:            Damage[];
}

export interface Damage {
    damage_type: string;
    value:       number;
}

export enum RentalStatus {
    GOOD = 0,
    BAD = 1,
}

export interface IRentalResponse {
    id:                      number;
    user_id:                 number;
    reservation_id:          number;
    actual_reservation_date: Date;
    expected_refund_date:    Date;
    actual_refund_date:      Date;
    car_status:              string;
    initial_odometer:        string;
    final_odometer:          string;
    rate_id:                 number;
    created_at:              Date;
    updated_at:              Date;
    status:                  string;
}

