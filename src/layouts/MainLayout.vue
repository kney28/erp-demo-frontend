<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title>ERP HOSPITALARIO</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="logout"
        />
      </q-toolbar>
      <br>
      <!-- <q-separator /> -->
      <!-- <q-toolbar class="bg-grey-3">
        <q-tabs class="text-grey"
          active-color="primary"
          indicator-color="grey"
          v-model="tabs"
          shrink
          stretch
          align="justify"
          shadow-2
          narrow-indicator
          >
          <q-route-tab v-for="tab in tabs" :key="tab.name" v-bind="tab"
            label:tab.label
            to:tab.url
            exact
          >
            <q-btn icon="close" size="xs" flat round dense @click="onClose()" />
          </q-route-tab>
            <q-route-tab
              label="Terceros"
              to="/thirds"
              exact
            >
              <q-btn icon="close" size="xs" flat round dense @click="onClose()" />
            </q-route-tab>

            <q-route-tab
              label="Usuarios"
              to="/users"
              exact
            >
              <q-btn icon="close" size="xs" flat round dense @click="onClose()" />
            </q-route-tab>
        </q-tabs>
      </q-toolbar> -->
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>Menú Principal</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>

                <q-item-section>
                  Inicio
                </q-item-section>
              </q-item>
              <q-expansion-item
                expand-separator
                icon="settings"
                label="Configuración general">
                <q-item
                  active-class="tab-active"
                  to="/profiles"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="account_circle" />
                  </q-item-section>

                  <q-item-section>
                    Perfiles
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/users"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>

                  <q-item-section>
                    Usuarios
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/countries"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="domain_add" />
                  </q-item-section>

                  <q-item-section>
                    Países
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/departments"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="location_city" />
                  </q-item-section>

                  <q-item-section>
                    Departamentos
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/municipalities"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="corporate_fare" />
                  </q-item-section>

                  <q-item-section>
                    Municipios
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/neighborhoods"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="home_work" />
                  </q-item-section>

                  <q-item-section>
                    Barrios
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/thirds"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="group" />
                  </q-item-section>

                  <q-item-section>
                    Terceros
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/validities"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="verified_user" />
                  </q-item-section>

                  <q-item-section>
                    Vigencias
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/companies"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="store" />
                  </q-item-section>

                  <q-item-section>
                    Compañias
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/changePasswords"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="change_circle" />
                  </q-item-section>

                  <q-item-section>
                    Cambiar de contraseña
                  </q-item-section>
                </q-item>

                <q-expansion-item
                expand-separator
                icon="sync_alt"
                label="Log de auditoría">
                <q-item
                  active-class="tab-active"
                  to="/logsChangePasswords"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="published_with_changes" />
                  </q-item-section>

                  <q-item-section>
                    Cambios de contraseña
                  </q-item-section>
                </q-item>
                <q-item
                  active-class="tab-active"
                  to="/logsAudits"
                  exact
                  class="q-ma-sm navigation-item"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="history" />
                  </q-item-section>

                  <q-item-section>
                    Logs de auditoria
                  </q-item-section>
                </q-item>
                </q-expansion-item>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="receipt_long"
                label="Contabilidad">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="real_estate_agent"
                label="Bienes">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="price_check"
                label="Ingresos">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="medical_services"
                label="Citas médicas">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="contact_mail"
                label="Contratación">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="credit_card"
                label="Facturación">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="description"
                label="Historias clínicas">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="medication_liquid"
                label="Hospitalización">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="calculate"
                label="Nómina">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="shopping_cart"
                label="Presupuesto">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="checklist"
                label="Tesorería">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="inventory"
                label="Inventarios">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="work"
                label="Cuentas por cobrar">
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="payments"
                label="Cuentas por pagar">
              </q-expansion-item>

            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const left = ref(false)
    const $q = useQuasar()
    const router = useRouter()
    // const tabsDefinition = []
    // const tabs = ref(tabsDefinition.slice(0, 1))

    const auth = useAuthStore()
    const { token } = storeToRefs(auth)

    const logout = () => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea cerrar sesión?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        token.value = null
        $q.cookies.remove('token')
        router.push({ name: 'login' })
      })
    }

    // const onClose = () => {
    //   console.log('Prueba')
    // }

    // const setTabSelected = (url, title) => {
    //   console.log(url)
    //   console.log(title)
    //   tabs.value.push({ to: url, label: title, name: title })
    //   console.log(tabs.value)
    // }

    return {
      left,
      logout
      // tabs,
      // onClose,
      // tabsDefinition.
      // setTabSelected
    }
  }
})
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url("/images/lake.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: green;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
