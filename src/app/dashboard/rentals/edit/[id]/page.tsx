'use client'

import { RentalUpdateView } from "@/features/rentals/presentation/views/rental-update";
import { useParams } from "next/navigation";

const RentalEditPage = () => {
    const { id } = useParams();
    return <RentalUpdateView id={Number(id)} />
}

export default RentalEditPage;
