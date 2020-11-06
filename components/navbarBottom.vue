<template>
  <div class="main">
    <span>{{ booksSum }}作品 / {{ volumesSum }}冊 / {{ chaptersSum }}話</span>
  </div>
</template>

<script>
export default {
  computed: {
    booksSum () {
      return this.$store.getters['book/books'].length
    },
    volumesSum () {
      return this.$store.getters['book/books'].reduce((sum, book) => sum + book.volume, 0)
    },
    chaptersSum () {
      return this.$store.getters['book/books'].reduce((sum, book) => sum + book.chapter, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 36px;
  padding: 6px;
  color: #EEEEEE;
  background-color: #282930;
  text-align: center;
  span {
    font-size: 12px;
  }
}
</style>
