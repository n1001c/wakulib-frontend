import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  id: 0,
  name: '',
  email: '',
  token: ''
})

export const getters = {
  loggedIn (state) {
    return state.token !== ''
  }
}

export const mutations = {
  storelogin (state, payload) {
    state.id = payload.id
    state.name = payload.name
    state.email = payload.email
    state.token = payload.token
  },
  storelogout (state) {
    state.id = 0
    state.name = ''
    state.email = ''
    state.token = ''
  }
}

export const actions = {
  async login (context, payload) {
    const res = await this.$axios.$post('/api/login', {
      email: payload.email,
      password: payload.password
    })
    context.commit('storelogin', res)
  },
  async logout (context, payload) {
    await this.$axios.$post('/api/logout')
    context.commit('storelogout')
  },
  async signup (context, payload) {
    await this.$axios.$post('/api/users', {
      name: payload.name,
      email: payload.email,
      password: payload.password
    })
  },
  nuxtClientInit ({ commit, state, dispatch }, { req }) {
    createPersistedState({
      key: 'wakulib'
    })(this)
  }
}
