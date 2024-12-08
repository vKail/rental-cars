import { useRouter } from "next/navigation";
import { useUserStore } from "../context/user-store";

export const useUserView = () => {
  const { deleteUser } = useUserStore();
  const router = useRouter();

  const onDelete = (id: number) => {
    deleteUser(id);
  };

  const onEdit = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  const onAdd = () => {
    router.push(`/dashboard/users/create`);
  };

  return {
    onDelete,
    onEdit,
    onAdd,
  };
};
