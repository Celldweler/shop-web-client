const initState = () => ({})

export const state = initState;

export const mutations = {}

export const actions = {
    nuxtServerInit({dispatch}) {
      // dispatch('auth/initialize');
      console.log("nuxt server init")
    },
    clientInit({ dispatch }) {
        dispatch('auth/initialize');
    }
}
