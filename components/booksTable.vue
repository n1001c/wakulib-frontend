<template>
  <div class="main">
    <vue-good-table
      :columns="columns"
      :rows="books"
      :fixed-header="true"
      max-height="calc(100vh - 100px)"
      style-class="main-table"
    >
      <template slot="table-row" slot-scope="props">
        <a
          v-if="props.column.field == 'edit'"
          @click="openEditBook(props.row.id)"
        >
          <i class="fas fa-pen icon" />
        </a>
        <div v-else-if="props.column.field == 'status'">
          <figure :class="props.row.status" class="circle" />
          {{ props.row.status }}
        </div>
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      books: [],
      columns: [
        {
          label: '名前',
          field: 'title',
          filterOptions: {
            enabled: true,
            placeholder: 'Search...'
          },
          width: '33%',
          thClass: 'clm-title',
          tdClass: 'clm-title'
        },
        {
          label: '作者',
          field: 'author',
          filterOptions: {
            enabled: true,
            placeholder: 'Search...'
          },
          width: '17%',
          thClass: 'clm-author',
          tdClass: 'clm-author'
        },
        {
          label: '巻数',
          field: 'volume',
          width: '5%',
          thClass: 'clm-volume',
          tdClass: 'clm-volume'
        },
        {
          label: '話数',
          field: 'chapter',
          width: '5%',
          thClass: 'clm-chapter',
          tdClass: 'clm-chapter'
        },
        {
          label: '状態',
          field: 'status',
          filterOptions: {
            enabled: true,
            placeholder: 'Search...',
            filterDropdownItems: [
              'Active',
              'Inactive',
              'Complete'
            ]
          },
          width: '12%',
          thClass: 'clm-status',
          tdClass: 'clm-status'
        },
        {
          label: '点数',
          field: 'point',
          width: '5%',
          thClass: 'clm-point',
          tdClass: 'clm-point'
        },
        {
          label: '更新',
          field: 'updated_at',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd HH:mm:ss',
          dateOutputFormat: 'yy/MM/dd HH:mm',
          width: '17%',
          thClass: 'clm-updated',
          tdClass: 'clm-updated'
        },
        {
          label: '',
          field: 'edit',
          width: '5%',
          thClass: 'clm-edit',
          tdClass: 'clm-edit'
        }
      ]
    }
  },
  async fetch () {
    await this.$axios.$get('books')
      .then((res) => {
        this.books = res
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    openEditBook (id) {
      const bookIdx = this.books.findIndex(b => b.id === id)
      const book = this.books[bookIdx]
      book.bookIdx = bookIdx
      this.$store.commit('book/target', book)
      this.$modal.show('editBook')
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

::v-deep table.main-table {
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
    &.filter-th {
      padding-top: 0 !important;
    }
    &:nth-child(1), &:nth-last-child(1) {
      border-style: none;
    }
    &.vgt-right-align {
      text-align: left;
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
    min-width: 100px;
  }
  .clm-author {
    min-width: 80px;
  }
  .clm-volume {
    min-width: 60px;
  }
  .clm-chapter {
    min-width: 60px;
  }
  .clm-status {
    min-width: 120px;
  }
  .clm-updated {
    min-width: 130px;
  }
  .clm-point {
    min-width: 60px;
  }
  .clm-edit {
    text-align: center;
    min-width: 50px;
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

::v-deep .v--modal {
  background-color: #111111;
}
</style>
