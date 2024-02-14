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
const api = axios.create({ baseURL: process.env.BASEURL })

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
    const propSwal = {
      customClass: {
        container: 'my-swal'
      },
      title: '<strong>ADVERTENCIA<u></u></strong>',
      icon: 'error',
      html: errors[0][1],
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Aceptar',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    }
    if (error.response.status === 401) {
      errors[0][1] = 'Acceso no autorizado, por favor validar credenciales.'
      router.push({ name: 'login' })
      Swal.fire(propSwal)
    } else if (error.response.status === 500) {
      errors[0][1] = 'Error de servidor, por favor intente de nuevo.'
      // router.push({ name: 'index' })
      Swal.fire(propSwal)
    }
    return Promise.reject(errors[0][1])
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
