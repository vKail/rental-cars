'use client'

import { RentalCreateView } from "@/features/rentals/presentation/views/rental-create";
import { useParams } from "next/navigation";


const RentalsNewPage = () => <RentalCreateView />

const {id} = useParams();

export default RentalsNewPage;