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
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="logout"
        />
      </q-toolbar>
      <br>
      <q-separator />
      <q-toolbar class="bg-grey-3">
        <q-tabs class="text-grey"
          active-color="primary"
          indicator-color="grey"
          shrink
          stretch
          align="justify"
          shadow-2
          narrow-indicator
          >
          <q-route-tab v-for="(tab, id) in tabsDefinition" :label="tab.title" :key="id" v-bind="tab"
            :to="tab.url"
            exact
          >
            <q-btn icon="close" size="xs" flat round dense @click="onClose(id)" />
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-grey-8"
      show-if-above
      v-model="left"
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
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="icon"/>
            </q-avatar>

            <q-toolbar-title>Hospital XYZ</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                @click="setTabSelected('/', 'Inicio')"
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
                label="Configuración">
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">
                  <q-item
                    @click="setTabSelected('/profiles', 'Perfiles')"
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
                    @click="setTabSelected('/users', 'Usuarios')"
                    to="/users"
                    active-class="tab-active"
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
                    @click="setTabSelected('/neighborhoods', 'Barrios')"
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
                    @click="setTabSelected('/thirds', 'Terceros')"
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
                    @click="setTabSelected('/validities', 'Vigencias')"
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
                    @click="setTabSelected('/companies', 'Compañias')"
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
                    @click="setTabSelected('/configuration/holidays', 'Días festivos')"
                    active-class="tab-active"
                    to="/configuration/holidays"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="celebration" />
                    </q-item-section>

                    <q-item-section>
                      Días festivos
                    </q-item-section>
                  </q-item>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  icon="account_tree"
                  label="Procedimientos">
                  <q-item
                    @click="setTabSelected('/changePasswords', 'Cambiar de contraseña')"
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
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  icon="analytics"
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  label="Reportes">
                  <q-item
                    @click="setTabSelected('/logsAudits', 'Logs de auditoría')"
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
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">

                  <q-item
                    @click="setTabSelected('/accountingSettings', 'Configuración general')"
                    active-class="tab-active"
                    to="/accountingSettings"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="settings_applications" />
                    </q-item-section>

                    <q-item-section>
                      Configuración general
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/thirdsAccountants', 'Terceros contables')"
                    active-class="tab-active"
                    to="/thirdsAccountants"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="groups" />
                    </q-item-section>

                    <q-item-section>
                      Terceros contables
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/accountingTerms', 'Vigencias contables')"
                    active-class="tab-active"
                    to="/accountingTerms"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="fact_check" />
                    </q-item-section>

                    <q-item-section>
                      Vigencias contables
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/typeSeats', 'Tipos de asientos')"
                    active-class="tab-active"
                    to="/typeSeats"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="collections_bookmark" />
                    </q-item-section>

                    <q-item-section>
                      Tipos de asientos
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/accountCatalog', 'Catálogo de cuentas')"
                    active-class="tab-active"
                    to="/accountCatalog"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="receipt_long" />
                    </q-item-section>

                    <q-item-section>
                      Catálogo de cuentas
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/retentionConcept', 'Conceptos de retención')"
                    active-class="tab-active"
                    to="/retentionConcept"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="format_list_numbered" />
                    </q-item-section>

                    <q-item-section>
                      Conceptos de retención
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/costCenter', 'Centros de costo')"
                    active-class="tab-active"
                    to="/costCenter"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="vertical_align_center" />
                    </q-item-section>

                    <q-item-section>
                      Centros de costo
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/accountBalance', 'Saldo de cuentas')"
                    active-class="tab-active"
                    to="/accountBalance"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="account_balance" />
                    </q-item-section>

                    <q-item-section>
                      Saldo de cuentas
                    </q-item-section>
                  </q-item>

                  <q-item
                    @click="setTabSelected('/openingBalances', 'Saldos iniciales')"
                    active-class="tab-active"
                    to="/openingBalances"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="balance" />
                    </q-item-section>

                    <q-item-section>
                      Saldos iniciales
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  icon="account_tree"
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  label="Procedimientos">
                    <q-item
                      @click="setTabSelected('/accountingEntries', 'Asientos contables')"
                      active-class="tab-active"
                      to="/accountingEntries"
                      exact
                      class="q-ma-sm navigation-item"
                      clickable
                      v-ripple
                    >
                      <q-item-section avatar>
                        <q-icon name="account_balance_wallet" />
                      </q-item-section>

                      <q-item-section>
                        Asientos contables
                      </q-item-section>
                    </q-item>

                    <q-item
                      @click="setTabSelected('/monthlyClosure', 'Cierres mensuales')"
                      active-class="tab-active"
                      to="/monthlyClosure"
                      exact
                      class="q-ma-sm navigation-item"
                      clickable
                      v-ripple
                    >
                      <q-item-section avatar>
                        <q-icon name="lock" />
                      </q-item-section>

                      <q-item-section>
                        Cierres mensuales
                      </q-item-section>
                    </q-item>

                    <q-item
                      @click="setTabSelected('/monthlyOpening', 'Apertura mensual')"
                      active-class="tab-active"
                      to="/monthlyOpening"
                      exact
                      class="q-ma-sm navigation-item"
                      clickable
                      v-ripple
                    >
                      <q-item-section avatar>
                        <q-icon name="lock_open" />
                      </q-item-section>

                      <q-item-section>
                        Apertura mensual
                      </q-item-section>
                    </q-item>

                    <q-item
                      @click="setTabSelected('/yearSeatClosure', 'Asiento cierre anual')"
                      active-class="tab-active"
                      to="/yearSeatClosure"
                      exact
                      class="q-ma-sm navigation-item"
                      clickable
                      v-ripple
                    >
                      <q-item-section avatar>
                        <q-icon name="lock" />
                      </q-item-section>

                      <q-item-section>
                        Asiento cierre anual
                      </q-item-section>
                    </q-item>

                    <q-item
                      @click="setTabSelected('/yearClosure', 'Cierre anual')"
                      active-class="tab-active"
                      to="/yearClosure"
                      exact
                      class="q-ma-sm navigation-item"
                      clickable
                      v-ripple
                    >
                      <q-item-section avatar>
                        <q-icon name="lock" />
                      </q-item-section>

                      <q-item-section>
                        Cierre anual
                      </q-item-section>
                    </q-item>

                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  icon="analytics"
                  label="Reportes">
                </q-expansion-item>
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
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">
                  <q-item
                    @click="setTabSelected('/admissions/healthproviders', 'Prestadores de salud')"
                    active-class="tab-active"
                    to="/admissions/healthproviders"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="fa-solid fa-stethoscope" />
                    </q-item-section>

                    <q-item-section>
                      Prestadores de salud
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/headquarters', 'Sedes')"
                    active-class="tab-active"
                    to="/admissions/headquarters"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="apartment" />
                    </q-item-section>

                    <q-item-section>
                      Sedes
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/occupations', 'Ocupaciones')"
                    active-class="tab-active"
                    to="/admissions/occupations"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="diversity_3" />
                    </q-item-section>

                    <q-item-section>
                      Ocupaciones
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/charges', 'Cargos')"
                    active-class="tab-active"
                    to="/admissions/charges"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="business_center" />
                    </q-item-section>

                    <q-item-section>
                      Cargos
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/groundsdenialcares', 'Causales de negación')"
                    active-class="tab-active"
                    to="/admissions/groundsdenialcares"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="report" />
                    </q-item-section>

                    <q-item-section>
                      Causales de negación
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/sisbenlevels', 'Niveles del Sisbén')"
                    active-class="tab-active"
                    to="/admissions/sisbenlevels"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="fa-solid fa-stairs" />
                    </q-item-section>

                    <q-item-section>
                      Niveles del Sisbén
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/admissions/specialpopulations', 'Población Especial')"
                    active-class="tab-active"
                    to="/admissions/specialpopulations"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="fa-solid fa-people-group" />
                    </q-item-section>

                    <q-item-section>
                      Población especial
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
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
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">
                  <q-item
                    @click="setTabSelected('/hiring/groupsCUPS', 'Grupos CUPS')"
                    active-class="tab-active"
                    to="/hiring/groupsCUPS"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="medical_services" />
                    </q-item-section>

                    <q-item-section>
                      Grupos CUPS
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="credit_card"
                label="Facturación">
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">
                  <q-item
                    @click="setTabSelected('/billing/careservices', 'Servicios de atención')"
                    active-class="tab-active"
                    to="/billing/careservices"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="medical_services" />
                    </q-item-section>

                    <q-item-section>
                      Servicios de atención
                    </q-item-section>
                  </q-item>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  icon="account_tree"
                  label="Procedimientos">
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  icon="analytics"
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  label="Reportes">
                </q-expansion-item>
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
                <q-expansion-item
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  expand-separator
                  icon="engineering"
                  label="Maestros">
                  <q-item
                    @click="setTabSelected('/hospitalization/floors', 'Pisos')"
                    active-class="tab-active"
                    to="/hospitalization/floors"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="domain" />
                    </q-item-section>

                    <q-item-section>
                      Pisos
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/hospitalization/locations', 'Ubicación')"
                    active-class="tab-active"
                    to="/hospitalization/locations"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="bedroom" />
                    </q-item-section>

                    <q-item-section>
                      Ubicación
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/hospitalization/beds', 'Camas')"
                    active-class="tab-active"
                    to="/hospitalization/beds"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="bed" />
                    </q-item-section>

                    <q-item-section>
                      Camas
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="setTabSelected('/hospitalization/fees', 'Tarifas de servicio')"
                    active-class="tab-active"
                    to="/hospitalization/fees"
                    exact
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="sell" />
                    </q-item-section>

                    <q-item-section>
                      Tarifas de servicio
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  icon="account_tree"
                  label="Procedimientos">
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  icon="analytics"
                  :header-inset-level="0.5"
                  :content-inset-level="1"
                  label="Reportes">
                </q-expansion-item>
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
    const tabsDefinition = ref([])

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

    const setTabSelected = (urls, titles) => {
      tabsDefinition.value.push({
        url: urls,
        title: titles
      })
    }

    const onClose = (id) => {
      tabsDefinition.value.splice(id, 1)
    }

    return {
      left,
      logout,
      onClose,
      tabsDefinition,
      setTabSelected
    }
  }
})
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(255, 255, 255, 0);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: #3BA3BC;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(21, 57, 102) 15%,
    rgb(00, 128, 128) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
