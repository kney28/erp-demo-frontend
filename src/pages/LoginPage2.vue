<style>
@font-face {
  font-family: quicksand;
  src: url(../fonts/Quicksand.ttf);
}
@font-face {
  font-family: poppins-bold;
  src: url(../fonts/Poppins-Bold.ttf);
}
@font-face {
  font-family: poppins-regular;
  src: url(../fonts/Poppins-Regular.ttf);
}
.font-poppins-regular{
  font-family: 'poppins-regular';
}
.font-poppins-bold{
  font-family: 'poppins-bold';
}
/*Prevent the web browser styles*/
.input-login:-webkit-autofill,
.input-login:-webkit-autofill:hover,
.input-login:-webkit-autofill:focus {
  -webkit-text-fill-color: #31b0dd;
  -webkit-box-shadow: 0 0 0px 40rem #ffff inset;
}
.input-login{
  height: 25px;
}
</style>
<template>
  <div class="row items-start q-col-gutter-sm fit wrap justify-center content-center">
    <div class="col-12 col-md-8" style="min-width: 300px;">
      <div>
        <q-img
          src="images/hospital.jpeg"
          style="position: relative; width: 100%; height: 100vh"
        >
          <div class="fullscreen" style="z-index: 500;">
            <div class="absolute-center justify-center fixed-left">
              <div class="text-h4 text-weight-bolder">
                ¡Bienvenid@!
              </div>
              <div class="text-h5 q-mt-sm font-poppins-regular" style="text-shadow:3px 5px 6px #000; text-align: justify;">
                Aquí encontraras todas las herramientas que necesitas para gestionar
                todos los aspectos administrativos de tu hospital
              </div>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div class="col-12 col-md-4" style="min-width: 300px;">
      <div>
        <q-card-section>
          <div class="text-center" v-if="logo">
            <br><br>
            <q-img
              :src="logo"
              width="200px"
            />
          </div>
          <div class="text-center" v-else>
            <br><br>
            <q-icon
              name="fa-solid fa-stethoscope"
              size="70px"
              style="color: #12506A"
              class="q-mb-lg"
            />
          </div>
          <div>
            <p style="color: #60818E; font-size: 20px; font-weight: bolder;" class="text-center q-mb-xs"></p>
            <p style="color: #12506A; font-size: 30px; font-weight: bolder;" class="text-center q-mb-lg">{{ companyName }}</p>
          </div>
          <div class="col text-h6 text-center font-poppins-bold" style="color: #12506A; font-weight:bold">
            Iniciar sesión
          </div>
        </q-card-section>
        <q-card-section style="padding: 0 18% 0 18%;">
          <form class="q-form q-gutter-md">
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Usuario</label>
              <q-input
                v-model="username"
                placeholder="Ej. will2023"
                lazy-rules
                rounded
                outlined
                :input-style="{marginTop: '15px'}"
                :input-class="{'input-login': 'a'}"
                class="font-poppins-regular"
              />
            </div>
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Constraseña</label>
              <q-input
                type="password"
                v-model="password"
                placeholder="Ingresa tu contraseña..."
                lazy-rules
                rounded
                outlined
                :input-style="{marginTop: '15px'}"
                :input-class="{'input-login': 'a'}"
                class="font-poppins-regular"
                @keydown.enter.prevent="login"
              />
            </div>
            <div class="text-right font-poppins-bold q-mt-sm" style="color: #2fc1ff; font-size: 12px;">
              Recuperar contraseña
            </div>
            <div>
              <q-btn
                label="Iniciar sesión"
                @click="login"
                lazy-rules
                rounded
                class="full-width font-poppins-bold q-mt-md"
                no-caps
                size="lg"
                style="background: #2fc1ff; color: white;"
              />
            </div>
            <div class="q-mt-lg">
              <p class="text-center font-poppins-regular q-mb-xs" style="font-size: 11px;">¿Necesitas usuario para ingresar?</p>
              <p class="text-center font-poppins-bold" style="color: #2fc1ff; font-size: 16px;">Solicitalo aquí</p>
            </div>
          </form>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
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
    const rows = ref([])
    const { token, userName, companyName, logo, role } = storeToRefs(auth)

    onMounted(() => {
      getCompany()
    })

    const getCompany = async () => {
      api.get('/company').then(response => {
        rows.value = response.data
        $q.cookies.set('companyName', rows.value[0].name)
        companyName.value = rows.value[0].name
        if (rows.value[0].logo) {
          $q.cookies.set('logo', rows.value[0].logo + `?t=${(new Date()).getTime()}`)
          logo.value = rows.value[0].logo + `?t=${(new Date()).getTime()}`
        } else {
          $q.cookies.set('logo', null)
          logo.value = null
        }
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      })
    }

    const login = () => {
      api.post('auth/login/', {
        username: username.value,
        password: password.value
      }).then(({ data }) => {
        if (data.access_token) {
          $q.cookies.set('token', data.access_token)
          token.value = data.access_token
          $q.cookies.set('userName', data.usuario.name.toUpperCase())
          userName.value = data.usuario.name.toUpperCase()
          $q.cookies.set('role', data.usuario.role.code)
          role.value = data.usuario.role.code
          $router.push({ name: 'index' })
        }
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      })
    }

    return {
      username,
      password,
      login,
      companyName,
      logo
    }
  }
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
