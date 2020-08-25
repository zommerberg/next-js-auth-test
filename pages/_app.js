import '../styles/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      return axios.post('/refresh_token').then(res => {
        if (res.status === 201) {
          return axios(originalRequest)
        }
      })
    }

    if (error.response.status === 403) {
      window.location.replace('/')
    }
    return Promise.reject(error)
  }
)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
