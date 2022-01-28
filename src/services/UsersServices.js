import Api from '@/services/Api'

export default {
  getUsers () {
    return Api().get('/getUsers')
  },
  addUsers () {
    return Api().get('/addUsers')
  }
}
