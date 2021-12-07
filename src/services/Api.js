import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5019/'
})

export default () => {
  return instance
}
