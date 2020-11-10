<template>
  <div class="main">
    <modal
      :minWidth="650"
      :width="650"
      :minHeight="500"
      :adaptive="true"
      :scrollable="true"
      name="settings"
      height="auto"
    >
      <div class="wrapper">
        <div class="close-button">
          <i @click="$modal.hide('settings')" class="fas fa-times pointer" title="閉じる" />
        </div>
        <div class="button-submit-wrapper">
          <button class="button-submit pointer" @click="logout">
            ログアウト
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .vm--modal {
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
  .button-submit-wrapper {
    text-align: center;
    margin: 30px 0;
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
