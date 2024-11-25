/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Coincide con cualquier dominio
        port: "", // Sin restricciones de puerto
        pathname: "**", // Coincide con cualquier ruta
      },
    ],
  },
};
export default nextConfig;
