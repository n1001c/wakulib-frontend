<template>
  <div class="main">
    <div class="left">
      <logo />
    </div>
    <div class="right">
      <a @click="$modal.show('addBook')" title="本の追加"><i class="fas fa-plus icon" /></a>
      <a @click="$modal.show('settings')" title="設定"><i class="fas fa-cog icon" /></a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 12px;
  color: #EEEEEE;
  background-color: #282930;
  a {
    cursor: pointer;
    i.icon {
      font-size: 40px;
      margin-left: 12px;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
