<template>
  <b-container class="mt-5">
    <div class="posts m10">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-card title="Parking Masuk">
              <b-table striped hover :items="parkingIn" :fields="fieldsParkingIn">
                <template v-slot:cell(time_in)="data" >
                  {{ data.item.time_in }}
                </template>
              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Parking Keluar">
              <b-table striped hover :items="parkingOut" :fields="fieldsParkingOut">
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
      parkingIn: [],
      parkingOut: [],
      fieldsParkingOut: [
        {
          key: 'kode_rfid'
        },
        {
          key: 'nama'
        },
        {
          key: 'jam_keluar'
        }
      ],
      fieldsParkingIn: [
        {
          key: 'kode_rfid'
        },
        {
          key: 'nama'
        },
        {
          key: 'jam_masuk'
        }
      ]
    }
  },
  beforeCreate: function () {
    rmq.on('connect', function () {
      rmq.subscribe('gate-fallback', function (err) {
        console.log(err)
      })
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
        const decoded = new TextDecoder('utf-8').decode(message)
        const data = decoded.toString().split('#')
        if (data[3] === 'gate-open') {
          ini.parkingIn.push({ kode_rfid: data[0], nama: data[1], jam_masuk: data[2] })
        }

        if (data[3] === 'gate-close') {
          ini.parkingOut.push({ kode_rfid: data[0], nama: data[1], jam_keluar: data[2] })
        }
      })
    },
    getLogs: async function () {
      try {
        const response = await LogsService.getLogsLimit()
        response.data.data.forEach(log => {
          if (log.jam_keluar !== null) {
            this.parkingIn.push(log)
          } else {
            this.parkingOut.push(log)
          }
        })
      } catch (error) {
        this.parkingIn = []
        this.parkingOut = []
      }
    }
  },
  mounted () {
    this.filldata()
    // this.getLogs()
  }
}
</script>
