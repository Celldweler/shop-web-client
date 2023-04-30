const initState = () => ({
    orders: [],
})

export const state = initState;

export const actions = {
   setOrders(state, orders) {
    state.orders = orders
   },
   resetOrders(state) {
    state.orders = [];
   }
};

export const mutations = {
   getCustomerOrdersHistoryFromApi({commit}) {
    
   }
};