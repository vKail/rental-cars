export const protectedRoutes = {
  "/dashboard/users/:path*": ["administrador"],
  "/dashboard/cars/:path*": ["administrador", "employee"],
  "/dashboard/rentals/:path*": ["administrador", "employee", "client"],
  "/reservation_car/:path*": ["client", "employee", "administrador"],
};
