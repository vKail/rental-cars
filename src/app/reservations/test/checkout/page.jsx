'use client';

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Checkout = () => {
    const [data, setData] = useState(null); // Para almacenar los datos de la reserva
    const [paymentValidated, setPaymentValidated] = useState(false);
    const [creditCard, setCreditCard] = useState({
        number: "",
        expiration: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});

    // Redirigir si no hay token
    useEffect(() => {
        const token = Cookies.get("access_token");
        if (!token) {
            window.location.href = "/dashboard";
        }
    }, []);

    // Cargar datos de la reserva desde el localStorage
    useEffect(() => {
        const reservation = localStorage.getItem("reservationData");
        if (reservation) {
            setData(JSON.parse(reservation));
        } else {
            console.error("No se encontraron datos en el localStorage.");
            window.location.href = "/dashboard";
        }
    }, []);

    const handleCreditCardInput = (e) => {
        const { name, value } = e.target;
        setCreditCard((prev) => ({ ...prev, [name]: value }));
    };

    const validateCreditCard = () => {
        const errors = {};
        if (!/^\d{16}$/.test(creditCard.number)) {
            errors.number = "El número de tarjeta debe tener 16 dígitos.";
        }
        if (!/^\d{3}$/.test(creditCard.cvv)) {
            errors.cvv = "El CVV debe tener 3 dígitos.";
        }
        if (!/^\d{2}\/\d{2}$/.test(creditCard.expiration)) {
            errors.expiration = "Formato de fecha inválido. Use MM/YY.";
        }
        setErrors(errors);
        setPaymentValidated(Object.keys(errors).length === 0);
    };

    if (!data) {
        return <p className="text-center mt-10">Cargando datos...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8">Factura</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="font-semibold text-lg">Reserva ID:</p>
                        <p className="mb-4">{data.reservationid}</p>
                        <p className="font-semibold text-lg">Cliente:</p>
                        <p className="mb-4">{data.user.fullname}</p>
                        <p className="font-semibold text-lg">Correo:</p>
                        <p className="mb-4">{data.user.email}</p>
                        <p className="font-semibold text-lg">Teléfono:</p>
                        <p className="mb-4">{data.user.phone}</p>
                        <p className="font-semibold text-lg">Dirección:</p>
                        <p className="mb-4">{data.user.address}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Vehículo:</p>
                        <p className="mb-4">
                            {data.vehicle.brand} {data.vehicle.model} ({data.vehicle.year})
                        </p>
                        <p className="font-semibold text-lg">Placa:</p>
                        <p className="mb-4">{data.vehicle.license_plate}</p>
                        <p className="font-semibold text-lg">Tipo:</p>
                        <p className="mb-4">{data.vehicle.vehicle_type}</p>
                        <p className="font-semibold text-lg">Fecha de reserva:</p>
                        <p className="mb-4">{data.reservation_date}</p>
                        <p className="font-semibold text-lg">Fecha de devolución:</p>
                        <p className="mb-4">{data.refund_date}</p>
                    </div>
                </div>
                <div className="border-t pt-6">
                    <h2 className="text-2xl font-bold mb-6">Total a Pagar: ${data.totalPrice}</h2>
                    {data.idpaymentMethod === "1" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block font-semibold text-lg">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={creditCard.number}
                                    onChange={handleCreditCardInput}
                                    className={`w-full border rounded px-4 py-2 mt-2 ${
                                        errors.number ? "border-red-500" : ""
                                    }`}
                                    placeholder="4242 4242 4242 4242"
                                />
                                {errors.number && (
                                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-semibold text-lg">Fecha de Expiración</label>
                                    <input
                                        type="text"
                                        name="expiration"
                                        value={creditCard.expiration}
                                        onChange={handleCreditCardInput}
                                        className={`w-full border rounded px-4 py-2 mt-2 ${
                                            errors.expiration ? "border-red-500" : ""
                                        }`}
                                        placeholder="MM/YY"
                                    />
                                    {errors.expiration && (
                                        <p className="text-red-500 text-sm mt-1">{errors.expiration}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-semibold text-lg">CVV</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        value={creditCard.cvv}
                                        onChange={handleCreditCardInput}
                                        className={`w-full border rounded px-4 py-2 mt-2 ${
                                            errors.cvv ? "border-red-500" : ""
                                        }`}
                                        placeholder="123"
                                    />
                                    {errors.cvv && (
                                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                    )}
                                </div>
                            </div>
                            {paymentValidated && (
                                <p className="text-green-500 font-semibold mt-4">
                                    Tarjeta validada correctamente.
                                </p>
                            )}
                            <button
                                onClick={validateCreditCard}
                                className="bg-green-500 text-white px-8 py-3 h-10 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Validar
                            </button>
                        </div>
                    )}
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={() => alert("Pago procesado.")}
                        disabled={data.idpaymentMethod === "1" && !paymentValidated}
                        className={`bg-black text-white px-8 py-3 h-9 rounded-lg hover:bg-gray-800 transition duration-300 ${
                            data.idpaymentMethod === "1" && !paymentValidated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
