"use client";

import { UsersUpdateView } from "@/features/users/presentation/views/user-update-view";
import { useParams } from "next/navigation";

const UserUpdatePage = () => {
    const {id} = useParams();
    return <UsersUpdateView id={Number(id)} />;
} 

export default UserUpdatePage;
