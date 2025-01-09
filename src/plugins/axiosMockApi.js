import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://677c8c3d4496848554c6c7c0.mockapi.io/api/v1/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})
export default instance
