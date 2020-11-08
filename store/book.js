import Vue from 'vue'

export const state = () => ({
  books: [],
  targetIdx: 0,
  lastSortedKey: ''
})

export const getters = {
  books (state) {
    return state.books
  }
}

export const mutations = {
  initBooks (state, payload) {
    state.books = payload
  },
  target (state, idx) {
    state.targetIdx = idx
  },
  // string:keyをキーにして昇順ソート
  // 既に昇順ソート済みなら降順にする
  sortBy (state, key) {
    if (key === 'title') { key = 'phonetic' }
    if (key === state.lastSortedKey) {
      state.books.reverse()
      return
    }
    state.lastSortedKey = key
    state.books.sort(function (a, b) {
      a = a[key]
      b = b[key]
      if (a < b) { return -1 }
      if (a > b) { return 1 }
      return 0
    })
  },
  storeBook (state, book) {
    state.books.unshift(book)
    state.lastSortedKey = ''
  },
  updateBook (state, book) {
    // ↓直接変更してもvuexが検知しないから画面に反映されない
    // state.books[state.targetIdx] = book
    Vue.set(state.books, state.targetIdx, book)
    state.lastSortedKey = ''
  },
  destroyBook (state) {
    state.books.splice(state.targetIdx--, 1)
  }
}

export const actions = {
  async init (context) {
    context.commit('initBooks', await this.$axios.$get('/api/books'))
    context.commit('sortBy', 'updated_at')
    context.commit('sortBy', 'updated_at')
  },
  async store (context, payload) {
    const res = await this.$axios.$post('books', payload)
    context.commit('storeBook', res)
  },
  async update (context, payload) {
    const res = await this.$axios.$put('books/' + context.state.books[context.state.targetIdx].id, payload)
    context.commit('updateBook', res)
  },
  async destroy (context) {
    await this.$axios.$delete('books/' + context.state.books[context.state.targetIdx].id)
    context.commit('destroyBook')
  }
}
