import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";
import { useCarFilter } from "../../hooks/useCarFilter";
import { ICarFilter } from "../../models/ICarFilter";

interface CarsFilterProps {
  models: string[];
  years: number[];
  dailyRates: string[];
}

export const CarsFilterComponent = ({
  models,
  years,
  dailyRates,
}: CarsFilterProps) => {
  const { onSubmit } = useCarFilter();
  const [filterValues, setFilterValues] = useState<Partial<ICarFilter>>({});
  const handleInputChange = useCallback(
    (key: keyof ICarFilter, value: string | number, checked?: boolean) => {
      setFilterValues((prev) => {
        const newValues = { ...prev };
        if (key === "models") {
          newValues[key] = [value as string];
        } else {
          const currentArray = newValues[key] || [];
          if (checked) {
            newValues[key] = [...currentArray, value] as string[] & number[];
          } else {
            newValues[key] = currentArray.filter(
              (item) => item !== value
            ) as string[] & number[];
          }
          if (newValues[key]?.length === 0) {
            delete newValues[key];
          }
        }
        if (Object.keys(newValues).length > 0) {
          onSubmit(newValues);
        }
        return newValues;
      });
    },
    [onSubmit]
  );

  return (
    <div className="flex flex-col justify-start items-start w-64 h-2/3 border rounded-2xl shadow-sm p-4 m-4">
      <form>
        <div>
          <h1 className="text-2xl font-bold">Filtros</h1>
          <div className="flex flex-col">
            <label className="font-medium p-1">Modelos</label>
            <Select
              onValueChange={(value) => handleInputChange("models", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un modelo" />
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
            {years.map((year) => (
              <div key={year}>
                <input
                  className="border rounded-md accent-gray-100 "
                  type="checkbox"
                  value={year}
                  onChange={(e) =>
                    handleInputChange("years", year, e.target.checked)
                  }
                />
                <label className="px-2">{year}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Selecciona un valor mínimo</label>
            {dailyRates.map((rate) => (
              <div key={rate}>
                <input
                  className="border rounded-md accent-gray-100 "
                  type="checkbox"
                  value={rate}
                  onChange={(e) =>
                    handleInputChange("min_price", rate, e.target.checked)
                  }
                />
                <label className="px-2">{rate}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Selecciona un valor máximo</label>
            {dailyRates.map((rate) => (
              <div key={rate}>
                <input
                  className="border rounded-md accent-gray-100 "
                  type="checkbox"
                  value={rate}
                  onChange={(e) =>
                    handleInputChange("max_price", rate, e.target.checked)
                  }
                />
                <label className="px-2">{rate}</label>
              </div>
            ))}
          </div>
        </div>
      </form>
      <button className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover">
        Limpiar Filtro
      </button>
    </div>
  );
};
