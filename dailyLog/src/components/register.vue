<template>
  <div>
    <h2 >Register</h2>
  <form >
    <div>
      <label>Username</label>
      <input type="text" v-model="user.username" placeholder="Enter username">
    </div>
    <div>
      <label>Email</label>
      <input type="text" v-model="user.email" placeholder="Enter Email">
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="user.password" placeholder="Enter password">
    </div>
    <input type="submit" v-on:click="onRegisterSubmit()">
    </form>
  </div>
</template>

<script>

import authS from '../services/authS'
import commonS from '../services/commonS'

export default {
  name: 'register',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onRegisterSubmit () {
      // TODO add fields  front verification
      console.log(this.user)
      authS.register(commonS.genUrlSearchParams(this.user))
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err.response.data.msg)
        })
    }
  }
}
</script>

