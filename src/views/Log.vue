<template>
  <b-container class="mt-5">
    <div class="posts m10">
      <b-container class="bv-example-row">
        <b-row class="mt-5">
          <b-col>
            <b-card title="Logs">
              <b-table striped hover :items="logs" :fields="fields">
                <template v-slot:cell(time_in)="data" >
                  {{ data.item.time_in }}
                </template>
                <template v-slot:cell(time_out)="data" >
                  {{ data.item.time_out }}
                </template>
              </b-table>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
import rmq from '../message_brokers/mqtt'
import LogsService from '../services/LogsServices'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
export default {
  data () {
    return {
      logs: [],
      fields: [
        {
          key: 'kode_rfid'
        },
        {
          key: 'nama'
        },
        {
          key: 'jam_masuk'
        },
        {
          key: 'jam_keluar'
        }
      ]
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
        if (data[3] === 'gate-open') {
          ini.parkingIn.push({ rfid: data[0], username: data[1], time_in: data[2] })
        }

        if (data[3] === 'gate-close') {
          ini.parkingOut.push({ rfid: data[0], username: data[1], time_out: data[2] })
        }
      })
    },
    getLogs: async function () {
      try {
        const response = await LogsService.getLogs()
        this.logs = response.data.data
        console.log(this.logs)
      } catch (error) {
        this.logs = []
      }
    }
  },
  mounted () {
    this.filldata()
    this.getLogs()
  }
}
</script>
