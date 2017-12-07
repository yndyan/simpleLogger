import router from '../router'
import commonAuth from './commonS'

export default Object.freeze({
  user: {
    authenticated: false
  },
  register (newUser) {
    console.log(newUser)
    return commonAuth.axiosObject.post(commonAuth.REGISTER_URL, newUser)
  },

  login (creds) {
    return commonAuth.axiosObject.post(commonAuth.LOGIN_URL, creds)
  },
  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('id_token')
    router.push('/login')
  }
})

