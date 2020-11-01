<template>
  <div>
    <h1>ログイン成功</h1>
    <p>id: {{ $store.state.auth.id }}</p>
    <p>name: {{ $store.state.auth.name }}</p>
    <p>email: {{ $store.state.auth.email }}</p>
    <p>token: {{ $store.state.auth.token }}</p>
    <button @click="logout">
      ログアウト
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
</style>
