import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Loading, QSpinnerBall } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
axios.defaults.baseURL = process.env.API // se obtiene de quasar.conf.js
const api = axios.create({ baseURL: process.env.API })

export default boot(({ app, store, router }) => {
  const auth = useAuthStore(store)
  api.defaults.withCredentials = true
  api.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  api.interceptors.request.use((config) => {
    Loading.show({
      spinner: QSpinnerBall
    })
    config.headers.authorization = `Bearer ${auth.token}`
    return config
  })

  api.interceptors.response.use((response) => {
    Loading.hide()
    const methodsMessages = ['post', 'put', 'delete']
    if (methodsMessages.includes(response.config.method)) {
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
    if (error.response.status === 401) errors[0][1] = 'Usuario o contraseña inválidos.'
    router.push({ name: 'login' })
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '<strong>ADVERTENCIA<u></u></strong>',
      icon: 'error',
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
