import { usePathname, useRouter } from "next/navigation";
import { useRentalStore } from "../context/use-rentals-store";

export const useRentalView = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { deleteRental } = useRentalStore();

    const onDelete = (id: number) => {
        deleteRental(id);
    }

    const onEdit = (id: number) => {
        router.push(`/dashboard/rentals/edit/${id}`);
    }

    const onAdd = () => {
        router.push('/dashboard/rentals/new');
    }

    return {
        pathName,
        onDelete,
        onEdit,
        onAdd
    }
}
