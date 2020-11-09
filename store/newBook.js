export const state = () => ({
  title: '',
  phonetic: '',
  author: '',
  publisher: '',
  volume: '',
  chapter: '',
  point: 50,
  image_url: '',
  status: 'Active'
})

export const getters = {
  getTitle (state) { return state.title },
  getPhonetic (state) { return state.phonetic },
  getAuthor (state) { return state.author },
  getPublisher (state) { return state.publisher },
  getVolume (state) { return state.volume },
  getChapter (state) { return state.chapter },
  getPoint (state) { return state.point },
  getImageUrl (state) { return state.image_url },
  getStatus (state) { return state.status }
}

export const mutations = {
  setTitle (state, val) { state.title = val },
  setPhonetic (state, val) { state.phonetic = val },
  setAuthor (state, val) { state.author = val },
  setPublisher (state, val) { state.publisher = val },
  setVolume (state, val) { state.volume = val },
  setChapter (state, val) { state.chapter = val },
  setPoint (state, val) { state.point = val },
  setImageUrl (state, val) { state.image_url = val },
  setStatus (state, val) { state.status = val },
  finalize (state) {
    state.volume = parseInt(state.volume) || 0
    state.chapter = parseInt(state.chapter) || 0
  },
  reset (state) {
    state.title = ''
    state.phonetic = ''
    state.author = ''
    state.publisher = ''
    state.volume = ''
    state.chapter = ''
    state.point = 50
    state.image_url = ''
    state.status = 'Active'
  }
}
