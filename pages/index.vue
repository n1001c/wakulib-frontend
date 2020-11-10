<template>
  <div>
    <navbar />
    <books-table />
    <add-book />
    <edit-book />
    <delete-book />
    <search-book />
    <settings />
    <navbar-bottom />
    <loading
      :active.sync="$store.getters['load/get']"
      color="#FFF"
      background-color="#000000"
      blur="0px"
    />
  </div>
</template>

<script>
export default {
  middleware: 'loggedIn'
}
</script>

<style scoped>
</style>
