import Vue from 'vue'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'ja',
  locales: {
    ja: require('date-fns/locale/ja')
  }
})
