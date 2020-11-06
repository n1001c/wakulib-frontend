<template>
  <div class="main">
    <modal
      :delay="100"
      name="addBook"
      width="80%"
      height="80%"
      transition="nice-modal-fade"
    >
      <a @click="$modal.hide('addBook')">閉じる</a>
      <form @submit.prevent="addBook">
        <label for="title">題名</label>
        <input id="title" v-model="book.title" type="text" required>
        <label for="phonetic">読みがな</label>
        <input id="phonetic" v-model="book.phonetic" type="text">
        <label for="author">作者</label>
        <input id="author" v-model="book.author" type="text">
        <label for="publisher">出版社</label>
        <input id="publisher" v-model="book.publisher" type="text">
        <label for="volume">巻数</label>
        <input id="volume" v-model="book.volume" type="number">
        <label for="chapter">話数</label>
        <input id="chapter" v-model="book.chapter" type="number">
        <label for="point">点数</label>
        <input id="point" v-model="book.point" type="number">
        <label for="status">状態</label>
        <input id="status" v-model="book.status" type="text">
        <button type="submit">
          追加
        </button>
      </form>
    </modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      book: {
        title: '',
        phonetic: '',
        author: '',
        publisher: '',
        volume: 1,
        chapter: 1,
        point: 0,
        image_url: '',
        status: 'Active'
      }
    }
  },
  methods: {
    async addBook () {
      await this.$store.dispatch('book/store', this.book)
      this.$modal.hide('addBook')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
