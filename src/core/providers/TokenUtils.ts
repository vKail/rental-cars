// TokenUtils.ts

export const setToken = (token: string) => {
    // Guarda tanto en cookie como localStorage para compatibilidad
    document.cookie = `access_token=${token}; path=/; max-age=86400`; // expira en 1 día
}

export const getToken = () => {
    // Intenta obtener de cookie primero
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
}

export const removeToken = () => {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}