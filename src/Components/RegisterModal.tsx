'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Las contraseñas no coinciden.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [password, confirmPassword]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'El nombre de usuario no debe tener caracteres especiales.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, 1 número y 1 mayúscula.';
    }
    if (!/\d+/.test(phone)) {
      newErrors.phone = 'El teléfono debe contener solo números.';
    }
    if (!username) newErrors.username = 'El nombre de usuario es obligatorio.';
    if (!firstName) newErrors.firstName = 'El primer nombre es obligatorio.';
    if (!email) newErrors.email = 'El correo electrónico es obligatorio.';
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    if (!phone) newErrors.phone = 'El teléfono es obligatorio.';
    if (!birthdate) newErrors.birthdate = 'La fecha de nacimiento es obligatoria.';
    if (!address) newErrors.address = 'La dirección es obligatoria.';
    if (!agreeTerms) newErrors.agreeTerms = 'Debes aceptar los términos y condiciones.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:3000/users', {
        user: {
          name: firstName,
          lastname: secondName,
          address,
          phone,
          birthdate,
          username,
          email,
          password,
        },
      });

      if (response.status === 201) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        router.push('/');
      } else {
        const errorData = response.data;
        if (response.status === 409) {
          if (errorData.message === 'El registro ya existe') {
            setErrors({ email: 'El correo electrónico ya está registrado.' });
          } else if (errorData.message === 'El telefono ya esta registrado') {
            setErrors({ phone: 'El número de teléfono ya está registrado.' });
          }
        } else {
          alert('Error en el registro. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error durante el registro', error);
      alert('Hubo un error durante el registro. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f7fa] text-black">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl">
      <div className="w-1/2 bg-[#0277bd] p-8 flex flex-col justify-center mx-auto">
  <h2 className="text-white text-3xl font-bold mb-6 text-center">Información Importante</h2>
  <p className="text-blue-100 mb-4 text-center">
    Al registrarte en nuestra plataforma, estás aceptando nuestros términos y condiciones y pasando a formar parte de nuestra amplia y confiable red de renta de carros, donde miles de usuarios disfrutan de una experiencia segura y sin complicaciones al alquilar vehículos de manera eficiente y a precios competitivos.
  </p>
  <p className="text-white font-semibold text-center">IMPORTANTE:</p>
  <p className="text-blue-100 text-center">
    Si ya cuentas con una cuenta registrada en nuestro sistema, no será posible crear una nueva con la misma información. Por lo tanto, asegúrate de utilizar tus credenciales existentes para acceder y disfrutar de todos los beneficios que nuestra plataforma tiene para ofrecer.
  </p>
  <p className="text-blue-100 mt-4 text-center">
    Si tienes alguna duda o necesitas ayuda para acceder a tu cuenta, nuestro equipo de soporte está siempre listo para asistirte.
  </p>
  <button
    onClick={() => router.push('/')}
    className="mt-6 bg-white text-[#0277bd] py-2 px-4 rounded-full hover:bg-gray-200 transition duration-200 mx-auto"
  >
    YA TENGO UNA CUENTA
  </button>
</div>

        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-[#0277bd] mb-6">REGISTRAR USUARIO</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="PRIMER NOMBRE"
                className="w-1/2 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
              />
              <input
                type="text"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                placeholder="APELLIDOS"
                className="w-1/2 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="TU CORREO"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="flex space-x-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="CONTRASEÑA"
                className="w-1/2 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="CONFIRMAR CONTRASEÑA"
                className="w-1/2 p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="TELÉFONO"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="DIRECCIÓN"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="FECHA DE NACIMIENTO"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-600">
                Yo acepto los <a href="#" className="text-blue-600">Términos y Condiciones</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-[#0277bd] text-white rounded hover:bg-[#01579b] transition duration-200"
            >
              REGISTRAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
