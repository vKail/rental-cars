export interface ICar {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  vehicle_type: string;
  status: string;
  daily_rate: string;
  image: string;
  motor: string;
  chasis: string;
  door_count: number;
  storage: number;

}

export interface ICarResponse {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  image: string;
  vehicle_type: string;
  status: string;
  daily_rate: string;
  motor: string;
  chasis: string;
  door_count: number;
  storage: number;
  created_at: Date;
  updated_at: Date;
}
