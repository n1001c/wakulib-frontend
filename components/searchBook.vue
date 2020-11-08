<template>
  <div class="main">
    <modal
      :delay="100"
      :minWidth="400"
      :minHeight="400"
      width="80%"
      height="80%"
      name="searchBook"
    >
      <div class="wrapper">
        <div class="close-button">
          <i @click="$modal.hide('searchBook')" class="fas fa-times pointer" title="閉じる" />
        </div>
        <div class="reset-button">
          <i @click="reset" class="far fa-file pointer" title="リセット" />
        </div>
        <form @submit.prevent="searchBook" autocomplete="off">
          <div class="items-container">
            <div class="item">
              <label class="attribute" for="title">題名</label>
              <input id="title" v-model="book.title" type="text" placeholder="Re:ゼロから始める異世界生活">
            </div>
            <div class="item">
              <label class="attribute" for="author">作者</label>
              <input id="author" v-model="book.author" type="text" placeholder="長月達平">
            </div>
            <div class="item">
              <label class="attribute" for="publisher">出版社</label>
              <input id="publisher" v-model="book.publisher" type="text" placeholder="KADOKAWA">
            </div>
          </div>
          <button class="button-submit pointer" type="submit">
            検索
          </button>
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
        author: '',
        publisher: ''
      },
      tableData: {
        count: '',
        page: '',
        pageCount: '',
        firstNum: '',
        lastNum: ''
      },
      books: []
    }
  },
  methods: {
    async searchBook () {
      const param = {
        applicationId: process.env.RAKUTEN_API_APPLICATION_ID,
        formatVersion: 2,
        outOfStockFlag: 1,
        booksGenreId: '001001',
        elements: 'count,page,first,last,pageCount,title,titleKana,author,publisherName,mediumImageUrl'
      }
      if (this.book.title !== '') {
        param.title = this.book.title.replace(/\u{3000}/g, ' ')
      }
      if (this.book.author !== '') {
        param.author = this.book.author.replace(/\u{3000}/g, ' ')
      }
      if (this.book.publisher !== '') {
        param.publisher = this.book.publisher.replace(/\u{3000}/g, ' ')
      }
      const res = await this.$axios.$get('/rakutensearch/', { params: param })
      this.tableData.count = res.count
      this.tableData.page = 1
      this.tableData.pageCount = res.pageCount
      this.tableData.firstNum = res.first
      this.tableData.lastNum = res.last
      this.books.length = 0
      if (res.count > 0) {
        res.Items.forEach((ele) => {
          this.books.push({
            title: ele.title,
            phonetic: ele.titleKana.replace(/[\u30A1-\u30F6]/g, function (match) {
              const chr = match.charCodeAt(0) - 0x60
              return String.fromCharCode(chr)
            }),
            author: ele.author,
            publisher: ele.publisherName,
            imageUrl: ele.mediumImageUrl
          })
        })
      }
      console.log(this.books)
    },
    reset () {
      Object.assign(this.$data, this.$options.data())
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
  .reset-button {
    position: absolute;
    top: 60px;
    right: 10px;
    font-size: 46px;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.3);
    }
  }
  .items-container {
    display: inline-block;
    width: 500px;
    margin: 30px 0 0 30px;
    .item {
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
  .label-status {
    // background-color: #111111;
    border: 1px solid rgba(0,0,0,.5);
    padding: 7px 16px;
    margin: 0 5px 0 0;
  }
  .button-submit {
    display: inline-block;
    vertical-align: top;
    margin: 50px 0 0 50px;
    color: #EEEEEE;
    background-color: #222222;
    border: none;
    padding: 30px 40px;
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
