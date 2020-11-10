<template>
  <div class="main">
    <form @submit.prevent="login" autocomplete="off">
      <div class="items-container">
        <div class="item">
          <label class="attribute" for="email">メールアドレス</label>
          <input id="email" v-model="form.email" type="email">
        </div>
        <div class="item">
          <label class="attribute" for="password">パスワード</label>
          <input id="password" v-model="form.password" type="password">
        </div>
      </div>
      <div class="button-submit-wrapper">
        <button class="button-submit pointer" type="submit">
          ログイン
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      await this.$store.dispatch('auth/login', this.form).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
        this.$notify({
          group: 'login',
          type: 'error',
          title: 'ログイン失敗',
          text: 'メールアドレスかパスワードが違います'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 500px;
  background-color: #333339;
  color: #EEEEEE;
  text-align: center;
  padding: 0 20px 30px;
  .items-container {
    display: inline-block;
    .item {
      margin-top: 30px;
      label[class="attribute"] {
        display: inline-block;
        width: 160px;
        text-align: left;
      }
      input {
        width: 200px;
        color: #EEEEEE;
        padding: 8px 12px;
        border: 1px solid rgba(0,0,0,.5);
        background: rgba(0,0,0,.25);
        &:focus {
          outline: 0;
        }
      }
    }
  }
  .button-submit-wrapper {
    text-align: center;
    margin: 30px 0 10px 0;
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
}
</style>
