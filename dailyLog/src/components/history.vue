<template>
  <div class="history">
    <h1>History page</h1>
    <ul >
      <li v-for="singleLog in history" :id="singleLog._id" > 
         {{ singleLog.logName }} : {{ singleLog.logDate.split('T')[0] }}
      </li>
    </ul>
  </div>
</template>

<script>
import loggerS from '../services/loggerS'
export default {
  name: 'history',
  data () {
    return {
      history: []
    }
  },
  beforeMount () {
    loggerS.getHistory()
    .then((res) => {
      this.history = res.data.logs
    })
    .catch((err) => {
      console.log(err.msg)
    })
  }
}
</script>
