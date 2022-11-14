import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Loading, QSpinnerBall } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
axios.defaults.baseURL = process.env.API // se obtiene de quasar.conf.js
const api = axios.create({ baseURL: process.env.API })

export default boot(({ app }) => {
  api.defaults.withCredentials = true
  api.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  api.interceptors.request.use((config) => {
    Loading.show({
      spinner: QSpinnerBall
    })
    config.headers.authorization = `JWT ${localStorage.getItem('token')}`
    return config
  })

  api.interceptors.response.use((response) => {
    Loading.hide()
    const methodsMessages = ['post', 'put', 'delete']
    if (methodsMessages.includes(response.config.method)) {
      Loading.hide()
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        position: 'bottom-center',
        icon: 'success',
        title: 'Proceso exitoso',
        showConfirmButton: false,
        timer: 1500
      })
    }
    return response
  }, (error) => {
    Loading.hide()
    const errors = Object.entries(error.response.data)
    let str = ''
    if (error.response.status === 401) errors[0][1] = 'Usuario o contraseña inválidos.'
    for (let i = 0; i < errors.length; i += 1) {
      str += `${errors[i][1]} <br>`
    }
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '<strong>ADVERTENCIA<u></u></strong>',
      icon: 'error',
      html: str,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Aceptar',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
