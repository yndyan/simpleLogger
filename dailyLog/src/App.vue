<template>
  <div id="app" class="container">
    <ul id="navbar">
      <li><router-link to="login">Login</router-link></li>
      <li><router-link to="register">Register</router-link></li>
      <li><router-link to="/">Add log</router-link></li>
      <li><router-link to="history">History</router-link></li>   
      <li><router-link to=""><span v-on:click="onLogout">logout</span> </router-link></li>   
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import authS from './services/authS'
export default {
  name: 'app',
  methods: {
    onLogout () {
      authS.logout(this, this.user)
    }
  }
}
</script>

<style>
#navbar li {
    display: inline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
