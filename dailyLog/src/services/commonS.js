// TODO this file should be logically above authS and logger, because both serivecs use this
import axios from 'axios'

const axiosObject = axios.create({
  baseURL: 'http://localhost:3339/api',
  // baseURL: 'http://88.99.226.150:1337/api',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
export default Object.freeze({
  LOGIN_URL: '/authenticate',
  REGISTER_URL: '/register',
  LOGGER_URL: '/logger',
  DATASOURCE_URL: '/datasource',
  axiosObject,
  generateAuthHeader () {
    return { 'headers': {'Authorization': localStorage.getItem('id_token')} }
  },
  genUrlSearchParams (inputObject) {
    const urlSearchParams = new URLSearchParams()
    for (let name in inputObject) {
      if (Object.prototype.hasOwnProperty.call(inputObject, name)) {
        urlSearchParams.append(name, inputObject[name])
      }
    }
    // console.log(urlSearchParams)
    return urlSearchParams
  }
})
