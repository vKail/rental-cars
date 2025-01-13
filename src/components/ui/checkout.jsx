import React, { useState } from 'react';

const PaymentGateway = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [error, setError] = useState('');

    const paymentMethods = [
        {
            id: '1',
            name: 'Credit Card',
            icons: [
                'https://1000marcas.net/wp-content/uploads/2019/12/VISA-emblema-1.jpg',
                'https://w7.pngwing.com/pngs/962/794/png-transparent-mastercard-credit-card-mastercard-logo-mastercard-logo-love-text-heart.png'
            ]
        },
        {
            id: '2',
            name: 'Banco Pichincha',
            icon: 'https://brandemia.org/sites/default/files/inline/images/logo_banco_pichincha_portada.jpg'
        },
        {
            id: '3',
            name: 'Cash',
            icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png'
        }
    ];

    const handleSelect = (method) => {
        setSelectedMethod(method);
        setError(''); // Limpiar el mensaje de error si se selecciona un método
    };

    const handleContinue = () => {
        if (!selectedMethod) {
            setError('Please select a payment method before continuing.');
            return;
        }



        // Obtener el localstorage reservationData
        console.log('selectedMethod', selectedMethod);
        const reservationData = JSON.parse(localStorage.getItem('reservationData'));
        //si existe guardar el metodo de pago seleccionado y su idmetodo
        if (reservationData) {
            //unir el metodo de reservacion y el id de reservacion al reservationData
            localStorage.setItem('reservationData', JSON.stringify({
                ...reservationData,
                idpaymentMethod: selectedMethod
            }));

        }else
        {
            alert('No existe reserva');
            //si no existe mandar a '/dashboard'
            window.location.href = '/reservations';
        }
            
        window.location.href = '/reservations/test/checkout';
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-5 text-center">Payment Gateway</h2>
            <div className="bg-white shadow-md rounded p-6">
                <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <label
                            key={method.id}
                            className={`block p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                                selectedMethod === method.id ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleSelect(method.id)}
                        >
                            <input type="radio" name="payment_method" className="hidden" value={method.id} />
                            <div className="grid grid-cols-2 gap-4 items-center">
                                <span className="text-lg">{method.name}</span>
                                <div className="flex justify-end items-center">
                                    {method.icons ? (
                                        method.icons.map((icon, index) => (
                                            <img
                                                key={index}
                                                src={icon}
                                                alt={method.name}
                                                className="w-12 h-12 ml-4"
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src={method.icon}
                                            alt={method.name}
                                            className="w-12 h-12 ml-4"
                                        />
                                    )}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                )}
                <div className="mt-6 text-center">
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
