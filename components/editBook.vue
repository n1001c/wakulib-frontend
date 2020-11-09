<template>
  <div class="main">
    <modal
      :minWidth="650"
      :width="650"
      :minHeight="500"
      :adaptive="true"
      :scrollable="true"
      name="editBook"
      height="auto"
    >
      <div class="wrapper">
        <div class="close-button">
          <i @click="$modal.hide('editBook')" class="fas fa-times pointer" title="閉じる" />
        </div>
        <div class="delete-button">
          <i @click="$modal.show('deleteBook')" class="fas fa-trash pointer" title="削除" />
        </div>
        <form @submit.prevent="editBook" autocomplete="off">
          <div class="items-container">
            <div class="item">
              <label class="attribute" for="title">題名</label>
              <input id="title" v-model="book.title" type="text" placeholder="Re:ゼロから始める異世界生活" required>
            </div>
            <div class="item">
              <label class="attribute" for="phonetic">読みがな</label>
              <input id="phonetic" v-model="book.phonetic" type="text" placeholder="り・ぜろからはじめるいせかいせいかつ">
            </div>
            <div class="item">
              <label class="attribute" for="author">作者</label>
              <input id="author" v-model="book.author" type="text" placeholder="長月達平">
            </div>
            <div class="item">
              <label class="attribute" for="publisher">出版社</label>
              <input id="publisher" v-model="book.publisher" type="text" placeholder="KADOKAWA">
            </div>
            <div class="item">
              <label class="attribute" for="volume">巻数</label>
              <input id="volume" v-model="book.volume" type="number">
              <div class="minus-button">
                <i @click="book.volume--" class="far fa-arrow-alt-circle-down pointer" />
              </div>
              <div class="plus-button">
                <i @click="book.volume++" class="far fa-arrow-alt-circle-up pointer" />
              </div>
            </div>
            <div class="item">
              <label class="attribute" for="chapter">話数</label>
              <input id="chapter" v-model="book.chapter" type="number">
              <div class="minus-button">
                <i @click="book.chapter--" class="far fa-arrow-alt-circle-down pointer" />
              </div>
              <div class="plus-button">
                <i @click="book.chapter++" class="far fa-arrow-alt-circle-up pointer" />
              </div>
            </div>
            <div class="item">
              <label class="attribute" for="point">点数</label>
              <input id="point" v-model="book.point" type="number" readonly>
              <vue-slider
                v-model="book.point"
                :width="300"
                :height="6"
                :min="0"
                :max="100"
                :interval="1"
                :drag-on-click="true"
                :useKeyboard="false"
                :contained="true"
                :dotSize="20"
              />
            </div>
            <div class="item">
              <label class="attribute">状態</label>
              <input
                id="active"
                v-model="book.status"
                class="radio-status"
                type="radio"
                name="status"
                value="Active"
              >
              <label class="label-status status-active pointer" for="active">連載中</label>
              <input
                id="inactive"
                v-model="book.status"
                class="radio-status"
                type="radio"
                name="status"
                value="Inactive"
              >
              <label class="label-status status-inactive pointer" for="inactive">休載中</label>
              <input
                id="complete"
                v-model="book.status"
                class="radio-status"
                type="radio"
                name="status"
                value="Complete"
              >
              <label class="label-status status-complete pointer" for="complete">完結</label>
            </div>
          </div>
          <div class="button-submit-wrapper">
            <button class="button-submit pointer" type="submit">
              保存
            </button>
          </div>
        </form>
      </div>
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
        volume: '',
        chapter: '',
        point: 50,
        image_url: '',
        status: 'Active'
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
      if (this.$store.state.book.books.length === 0) { return }
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
      this.book.volume = parseInt(this.book.volume) || 0
      this.book.chapter = parseInt(this.book.chapter) || 0
      await this.$store.dispatch('book/update', this.book)
      this.$modal.hide('editBook')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .vm--modal {
  * {
    margin: 0;
    padding: 0;
  }
  background-color: #333339;
  color: #EEEEEE;
  position: relative;
  .close-button {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 50px;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.3);
    }
  }
  .delete-button {
    position: absolute;
    top: 60px;
    right: 10px;
    font-size: 40px;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.3);
    }
  }
  .items-container {
    width: 500px;
    margin: 0 auto;
    .item {
      margin-top: 20px;
      height: 50px;
      label[class="attribute"] {
        display: inline-block;
        width: 90px;
      }
    }
  }
  input {
    color: #EEEEEE;
    padding: 8px 12px;
    border: 1px solid rgba(0,0,0,.5);
    background: rgba(0,0,0,.25);
    &:focus {
      outline: 0;
    }
    &[type="text"] {
      width: 400px;
    }
    &[type=number] {
      width: 80px;
    }
  }
  .plus-button {
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
    font-size: 36px;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.3);
    }
    & i {
      vertical-align: top;
      color: #FFBFBF;
    }
  }
  .minus-button {
    @extend .plus-button;
    & i {
      color: #BFBFFF;
    }
  }
  .label-status {
    // background-color: #111111;
    border: 1px solid rgba(0,0,0,.5);
    padding: 7px 16px;
    margin: 0 5px 0 0;
  }
  .radio-status {
    display: none;
  }
  .radio-status:checked + label {
    &.status-active {
      background-color: #006400;
    }
    &.status-inactive {
      background-color: #8b0000;
    }
    &.status-complete {
      background-color: #191970;
    }
  }
  .button-submit-wrapper {
    text-align: center;
    margin: 30px 0;
  }
  .button-submit {
    display: inline-block;
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
  .pointer {
    cursor: pointer;
  }
  .vue-slider {
    display: inline-block;
    // style属性上書きのための仕方ないimportant
    padding: 2px 0 !important;
    margin-left: 15px !important;
    .vue-slider-rail {
      background-color: #111111;
    }
    .vue-slider-process {
      background-color: #EEEEEE;
    }
    &:hover .vue-slider-process {
      background-color: #EEEEEE;
    }
    .vue-slider-dot-handle {
      border-color: #36ABFF;
    }
    .vue-slider-dot-handle-focus {
      box-shadow: none;
    }
  }
}
</style>
