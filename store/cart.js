const initState = () => ({
    cart: []
})

export const state = initState;

export const actions = {
   setCart(state, cart) {
    state.cart = cart
   },
   resetCart(state) {
    state.cart = []
   }
};

export const mutations = {
   
};