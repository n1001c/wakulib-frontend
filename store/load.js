export const state = () => ({
  loading: false
})

export const getters = {
  get (state) { return state.loading }
}

export const mutations = {
  on (state) { state.loading = true },
  off (state) { state.loading = false }
}
