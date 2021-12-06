<template>
  <b-container class="mt-5">
    <div class="posts m10">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-card title="Parking Masuk">
              <b-table striped hover :items="parkingIn">
                <template v-slot:cell(time)="data" >
                  {{ data.item.time | getDate }}
                </template>
              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Parking Keluar">
              <b-table striped hover :items="parkingOut">
              <template v-slot:cell(time)="data" >
                  {{ data.item.time | getDate }}
                </template>
              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Pengguna">
              <b-table striped hover :items="users"></b-table>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
import rmq from '../message_brokers/mqtt'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
export default {
  data () {
    return {
      parkingIn: [],
      parkingOut: [],
      users: []
    }
  },
  beforeCreate: function () {
    rmq.on('connect', function () {
      rmq.subscribe('gate-fallback')
    })
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    filldata: function () {
      const ini = this
      rmq.on('message', function (topic, message) {
        const data = message.toString().split('#')
        console.log(data)

        if (data[3] === 'gate-open') {
          ini.parkingIn.push({ rfid: data[0], nama: data[1], time: data[2] })
        }

        if (data[3] === 'gate-close') {
          ini.parkingOut.push({ rfid: data[0], nama: data[1], time: data[2] })
        }
      })
    }
  },
  mounted: function () {
    this.filldata()
  }
}
</script>
