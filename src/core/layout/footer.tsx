import { Car } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white shadow-md border border-gray-200  m-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Car size={32} className="text-new-black" />
                        <span className="self-center text-2xl font-medium text-new-black">
                            Rental Cars App
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <a href="#" className="hover:text-new-black me-4 md:me-6">Sobre Nosotros</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-new-black me-4 md:me-6">Política de Privacidad</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-new-black me-4 md:me-6">Términos y Condiciones</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-new-black">Contacto</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © {new Date().getFullYear()}{' '}
                    <a href="/" className="hover:text-new-black">
                        Rental Cars App™
                    </a>
                    . Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
};