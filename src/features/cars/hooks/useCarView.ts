import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useCarStore } from "../context/car-store";
import { useEffect } from "react";

export const useCarView = () => {
    const router = useRouter();
    const pathName = usePathname();
    const {fetchCars, deleteCar, cars } = useCarStore();

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    const onDelete = (id: number) => {
        deleteCar(id);
    }

    const onEdit = (id: number) => {
        router.push(`/cars/${id}/edit`);
    }

    const onAdd = () => {
        router.push('/cars/new');
    }

    return {
        pathName,
        cars,
        onDelete,
        onEdit,
        onAdd
    }
}