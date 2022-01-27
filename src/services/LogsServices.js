import Api from '@/services/Api'

export default {
  getLogsLimit () {
    return Api().get('/getLogsLimit')
  },
  getLogs () {
    return Api().get('/getLogs')
  },
  openManualOpen (guid) {
    return Api().post('/gateOpen', guid)
  },
  openManualClose (guid) {
    return Api().post('/gateClose', guid)
  }
}
