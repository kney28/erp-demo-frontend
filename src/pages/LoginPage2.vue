<template>
  <div class="q-pa-md row q-col-gutter-sm fit wrap justify-center items-center content-center">
    <div class="col-8">
      <q-card class="my-card">
        <q-img src="images/hospital.jpg">
          <div class="fullscreen">
            <div class="absolute-center justify-center fixed-left">
              <div class="text-h5 text-weight-bolder">
                ¡Bienvenid@!
              </div>
              <div class="text-h6 q-mt-sm">
                Aquí encontraras todas las herramientas que necesitas para gestionar
                todos los aspectos administrativos de tu hospital
              </div>
            </div>
          </div>
        </q-img>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="my-card" flat>
        <q-img src="images/logo.png"></q-img>
        <q-card-section>
          <div class="col text-h4 text-weight-bold ellipsis text-grey-10">
            Iniciar sesión
          </div>
        </q-card-section>
        <q-card-section>
          <form class="q-form q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="Usuario"
              lazy-rules
            />
            <q-input
              type="password"
              filled
              v-model="password"
              label="Contraseña"
              lazy-rules
            />
            <div>
              <q-btn
                label="Iniciar Sesión"
                @click="login"
                color="primary"
              />
            </div>
          </form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const $router = useRouter()
    const $q = useQuasar()
    const username = ref(null)
    const password = ref(null)
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)

    const login = () => {
      api.post('auth/login/', {
        username: username.value,
        password: password.value
      }).then(({ data }) => {
        $q.cookies.set('token', data.access_token)
        token.value = data.access_token
        $router.push({ name: 'index' })
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      })
    }

    return {
      username,
      password,
      login
    }
  }
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
