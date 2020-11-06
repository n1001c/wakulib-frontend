<template>
  <div class="main">
    <modal
      :delay="100"
      name="editBook"
      width="80%"
      height="80%"
      transition="nice-modal-fade"
    >
      <a @click="$modal.hide('editBook')">
        閉じる
      </a>
      <button @click="$modal.show('deleteBook')">
        本を削除
      </button>
      <form @submit.prevent="editBook">
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
          保存
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
        status: ''
      }
    }
  },
  computed: {
    targetBook () {
      return this.$store.state.book.books[this.$store.state.book.targetIdx]
    }
  },
  watch: {
    targetBook (target) {
      this.book.title = target.title
      this.book.phonetic = target.phonetic
      this.book.author = target.author
      this.book.publisher = target.publisher
      this.book.volume = target.volume
      this.book.chapter = target.chapter
      this.book.point = target.point
      this.book.status = target.status
    }
  },
  methods: {
    async editBook () {
      await this.$store.dispatch('book/update', this.book)
      this.$modal.hide('editBook')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
