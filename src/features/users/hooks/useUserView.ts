import { useRouter } from "next/navigation";
import { useUserStore } from "../context/user-store";

export const useUserView = () => {
  const { deleteUser } = useUserStore();
  const router = useRouter();

  const onDelete = (id: number) => {
    deleteUser(id);
  };

  const onEdit = (id: number) => {
    router.push(`/dashboard/users/edit/${id}`);
  };

  const onAdd = () => {
    router.push(`/dashboard/users/new`);
  };

  return {
    onDelete,
    onEdit,
    onAdd,
  };
};
