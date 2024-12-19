'use client'

import { RentalCreateView } from "@/features/rentals/presentation/views/rental-create";
import { useParams } from "next/navigation";


const RentalsNewPage = () => {
const {id} = useParams();
    return (
        <>
            <RentalCreateView id={Number(id)}/>
        </>
    )

}



export default RentalsNewPage;