import React, { useState, useEffect } from "react";

const ReservationCards = () => {
  const [reservations, setReservations] = useState([]);

  const getAccessToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const fetchReservations = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        console.error("No se encontró el token de acceso.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/reservations/reservations_user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", 
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setReservations(data); 
    } catch (error) {
      console.error("Error al obtener las reservas:", error.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const calculateTotal = (reservation) => {
    const reservationDate = new Date(reservation.reservation_date);
    const refundDate = new Date(reservation.refund_date);
    const diffInTime = refundDate - reservationDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24); 

    const dailyRate = parseFloat(reservation.vehicle.daily_rate); 
    const totalPrice = dailyRate * diffInDays;

    return totalPrice.toFixed(2);  
  };

  const handlePayment = (reservation) => {
    const totalPrice = calculateTotal(reservation);
    const reservationData = {
      reservationid: reservation.id,
      totalPrice,
      vehicle: reservation.vehicle,
      user: reservation.user,
      reservation_date: reservation.reservation_date,
      refund_date: reservation.refund_date,
    };

    localStorage.setItem("reservationData", JSON.stringify(reservationData));

    //console.log("Datos de la reserva guardados:", reservationData);

    window.location.href = "reservations/test";

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src="/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Ffotos-premium%2Frepresentacion-3d-automovil-generico-marca-entorno-estudio-blanco_101266-12914.jpg&w=1920&q=75"
              alt="Carro"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {reservation.vehicle.brand} {reservation.vehicle.model}
              </h2>
              <p className="text-sm text-gray-600">
                Año: {reservation.vehicle.year}
              </p>
              <p className="text-sm text-gray-600">
                Tipo: {reservation.vehicle.vehicle_type}
              </p>
              <p className="text-sm text-gray-600">
                Costo Diario: ${reservation.vehicle.daily_rate}
              </p>
              <p className="text-sm text-gray-600">
                Puertas: {reservation.vehicle.door_count}
              </p>
              <p className="text-sm text-gray-600">
                Almacenamiento: {reservation.vehicle.storage}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Reservado por: {reservation.user.fullname}
              </p>
              <p className="text-sm text-gray-600">
                Email: {reservation.user.email}
              </p>
              <p className="text-sm text-gray-600">
                Teléfono: {reservation.user.phone}
              </p>
              <p className="text-sm text-gray-600">
                Dirección: {reservation.user.address}
              </p>
              <p className="text-sm text-gray-600 mt-2 font-bold">
                Total a Pagar: ${calculateTotal(reservation)}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => handlePayment(reservation)}
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationCards;
