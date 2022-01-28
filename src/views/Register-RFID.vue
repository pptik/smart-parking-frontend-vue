<template>
<b-container>
  <div role="group">
    <b-form  v-on:submit.prevent="onSubmit" >
      <label for="input-live" md="3">Name:</label>
      <b-form-input
        md="3"
        id="input-live"
        v-model="form.name"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter your name"
        trim
      ></b-form-input>
      <label for="input-live" md="3">Register Card RFID</label>
      <b-form-input
        md="3"
        id="input-fire"
        disabled
        v-model="form.kode_rfid"
        trim
      ></b-form-input>
    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input--feedback">
      Enter at least 50 letters
    </b-form-invalid-feedback>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <!-- This is a form text block (formerly known as help block) -->
  </div>
</b-container>
</template>

<script>
import rmq from '../message_brokers/mqtt'
import UsersService from '../services/UsersServices'
export default {
  data () {
    return {
      users: [],
      form: {
        name: '',
        kode_rfid: ''
      }
    }
  },
  beforeCreate: function () {
    rmq.on('connect', function () {
      rmq.subscribe('RFID-Open')
    })
  },
  methods: {
    onSubmit: async function () {
      const users = await UsersService.addUsers(this.form)
      console.log(users)
      this.$router.push({ path: '/' })
    },
    filldata: function () {
      const ini = this
      rmq.on('message', function (topic, message) {
        const data = message.toString().split('#')
        console.log(message.toString().split('#'))
        console.log(data[1])
        ini.form.kode_rfid = data[1]
      })
    }
  },
  mounted () {
    this.filldata()
  }
}
</script>
