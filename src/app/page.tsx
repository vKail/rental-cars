'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
 return (
  <div className="container mx-auto px-4 py-16">

  <div className="text-center max-w-4xl mx-auto mb-12">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Sobre DriveEase Rentals</h1>
      <p className="text-xl text-gray-600">Su socio confiable para alquileres de autos sin complicaciones en todo el país</p>
  </div>


  <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
          <p className="text-gray-600">Ofreciendo soluciones de alquiler de autos confiables, accesibles y convenientes para cada viaje.</p>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nuestra Visión</h2>
          <p className="text-gray-600">Convertirnos en el servicio de alquiler de autos más confiable e innovador a nivel nacional.</p>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nuestro Compromiso</h2>
          <p className="text-gray-600">Garantizando la satisfacción del cliente a través de vehículos de calidad y un servicio excepcional.</p>
      </div>
  </div>


  <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Quiénes Somos</h3>
      <div className="space-y-4 text-gray-700">
          <p>DriveEase Rentals fue fundada con un objetivo simple pero poderoso: hacer que el alquiler de autos sea sencillo, accesible y agradable. Con años de experiencia en la industria del transporte, entendemos que cada viaje es único.</p>
          <p>Nuestra diversa flota de vehículos bien mantenidos atiende todas las necesidades, desde autos compactos para explorar la ciudad hasta SUVs espaciosos para viajes familiares. Nos enorgullecemos de tener precios transparentes, términos de alquiler flexibles y un compromiso con la comodidad del cliente.</p>
      </div>
  </div>


  {/* <div className="max-w-7xl mx-auto mt-16">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Conoce a Nuestro Equipo</h3>
      <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/api/placeholder/200/200" width={20} height={20} alt="Miembro del Equipo" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
              <h4 className="text-xl font-semibold text-gray-800">Sarah Johnson</h4>
              <p className="text-gray-600">Directora Ejecutiva y Fundadora</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/api/placeholder/200/200" width={20} height={20} alt="Miembro del Equipo" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
              <h4 className="text-xl font-semibold text-gray-800">Michael Chen</h4>
              <p className="text-gray-600">Director de Operaciones</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image src="/api/placeholder/200/200" width={20} height={20} alt="Miembro del Equipo" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
              <h4 className="text-xl font-semibold text-gray-800">Emily Rodriguez</h4>
              <p className="text-gray-600">Gerente de Experiencia del Cliente</p>
          </div>
      </div>
  </div> */}
</div>
 )
}