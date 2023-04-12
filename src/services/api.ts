import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

api.interceptors.response.use(
  function (response) {
    console.log(response)
    return response
  },
  function (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        console.log(error.response?.status)
        throw new Error('Erro no servidor.')
      }

      if (error.response?.status === 401) {
        console.log(error.response?.status)
        throw new Error('Não autorizado.')
      }
    }

    return Promise.reject(error)
  }
)
