<template>
  <div class="main">
    <table class="main-table">
      <thead>
        <tr>
          <th @click="sortBy('title')" class="clm-title">
            名前
          </th>
          <th @click="sortBy('author')" class="clm-author">
            作者
          </th>
          <th @click="sortBy('volume')" class="clm-volume">
            巻数
          </th>
          <th @click="sortBy('chapter')" class="clm-chapter">
            話数
          </th>
          <th @click="sortBy('status')" class="clm-status">
            状態
          </th>
          <th @click="sortBy('point')" class="clm-point">
            点数
          </th>
          <th @click="sortBy('updated_at')" class="clm-updated">
            更新
          </th>
          <th class="clm-edit">
            <!--編集-->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in $store.getters['book/books']">
          <td class="clm-title">
            {{ book.title }}
          </td>
          <td class="clm-author">
            {{ book.author }}
          </td>
          <td class="clm-volume">
            {{ book.volume }}
          </td>
          <td class="clm-chapter">
            {{ book.chapter }}
          </td>
          <td class="clm-status">
            <figure :class="book.status" class="circle" />
            {{ book.status }}
          </td>
          <td class="clm-point">
            {{ book.point }}
          </td>
          <td class="clm-update">
            {{ book.updated_at }}
          </td>
          <td class="clm-edit">
            <a @click="openEditBook(index)">
              <i class="fas fa-pen icon" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  async fetch () {
    await this.$store.dispatch('book/init')
  },
  methods: {
    openEditBook (id) {
      this.$store.commit('book/target', id)
      this.$modal.show('editBook')
    },
    sortBy (key) {
      this.$store.commit('book/sortBy', key)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 100px);
  background-color: #1F2224;
  color: #EEEEEE;
}

table.main-table {
  color: #d5d5d8;
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
  th {
    border-style: none solid;
    border-width: 3px;
    border-color: #26262F;
    background-color: #2B2C34;
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
    width: 33%;
    min-width: 100px;
  }
  .clm-author {
    width: 17%;
    min-width: 80px;
  }
  .clm-volume {
    width: 5%;
    min-width: 60px;
  }
  .clm-chapter {
    width: 5%;
    min-width: 60px;
  }
  .clm-status {
    width: 12%;
    min-width: 120px;
  }
  .clm-point {
    width: 5%;
    min-width: 60px;
  }
  .clm-updated {
    width: 17%;
    min-width: 130px;
  }
  .clm-edit {
    width: 5%;
    min-width: 50px;
    text-align: center;
  }
}

.circle {
  display: inline-block;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin: 0;
  &.Active {
    background: radial-gradient(circle at 40% -35%,#deefef,#78f678 10%,#059405 50%,#064527 100%);
  }
  &.Inactive {
    background: radial-gradient(circle at 40% -25%, #efdeef, #f68881 10%, #940505 80%, #333333 100%);
  }
  &.Complete {
    background: radial-gradient(circle at 40% -25%, #81e8f6, #76deef 10%, #055194 80%, #062745 100%);
  }
}
</style>
