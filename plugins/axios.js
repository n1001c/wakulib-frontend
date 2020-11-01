export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
    config.headers.common.Accept = 'application/json'
    return config
  })
}
