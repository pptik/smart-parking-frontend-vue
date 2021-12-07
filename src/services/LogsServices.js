import Api from '@/services/Api'

export default {
  getLogsLimit () {
    return Api().get('/getLogsLimit')
  },
  getLogs () {
    return Api().get('/getLogs')
  }
}
