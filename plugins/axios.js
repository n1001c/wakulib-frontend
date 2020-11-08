export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    // if (config.url !== '/rakutensearch/') {
    config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
    // }
    config.headers.common.Accept = 'application/json'
    return config
  })
}
