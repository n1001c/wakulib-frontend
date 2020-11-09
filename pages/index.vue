<template>
  <div>
    <navbar />
    <books-table />
    <add-book />
    <edit-book />
    <delete-book />
    <search-book />
    <navbar-bottom />
    <!--
      <button @click="logout">
        ログアウト
      </button>
      -->
  </div>
</template>

<script>
export default {
  middleware: 'loggedIn',
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style scoped>
</style>
