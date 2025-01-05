import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRentalForm } from "../../hooks/useRentalForm";
import { IRental, IRentalCreate, IRentalUpdate, Damage, RentalStatus, IRentalResponse } from "../../models/IRental";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { useRateStore } from "@/features/rates/context/use-rates-store";
import { useEffect } from "react";

type FormData = {
    car_status: number;
    initial_odometer: number;
    rate_id: number;
    final_odometer?: number;
    actual_refund_date?: Date;
    damages?: Damage[];
};

export const RentalForm = ({ currentRental, id }: { currentRental?: IRentalResponse, id?: number }) => {
    const { rates, fetchRates } = useRateStore();
    
    useEffect(() => {
        fetchRates();
    }, [fetchRates]);
    const transformedRental = currentRental ? { ...currentRental, car_status: Number(currentRental.car_status), initial_odometer: Number(currentRental.initial_odometer), final_odometer: Number(currentRental.final_odometer) } : undefined;
    const { defaultValues, validationSchema, onSubmit } = useRentalForm(transformedRental);
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues as FormData
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "damages",
        rules: { required: currentRental !== undefined }
    });

    const isUpdate = !!currentRental;

    const handleFormSubmit = (data: FormData) => {
        if (isUpdate) {
            const updateData: IRentalUpdate = {
                id: currentRental.id,
                reservation_id: currentRental.reservation_id,
                car_status: data.car_status,
                initial_odometer: data.initial_odometer,
                final_odometer: data.final_odometer!,
                rate_id: data.rate_id,
                actual_refund_date: data.actual_refund_date!,
                damages: data.damages || []
            };
            onSubmit(updateData);
        } else {
            const createData: IRentalCreate = {
                reservation_id: id ?? 0,
                car_status: data.car_status,
                initial_odometer: data.initial_odometer,
                rate_id: data.rate_id,
                final_odometer: 0
            };
            onSubmit(createData, id);
        }
    };

    return (
        <div className="flex flex-col w-screen max-w-2xl p-6 bg-white shadow-md border border-gray-200 rounded-2xl">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col gap-4">
                    <label className="text-base font-medium">Estado del Vehículo</label>
                    <Controller
                        name="car_status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={String(field.value)}
                                onValueChange={(val) => field.onChange(Number(val))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona el estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Estados</SelectLabel>
                                        <SelectItem value={String(RentalStatus.GOOD)}>Buen Estado</SelectItem>
                                        <SelectItem value={String(RentalStatus.BAD)}>Mal Estado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <span className="text-red-500 text-sm">{errors.car_status?.message}</span>

                    <label className="text-base font-medium">Odómetro Inicial</label>
                    <input
                        className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                        type="number"
                        {...register("initial_odometer")}
                    />
                    <span className="text-red-500 text-sm">{errors.initial_odometer?.message}</span>

                   
                    <label className="text-base font-medium">Tarifa</label>
                    <Controller
                        name="rate_id"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={String(field.value)}
                                onValueChange={(val) => field.onChange(Number(val))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona la tarifa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tarifas Disponibles</SelectLabel>
                                        {rates.map((rate) => (
                                            <SelectItem key={rate.id} value={String(rate.id)}>
                                                {rate.car_type} - ${rate.value_per_day}/día
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <span className="text-red-500 text-sm">{errors.rate_id?.message}</span>

                    {isUpdate && (
                        <>
                            <label className="text-base font-medium">Odómetro Final</label>
                            <input
                                className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                                type="number"
                                {...register("final_odometer")}
                            />
                            <span className="text-red-500 text-sm">{errors.final_odometer?.message}</span>

                            <label className="text-base font-medium">Fecha de Devolución</label>
                            <input
                                className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                                type="datetime-local"
                                {...register("actual_refund_date")}
                            />
                            <span className="text-red-500 text-sm">{errors.actual_refund_date?.message}</span>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium">Daños Observados</label>
                                    <Button
                                        type="button"
                                        onClick={() => append({ damage_type: "", value: 0 })}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        Agregar Daño
                                    </Button>
                                </div>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                {...register(`damages.${index}.damage_type` as const)}
                                                placeholder="Descripción del daño"
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            />
                                            {errors.damages?.[index]?.damage_type && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.damages[index]?.damage_type?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                {...register(`damages.${index}.value` as const)}
                                                placeholder="Valor"
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            />
                                            {errors.damages?.[index]?.value && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.damages[index]?.value?.message}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                            variant="ghost"
                                            size="icon"
                                            className="mt-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <Button
                        type="submit"
                        className="mt-4 bg-black text-white hover:bg-gray-800"
                    >
                        {isUpdate ? "Actualizar" : "Crear"}
                    </Button>
                </div>
            </form>
        </div>
    );
};