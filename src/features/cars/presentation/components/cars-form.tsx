import { useForm } from "react-hook-form";
import { useCarForm } from "../../hooks/useCarsForm";
import { ICar } from "../../models/ICar";
import { yupResolver } from "@hookform/resolvers/yup";

export const CarsFrom = ({ currentCar }: { currentCar?: Partial<ICar> }) => {
  const { defaultValues, validationSchema, onSubmit } = useCarForm(currentCar);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<ICar, "id">>({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div className="flex flex-col w-screen max-w-2xl p-6 bg-white shadow-md border border-gray-200 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <label className="text-base font-medium pb-3">Marca</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Marca"
            {...register("brand")}
            defaultValue={defaultValues.brand}
          />
          <span className="text-red-500 text-sm">{errors.brand?.message}</span>

          <label className="text-base font-medium pb-3">Modelo</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Modelo"
            {...register("model")}
            defaultValue={defaultValues.model}
          />
          <span className="text-red-500 text-sm">{errors.model?.message}</span>

          <label className="text-base font-medium pb-3">Matricula</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Matricula"
            {...register("license_plate")}
            defaultValue={defaultValues.license_plate}
          />
          <span className="text-red-500 text-sm">
            {errors.license_plate?.message}
          </span>

          <label className="text-base font-medium pb-3">Año</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="number"
            placeholder="Año"
            {...register("year")}
            defaultValue={defaultValues.year}
          />
          <span className="text-red-500 text-sm">{errors.year?.message}</span>

          <label className="text-base font-medium pb-3">Tipo de vehiculo</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Tipo de vehiculo"
            {...register("vehicle_type")}
            defaultValue={defaultValues.vehicle_type}
          />
          <span className="text-red-500 text-sm">
            {errors.vehicle_type?.message}
          </span>

          <label className="text-base font-medium pb-3">Estado</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Estado"
            {...register("status")}
            defaultValue={defaultValues.status}
          />
          <span className="text-red-500 text-sm">{errors.status?.message}</span>

          <label className="text-base font-medium pb-3">Costo diario</label>
          <input
            className="mb-3 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            placeholder="Costo diario"
            {...register("daily_rate")}
            defaultValue={defaultValues.daily_rate}
          />
          <span className="text-red-500 text-sm">
            {errors.daily_rate?.message}
          </span>
          <button
            type="submit"
            className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
          >
            {currentCar ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};
