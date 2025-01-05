import { ICar, ICarResponse } from "../models/ICar";

export class CarsAdapter {
  static toDomain(data: ICarResponse): Partial<ICar> {
    return {
      brand: data.brand,
      model: data.model,
      license_plate: data.license_plate,
      year: data.year,
      image: data.image,
      vehicle_type: data.vehicle_type,
      status: data.status,
      daily_rate: data.daily_rate,
      motor: data.motor,
      chasis: data.chasis,
      door_count: data.door_count,
    };
  }
}
