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
  login (context, payload) {
    this.$axios.$post('login', {
      email: payload.email,
      password: payload.password
    }).then((res) => {
      context.commit('storelogin', res)
    })
  },
  logout (context, payload) {
    this.$axios.$post('logout').then((res) => {
      context.commit('storelogout', res)
    })
  }
}
