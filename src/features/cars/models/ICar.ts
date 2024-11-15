export interface ICar {
    id:            number;
    brand:         string;
    model:         string;
    license_plate: string;
    year:          number;
    vehicle_type:  string;
    status:        string;
    daily_rate:    string;
}

export interface ICarResponse {
    id:            number;
    brand:         string;
    model:         string;
    license_plate: string;
    year:          number;
    vehicle_type:  string;
    status:        string;
    daily_rate:    string;
    created_at:    Date;
    updated_at:    Date;
}
