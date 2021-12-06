<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import rmq from '../message_brokers/mqtt'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      arraydata: []
    }
  },
  beforeCreate: function () {
    rmq.on('connect', function () {
      rmq.subscribe('VD-Open', function (err) {
        if (!err) {
          console.log('Subscribe to RMQ PPTIK Success s')
        } else {
          console.log(err)
        }
      })
    })
  },
  methods: {
    filldata: function () {
      rmq.on('message', function (topic, message) {
        console.log(message.toString())
        const arrayData = message.toString().split('#')
        this.arraydata = arrayData
      })
    }
  },
  mounted: function () {
    this.filldata()
  }
}
</script>
