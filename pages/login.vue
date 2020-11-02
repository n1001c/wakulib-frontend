<template>
  <div>
    <p v-show="isError">
      認証に失敗しました。
    </p>
    <form @submit.prevent="login">
      <h1>ログイン</h1>
      <p>メールアドレス: <input v-model="form.email" type="email"></p>
      <p>パスワード: <input v-model="form.password" type="password"></p>
      <button>ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'loggedOut',
  data () {
    return {
      isError: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      try {
        this.$store.dispatch('auth/login', this.form).then(() => {
          this.$router.push({ path: '/' })
        })
      } catch (error) {
        this.isError = true
      }
    }
  }
}
</script>

<style scoped>
</style>
