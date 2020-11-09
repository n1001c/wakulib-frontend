<template>
  <div class="main">
    <modal
      :minWidth="400"
      :minHeight="400"
      width="800"
      height="700"
      name="searchBook"
    >
      <div class="wrapper">
        <div class="close-button">
          <i @click="$modal.hide('searchBook')" class="fas fa-times pointer" title="閉じる" />
        </div>
        <div class="reset-button">
          <i @click="reset" class="far fa-file pointer" title="リセット" />
        </div>
        <form @submit.prevent="preSearch" autocomplete="off">
          <div class="items-container">
            <div class="item">
              <label class="attribute" for="title">題名</label>
              <input id="title" v-model="prebook.title" type="text" placeholder="Re:ゼロから始める異世界生活">
            </div>
            <div class="item">
              <label class="attribute" for="author">作者</label>
              <input id="author" v-model="prebook.author" type="text" placeholder="長月達平">
            </div>
            <div class="item">
              <label class="attribute" for="publisher">出版社</label>
              <input id="publisher" v-model="prebook.publisher" type="text" placeholder="KADOKAWA">
            </div>
          </div>
          <button class="button-submit pointer" type="submit">
            検索
          </button>
        </form>
        <div class="table-wrapper">
          <table class="main-table">
            <thead>
              <tr>
                <th class="clm-title">
                  名前
                </th>
                <th class="clm-author">
                  作者
                </th>
                <th class="clm-publisher">
                  出版社
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in books" @click="selectBook(index)">
                <td class="clm-title">
                  <img :src="row.imageUrl">
                  <div class="imageStr">
                    {{ row.title }}
                  </div>
                </td>
                <td class="clm-author">
                  {{ row.author }}
                </td>
                <td class="clm-publisher">
                  {{ row.publisher }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      prebook: {
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
    async searchBook (pagearg = 1) {
      const param = {
        applicationId: process.env.RAKUTEN_API_APPLICATION_ID,
        formatVersion: 2,
        outOfStockFlag: 1,
        booksGenreId: '001001',
        page: pagearg,
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
    preSearch () {
      this.book.title = this.prebook.title
      this.book.author = this.prebook.author
      this.book.publisher = this.prebook.publisher
      this.searchBook()
    },
    pageIncrement () {
      this.searchBook(++this.tableData.page)
    },
    pageDecrement () {
      this.searchBook(--this.tableData.page)
    },
    selectBook (idx) {
      this.$store.commit('newBook/reset')
      this.$store.commit('newBook/setTitle', this.books[idx].title)
      this.$store.commit('newBook/setPhonetic', this.books[idx].phonetic)
      this.$store.commit('newBook/setAuthor', this.books[idx].author)
      this.$store.commit('newBook/setPublisher', this.books[idx].publisher)
      this.$store.commit('newBook/setImageUrl', this.books[idx].imageUrl)
      this.reset()
      this.$modal.hide('searchBook')
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

  .table-wrapper {
    height: 510px;
    overflow: scroll;
    margin-top: 10px;
    // background-color: #2E2F3B;
    background-color: #1F2224;
  }
  table.main-table {
    color: #d5d5d8;
    margin: 0 auto;
    padding: 0 30px;
    width: 100%;
    border-collapse: collapse;
    th {
      position: sticky;
      top: 0;
      border-style: none solid;
      border-width: 3px;
      border-color: #26262F;
      background-color: #22222A;
      padding: 12px;
      text-align: left;
      &.filter-th {
        padding-top: 0 !important;
      }
      &:nth-child(1), &:nth-last-child(1) {
        border-style: none;
      }
    }
    td {
      @extend th;
      background-color: #2B2C34;
      position: static;
    }
    tr:nth-child(odd) td {
      background-color: #2E2F3B;
    }
    a {
      cursor: pointer;
      i.icon {
        transition: all 0.2s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .vgt-input, .vgt-select {
      color: #7A7C84;
      background-color: #3A3C44;
      border: none;
    }
    .vgt-input::placeholder {
      color: #7A7C84;
      opacity: 1;
    }
    .clm-title {
      width: 40%;
      min-width: 100px;
      img {
        display: inline-block;
        vertical-align: middle;
        max-width: 85px;
      }
      .imageStr {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        width: 190px;
      }
    }
    .clm-author {
      width: 30%;
      min-width: 80px;
    }
    .clm-publisher {
      width: 30%;
      min-width: 80px;
    }
  }

  .pointer {
    cursor: pointer;
  }
}
</style>
