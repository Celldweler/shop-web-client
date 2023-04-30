const initState = () => ({
    categories: []
})

export const state = initState;

export const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
    addNewCategory(state, category) {
        state.categories.push(category)
    },
    removeCategory(state, category) {
        const index = state.categories.findIndex(x => x.name === category.name);
        state.categories.splice(index, 1);
    }
};

export const actions = {
    fetchCategories({commit}) {
        return this.$axios.get('api/categories').then(res => {
            commit('setCategories', res.data)
        })
    }
}