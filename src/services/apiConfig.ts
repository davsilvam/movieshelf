import axios from 'axios'

export function Api() {
  return axios.create({ baseURL: 'https://api.themoviedb.org/3' })
}
