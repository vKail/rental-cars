
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";
import { useCarStore } from "../context/car-store";
import { useEffect } from "react";

export const useCarView = () => {
    const router = useRouter();
    const pathName = usePathname();
    const {deleteCar  } = useCarStore();


    const onDelete = (id: number) => {
        deleteCar(id);
    }

    const onEdit = (id: number) => {
        router.push(`/dashboard/cars/edit/${id}`);
    }

    const onAdd = () => {
        router.push('/dashboard/cars/new');
    }

    return {
        pathName,
        onDelete,
        onEdit,
        onAdd
    }
}