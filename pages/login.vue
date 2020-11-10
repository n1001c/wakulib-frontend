<template>
  <div class="login-main">
    <div class="wrapper">
      <input class="menu-input" id="sign-in-input" v-model="mode" type="radio" value="signIn">
      <label class="menu-label" for="sign-in-input">ログイン</label>
      <input class="menu-input" id="sign-up-input" v-model="mode" type="radio" value="signUp">
      <label class="menu-label" for="sign-up-input">新規登録</label>
      <sign-in v-if="mode === 'signIn'" />
      <sign-up v-else />
      <notifications group="login" position="bottom right" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'loggedOut',
  data () {
    return {
      mode: 'signIn'
    }
  }
}
</script>

<style lang="scss" scoped>
.login-main {
  color: #EEEEEE;
  background-color: #1F2224;
  height: 100vh;
  text-align: center;
  .wrapper {
    margin-top: 100px;
    display: inline-block;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 3px 10px 0 rgba(0,0,0,0.12), 0 4px 7px -2px rgba(0,0,0,0.2);
    .menu-label {
      display: inline-block;
      float: left;
      text-align: center;
      padding: 20px 0;
      background-color: #222222;
      width: 250px;
      cursor: pointer;
    }
    .menu-input {
      display: none;
      &:checked + label {
        background-color: #27262B;
      }
    }
  }
}
</style>
