
import commonAuth from './commonS'

export default Object.freeze({
  getData () {
    return commonAuth.axiosObject.get(commonAuth.DATASOURCE_URL, commonAuth.generateAuthHeader())
  },
  sendData (data) {
    return commonAuth.axiosObject.post(commonAuth.LOGGER_URL, data, commonAuth.generateAuthHeader())
  },
  updateData (data) {
    return commonAuth.axiosObject.put(commonAuth.LOGGER_URL, data, commonAuth.generateAuthHeader())
  },
  getHistory (query) {
    const params = Object.assign(commonAuth.generateAuthHeader(), {params: query})
    return commonAuth.axiosObject.get(commonAuth.LOGGER_URL, params)
  }
})
