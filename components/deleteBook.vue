<template>
  <div class="main">
    <modal
      :delay="100"
      name="deleteBook"
      width="40%"
      height="40%"
      transition="nice-modal-fade"
    >
      <a @click="$modal.hide('deleteBook')">
        やめる
      </a>
      <button @click="deleteBook">
        削除
      </button>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    async deleteBook () {
      await this.$store.dispatch('book/destroy')
      this.$modal.hide('deleteBook')
      this.$modal.hide('editBook')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
