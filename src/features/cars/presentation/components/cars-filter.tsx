import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface CarsFilterProps {
  models: string[];
  years: number[];
  dailyRates: string[];
}

export const CarsFilterComponent = ({ models, years, dailyRates }: CarsFilterProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 366),
  });
  return (
    <div>
      <div className="flex flex-col justify-start items-start w-64 h-2/3 border rounded-2xl shadow-sm p-2 m-4">
        <h1 className="text-2xl font-bold">Filtros</h1>
        <div className="flex flex-col">
          <label className="font-normal p-1">
            Selecciona un rango de fecha:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[225px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <label className="font-medium p-1">Modelos</label>
          <Select>
            <SelectTrigger className="w-[225px] hover:bg-gray-100">
              <SelectValue placeholder="Seleciona un modelo" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Año</label>
         {
             years.map((year) => (
                <div className="flex flex-row justify-start align-baseline">
                    <input className="border rounded-md accent-gray-100 " type="checkbox" value={year} />
                    <label className="px-2" >{year}</label>
                </div>
                ))
         }
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Costo diario</label>
          {
             dailyRates.map((daily_rate) => (
                <div className="flex flex-row justify-start align-baseline">
                    <input className="border rounded-md accent-gray-100 " type="checkbox" value={daily_rate} />
                    <label className="px-2" >{daily_rate}</label>
                </div>
                ))
         }
        </div>
        <div className="flex flex-col  w-32">
          <button className="font-medium text-white border rounded-md bg-new-black hover:bg-new-back-hover m-2">
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
};
