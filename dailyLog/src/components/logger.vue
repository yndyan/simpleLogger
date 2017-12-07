<template>
  <div class="logger">
    <h1>Logger page</h1>
 
    <form action="">
      <div  v-for="(item, key) in items" :key="key">
        <input type="radio"  v-bind:value="key" v-model="picked">{{item}}
      </div>
      </br>
      <input type="submit" v-on:click="onSubmit()">
    </form>  
  </div>
</template>

<script>

import loggerS from '../services/loggerS'
import router from '../router'

export default {
  name: 'logger',
  data () {
    return {
      items: [],
      picked: Number
    }
  },
  methods: {
    onSubmit: function () {
      console.log(Number.isInteger(this.picked))
      if (Number.isInteger(this.picked)) {
        const logDateObject = new Date() // TODO use moment library, this is breaking functional programming paradigme
        logDateObject.setHours(0, 0, 0, 0)
        loggerS.getHistory({ logDate: logDateObject.toISOString() })
        .then((res) => {
          const params = new URLSearchParams()
          params.append('logId', this.picked)
          if (res.data.logs.length > 0) {
            params.append('_id', res.data.logs[0]._id)
            return loggerS.updateData(params)
          } else {
            params.append('logDate', logDateObject.toISOString())
            return loggerS.sendData(params)
          }
        })
        .then((data) => {
          router.push('/history')
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  },
  beforeMount () {
    loggerS.getData(this)
    .then((res) => {
      this.items = res.data.logs
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
</script>
