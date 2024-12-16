'use client'
import { useCarStore } from "@/features/cars/context/car-store";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ICar } from "@/features/cars/models/ICar";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useReservationForm } from "../../hooks/useReservationForm";
import { IReservationData } from "../../models/IReservation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IParams {
  car: Partial<ICar>;
  user_id: number;
}

export const ReservationInfo = ({ car, user_id }: IParams) => {
  const { initialValues, onSubmit, validationSchema } = useReservationForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<Omit<IReservationData, "user_id" | "vehicle_id">>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  });

  const reservationDate = watch('reservation_date');
  const refundDate = watch('refund_date');

  const calculateTotal = () => {
    if (!reservationDate || !refundDate || !car?.daily_rate) return 0;
    
    const days = differenceInDays(new Date(refundDate), new Date(reservationDate)) + 1;
    return days > 0 ? days * Number(car.daily_rate) : 0;
  };

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Reservar Vehículo</h1>
      <div className="flex flex-col md:flex-row justify-center items-start gap-12">
        {/* Sección de imagen */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            className="rounded-2xl shadow-lg object-cover max-h-[400px] w-auto"
            src={car?.image || "/default-image.jpg"}
            alt={car?.model || "Default Model"}
            width={600}
            height={400}
            priority
          />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {car?.brand} {car?.model}
          </h2>
          
          <form onSubmit={handleSubmit((data) => onSubmit(data, user_id, car.id ?? 0))}
                className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de inicio
              </label>
              <Controller
                name="reservation_date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Fecha de reserva</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.reservation_date && (
                <span className="text-red-500 text-sm">{errors.reservation_date.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de devolución
              </label>
              <Controller
                name="refund_date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Fecha de devolución</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.refund_date && (
                <span className="text-red-500 text-sm">{errors.refund_date.message}</span>
              )}
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">Costo diario:</h3>
                <p className="text-lg font-semibold">${car?.daily_rate}</p>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <h3 className="text-xl font-bold text-gray-800">Total:</h3>
                <p className="text-2xl font-bold text-green-600">${total}</p>
              </div>
              {total === 0 && reservationDate && refundDate && (
                <p className="text-red-500 text-sm text-center">
                  La fecha de devolución debe ser posterior a la fecha de reserva
                </p>
              )}
            </div>

            <Button 
              type="submit" 
            >
              Confirmar Reserva
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
