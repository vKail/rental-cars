export const ACCESS_TOKEN_COOKIE = 'access_token'

export const API_ROUTES = {
    AUTH : {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    USERS : {
        GET_USERS: '/users',
        GET_USER: '/users/:id',
        CREATE_USER :  '/users',
        UPDATE_USER: (id : number) => `/users/${id}`,
        DELETE_USER: (id: number) => `/users/${id}`
    },
    CARS : {
        GET_CARS: '/cars',
        GET_CAR: '/cars/:id',
        CREATE_CAR :  '/cars',
        UPDATE_CAR: (id : number) => `/cars/${id}`,
        DELETE_CAR: (id: number) => `/cars/${id}`
    },
    REPATATIONS : {
        GET_REPATATIONS: '/repatations',
        GET_REPATATION: '/repatations/:id',
        CREATE_REPATATION :  '/repatations',
        UPDATE_REPATATION: (id : number) => `/repatations/${id}`,
        DELETE_REPATATION: (id: number) => `/repatations/${id}`
    },
    INVOICES : {
        GET_INVOICES: '/invoices',
        GET_INVOICE: '/invoices/:id',
        CREATE_INVOICE :  '/invoices',
        UPDATE_INVOICE: (id : number) => `/invoices/${id}`,
        DELETE_INVOICE: (id: number) => `/invoices/${id}`
    },
}