const initState = () => ({
    products: []
})

export const state = initState;

export const actions = {
    setProducts(state, products) {
        state.products = products
    },
    resetProducts(state) {
        state.products = []
    }
};

export const mutations = {
    async getProductsFromApi({commit}) {
        var products = await this.$axios.$get('api/products')
        commit('setProducts', products)
    },
    
};