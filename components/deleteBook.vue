<template>
  <div class="main">
    <modal
      :width="420"
      name="deleteBook"
      height="140"
    >
      <p>この本をライブラリから削除しますか？</p>
      <button @click="$modal.hide('deleteBook')" class="cancel-button pointer">
        キャンセル
      </button>
      <button @click="deleteBook" class="delete-button pointer">
        削除
      </button>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    async deleteBook () {
      this.$store.commit('load/on')
      await this.$store.dispatch('book/destroy')
      this.$store.commit('load/off')
      this.$modal.hide('deleteBook')
      this.$modal.hide('editBook')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .vm--modal {
  position: relative;
  background-color: #333339;
  color: #EEEEEE;
  p {
    margin-top: 20px;
    text-align: center;
  }
  .cancel-button {
    display: inline-block;
    position: absolute;
    top: 60px;
    left: 40px;
    color: #EEEEEE;
    background-color: #222222;
    border: none;
    padding: 10px 40px;
    font-size: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 3px 10px 0 rgba(0,0,0,0.12), 0 4px 7px -2px rgba(0,0,0,0.2);
    transition: .2s ease-out;
    &:hover {
      transform: translateY(4px);
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    }
    &:focus {
      outline: 0;
    }
  }
  .delete-button {
    @extend .cancel-button;
    background-color: #8B0000;
    left: auto;
    right: 40px;
  }
  .pointer {
    cursor: pointer;
  }
}
</style>
