require('dotenv').config()
const { RAKUTEN_API_APPLICATION_ID, RAKUTEN_API_APPLICATION_SECRET } = process.env

export default {
  ssr: false,
  generate: {
    fallback: true
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Itim&display=swap' }
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/8a20fdefe2.js',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/vue-js-modal' },
    { src: '~/plugins/vue-slider-component' },
    { src: '~/plugins/vue-timeago' },
    { src: '~/plugins/vue-notification' },
    { src: '~/plugins/vue-loading-overlay' },
    '@/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      // target: 'http://localhost:8000'
      target: 'https://wakulib.herokuapp.com'
    },
    '/rakutensearch/': {
      target: 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
      pathRewrite: { '^/rakutensearch/': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  // auto import components
  components: true,
  // env file
  env: {
    RAKUTEN_API_APPLICATION_ID: process.env.RAKUTEN_API_APPLICATION_ID,
    RAKUTEN_API_APPLICATION_SECRET: process.env.RAKUTEN_API_APPLICATION_SECRET
  }
}
