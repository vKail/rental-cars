import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { protectedRoutes } from './shared/constants/protected-routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener el token de la cookie
  const token = request.cookies.get('access_token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decodificar el token con el tipo correcto
    const decoded = jwtDecode<CustomJwtPayload>(token);
    
    // Verificar si la ruta actual coincide con alguna ruta protegida
    const matchingRoute = Object.entries(protectedRoutes).find(([route]) => {
      const routePattern = new RegExp(route.replace(':path*', '.*'));
      return routePattern.test(pathname);
    });

    if (matchingRoute) {
      const [_, allowedRoles] = matchingRoute;
      
      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.redirect(new URL('/forbidden-page', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Si hay un error al decodificar el token
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/reservation_car/:path*'
  ]
}