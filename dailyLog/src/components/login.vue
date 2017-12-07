<template>
  <div class="history">
  <h2 >Login</h2>
      <form >
      <div>
        <label><b>Username</b></label>
        <input type="text" placeholder="Enter Username" n v-model="user.username" required>
      </div>
      <div>
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" v-model="user.password" required>
      </div>
      <div>
        <input type="submit" v-on:click="onLogin()">
      </div>
    </form>
  </div>
</template>

<script>
import authS from '../services/authS'
import commonS from '../services/commonS'
import router from '../router'

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      // TODO add fields  front verification
      console.log(this.user)
      authS.login(commonS.genUrlSearchParams(this.user))
        .then(res => {
          localStorage.setItem('id_token', res.data.token)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
          router.push('/login')
        })
    }
  }
}
</script>

