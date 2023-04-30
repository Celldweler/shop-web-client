const initState = () => ({
    mode: ADMIN_MODE.Dashboard,
    ADMINMODE_ENUMS: {
        Dashboard: 'Dashboard',
        Products: "PRODUCTS",
        Orders: "ORDERS",
        Stock: "STOCK",
        Customers: "CUSTOMERS",
        Categories: "Categories",
        Chats: 'chats'
    }
});

const ADMIN_MODE = {
    Dashboard: 'Dashboard',
    Products: "PRODUCTS",
    Orders: "ORDERS",
    Stock: "STOCK",
    Customers: "CUSTOMERS",
}

export const getters = {
    // currentAdminMode: ()
}

export const state = initState;

export const mutations = {
    setAdminMode(state, mode) {
        state.mode = mode
    },
    resetAdminMode(state) {
        state.mode = ADMIN_MODE.Dashboard
    }
};

export const actions = {

};