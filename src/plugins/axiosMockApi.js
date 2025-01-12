import axios from 'axios'

const base = 'https://677c8c3d4496848554c6c7c0.mockapi.io/api/v1/'

const instance = axios.create({
  baseURL: base,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

const instance2 = axios.create({
  baseURL: base,
  timeout: 10000,
})

export default { instance, instance2 }
