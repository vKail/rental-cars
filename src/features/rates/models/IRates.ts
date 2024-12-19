export interface IRate {
    id:            number;
    car_type:      string;
    value_per_day: number;
    season_id:     number;
}

export interface IRateResponse {
    id:            number;
    car_type:      string;
    value_per_day: string;
    created_at:    Date;
    updated_at:    Date;
    season_id:     number;
}


export interface IRateCreate extends Omit<IRate, "id"> {}

export interface IRateUpdate extends IRate {}
