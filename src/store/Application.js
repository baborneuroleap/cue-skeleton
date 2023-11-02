/*
* this store will use for common task,
* such as loading, notification etc
*/

const application = {
    state: {
        loading: false,
    },

    getters: {
        get_loading_status(state) {
            return state.loading
        }
    },

    mutations: {
        set_loading_status(state, data) {
            state.loading = data
        }
    },

    actions: {
        loading_action({ commit, state }, payload) {
            commit('set_loading_status', payload)
        }
    }
}

export default application
