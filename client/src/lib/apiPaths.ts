const API_PATHS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        GET_USER: '/auth/profile',
        DELETE_USER: '/auth/delete',
    },
    ADMIN: {
        CREATE_PRODUCT: '/admin/create-product',
        UPDATE_PRODUCT: (id: string) => `/admin/update-product/${id}`,
        DELETE_PRODUCT: (id: string) => `/admin/delete-product/${id}`,
        GET_ALL_PRODUCTS: '/admin/get-all-products',
        GET_PRODUCT_BY_ID: (id: string) => `/admin/get-product/${id}`,
        GET_ALL_USERS: '/admin/get-all-users',
        GET_USER_BY_ID: (id: string) => `/admin/get-user/${id}`,
        DELETE_USER: (userId: string) => `/admin/delete-user/${userId}`,
    },
    USER: {
        ADD_TO_CART: '/user/add-to-cart',
        GET_CART: '/user/get-cart',
        REMOVE_FROM_CART: '/user/remove-from-cart',
        CLEAR_CART: '/user/clear-cart',
        CHECK_OUT: '/user/check-out',
    }
}

export default API_PATHS;