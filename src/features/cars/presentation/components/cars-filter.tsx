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
  minRates: string[];
  maxRates: string[];
}

export const CarsFilterComponent = ({
  models,
  years,
  minRates,
  maxRates,
}: CarsFilterProps) => {
  const { onSubmit } = useCarFilter();
  const [filterValues, setFilterValues] = useState<Partial<ICarFilter>>({});
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleInputChange = useCallback(
    (key: keyof ICarFilter, value: string | number, checked?: boolean) => {
      setFilterValues((prev) => {
        const newValues = { ...prev };
        
        if (key === "models") {
          setSelectedModel(value as string);
          newValues[key] = [value as string];
        } else if (key === "min_price" || key === "max_price") {
          // Para min_price y max_price, solo guardamos el valor seleccionado
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
        
        setTimeout(() => {
          onSubmit(newValues);
        }, 0);
        
        return newValues;
      });
    },
    [onSubmit]
  );
  
  const handleClearFilters = useCallback(() => {
    setSelectedModel("");
    setFilterValues({});
    onSubmit({});
  }, [onSubmit]);

  return (
    <div className="flex flex-col justify-start items-start w-64 h-2/3 border rounded-2xl shadow-sm p-4 m-4">
      <form>
        <div>
          <h1 className="text-2xl font-bold">Filtros</h1>
          <div className="flex flex-col">
            <label className="font-medium p-1">Modelos</label>
            <Select
              value={selectedModel}
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
                  className="border rounded-md accent-gray-100"
                  type="checkbox"
                  value={year}
                  checked={filterValues.years?.includes(year) || false}
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
            {minRates.map((rate) => (
              <div key={rate}>
                <input
                  className="border rounded-md accent-gray-100"
                  type="radio"
                  name="min_price"
                  value={rate}
                  checked={filterValues.min_price?.[0] === rate}
                  onChange={(e) =>
                    handleInputChange("min_price", rate)
                  }
                />
                <label className="px-2">{rate}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Selecciona un valor máximo</label>
            {maxRates.map((rate) => (
              <div key={rate}>
                <input
                  className="border rounded-md accent-gray-100"
                  type="radio"
                  name="max_price"
                  value={rate}
                  checked={filterValues.max_price?.[0] === rate}
                  onChange={(e) =>
                    handleInputChange("max_price", rate)
                  }
                />
                <label className="px-2">{rate}</label>
              </div>
            ))}
          </div>
        </div>
      </form>
      <Button 
        onClick={handleClearFilters} 
        className="transition-colors mt-4 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
      >
        Limpiar Filtro
      </Button>
    </div>
  );
};