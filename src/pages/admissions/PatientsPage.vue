<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Patient"
            :rows="dataPatients" :filter="filter" :columns="columns" row-key="name">
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar" />
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="code" :props="props">
                  {{ props.row.code }}
                </q-td>
                <q-td key="documettype" :props="props">
                  {{ documettypeOptions[props.row.documettype - 1].description }}
                </q-td>
                <q-td key="documentnumber" :props="props">
                  {{ props.row.documentnumber }}
                </q-td>
                <q-td key="name1" :props="props">
                  {{ props.row.name1 }}
                </q-td>
                <q-td key="name2" :props="props">
                  {{ props.row.name2 }}
                </q-td>
                <q-td key="lastname1" :props="props">
                  {{ props.row.lastname1 }}
                </q-td>
                <q-td key="lastname2" :props="props">
                  {{ props.row.lastname2 }}
                </q-td>
                <q-td key="fullname" :props="props">
                  {{ props.row.fullname }}
                </q-td>
                <q-td key="neighborhood" :props="props">
                  {{ props.row.neighborhood.code }} - {{ props.row.neighborhood.description }}
                </q-td>
                <q-td key="municipality" :props="props">
                  {{ props.row.neighborhood.municipality.code }} - {{ props.row.neighborhood.municipality.description }}
                </q-td>
                <q-td key="country" :props="props">
                  {{ props.row.country }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="datebirth" :props="props">
                  {{ props.row.datebirth }}
                </q-td>
                <q-td key="age" :props="props">
                  {{ props.row.age }}
                </q-td>
                <q-td key="sex" :props="props">
                  {{ sexOptions[props.row.sex - 1].description }}
                </q-td>
                <q-td key="maritalstatus" :props="props">
                  {{ maritalstatusOptions[props.row.maritalstatus - 1].description }}
                </q-td>
                <q-td key="charge" :props="props">
                  {{ props.row.charge.description }}
                </q-td>
                <q-td key="occupation" :props="props">
                  {{ props.row.occupation.description }}
                </q-td>
                <q-td key="mothername" :props="props">
                  {{ props.row.mothername }}
                </q-td>
                <q-td key="fathername" :props="props">
                  {{ props.row.fathername }}
                </q-td>
                <q-td key="regimetype" :props="props">
                  {{ regimetypeOptions[props.row.regimetype - 1].description }}
                </q-td>
                <q-td key="contributortype" :props="props">
                  {{ contributortypeOptions[props.row.contributortype].description }}
                </q-td>
                <q-td key="kinship" :props="props">
                  {{ kinshipOptions[props.row.kinship].description }}
                </q-td>
                <q-td key="copgovfee" :props="props">
                  {{ props.row.copgovfee.code }} - {{ props.row.copgovfee.description }}
                </q-td>
                <q-td key="sisbenlevel" :props="props">
                  {{ props.row.sisbenlevel.code }} - {{ props.row.sisbenlevel.description }}
                </q-td>
                <q-td key="benefitplan" :props="props">
                  {{ props.row.benefitplan }}
                </q-td>
                <q-td key="menbership" :props="props">
                  {{ props.row.menbership }}
                </q-td>
                <q-td key="specialpopulation" :props="props">
                  {{ props.row.specialpopulation.code }} - {{ props.row.specialpopulation.description }}
                </q-td>
                <q-td key="patientaddress" :props="props">
                  {{ props.row.patientaddress }}
                </q-td>
                <q-td key="phone" :props="props">
                  {{ props.row.phone }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editing(props.row)" />
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDelete(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </transition>
      <q-inner-loading :showing="visible">
        <q-spinner-pie color="primary" size="70px" />
      </q-inner-loading>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-linear-progress :value="10" color="blue" />
        <q-card-section class="row items-center">
          <div class="text-h6"> </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-banner class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="warning" color="warning" />
          </template>
          Los campos marcados con (*) son obligatorios
        </q-banner>
        <q-card-section>
          <q-form ref="myForm" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-md-12"><h6 class="text-center text-primary">Información personal<hr></h6></div>
              <div class="col-md-4">
                <q-input white color="blue" :readonly="readonly.documettype" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  :readonly="readonly"
                  white
                  color="blue"
                  v-model="documettype"
                  label="Tipo documento *"
                  :options="documettypeOptions"
                  option-value="id"
                  :option-label="(e) => e.abbrevation + ' - ' + e.description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" :readonly="readonly" v-model="documentnumber" label="Número documento *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input v-on:focusout="completeName(name1,name2,lastname1,lastname2)" white color="blue" v-model="name1" label="Nombre 1" />
              </div>
              <div class="col-md-4">
                <q-input v-on:focusout="completeName(name1,name2,lastname1,lastname2)" white color="blue" v-model="name2" label="Nombre 2" />
              </div>
              <div class="col-md-4">
                <q-input v-on:focusout="completeName(name1,name2,lastname1,lastname2)" white color="blue" v-model="lastname1" label="Apellido 1 *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input v-on:focusout="completeName(name1,name2,lastname1,lastname2)" white color="blue" v-model="lastname2" label="Apellido 2" />
              </div>
              <div class="col-md-4">
                <q-input readonly="" white color="blue" bg-color="blue-grey-2" v-model="fullname" label="Nombre Completo" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                v-model="neighborhood"
                use-input
                hide-selected
                fill-input
                input-debounce="5"
                white
                color="blue"
                label="Barrio *"
                :options="filterOptionsNeighborhood"
                virtual-scroll
                virtual-scroll-slice-size="10"
                @filter="filterNeighborhood"
                :option-value="(e) => [e.id,e.municipality.id]"
                :option-label="(e) =>
                e.code + ' - '
                + e.description + ' - '
                + e.municipality.code + ' - '
                + e.municipality.description + ' - '
                + e.municipality.department.codigo + ' - '
                + e.municipality.department.descripcion"
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                @update:model-value="municipalityFn(neighborhood)"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
               </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="municipality" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                :disable="documettype == 2 ||
                documettype == 3 ||
                documettype == 4 ||
                documettype == 6 ||
                documettype == 10 ||
                documettype == 11||
                documettype == 12 ||
                documettype == 13 ? false : true"
                white
                color="blue"
                v-model="country"
                label="País *"
                @filter="filterCountry"
                :options="filterOptionsCountry"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input type="email" white color="blue" v-model="email" label="Correo electrónico *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio', (val, rules) => rules.email(val) || 'Por favor ingresar una dirección de correo valida' ]" />
              </div>
              <div class="col-md-4">
                <q-input
                filled
                v-model="datebirth"
                white
                color="blue"
                mask="date"
                label="Fecha de nacimiento *"
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="datebirth">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              </div>
              <div class="col-md-4">
                <q-input :readonly="readonly" white color="blue" v-model="age" label="Edad *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="sex"
                  label="Sexo *"
                  :options="sexOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="maritalstatus"
                  label="Estado civil *"
                  :options="maritalstatusOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                white
                color="blue"
                v-model="charge"
                label="Cargo *"
                @filter="filterCharge"
                :options="filterOptionsCharge"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
               </div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                white
                color="blue"
                v-model="occupation"
                label="Ocupación *"
                @filter="filterOccupation"
                :options="filterOptionsOccupation"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
               </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="mothername" :label="!calcularTiempo(datebirth).req ? 'Nombre de la madre' : 'Nombre de la madre '+calcularTiempo(datebirth).req" reactive-rules
                  :rules="[val => (calcularTiempo(datebirth).anios > 17 ?? !!val) || (!!val || 'El campo es obligatorio')]" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="fathername" :label="!calcularTiempo(datebirth).req ? 'Nombre del padre' : 'Nombre del padre '+calcularTiempo(datebirth).req" reactive-rules
                  :rules="[val => (calcularTiempo(datebirth).anios > 17 ?? !!val) || (!!val || 'El campo es obligatorio')]" />
              </div>
              <div class="col-md-12"><h6 class="text-center text-primary">Información de afiliación<hr></h6></div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                white
                color="blue"
                v-model="regimetype"
                label="Tipo de régimen *"
                :options="regimetypeOptions"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  :readonly="readonly"
                  white
                  color="blue"
                  v-model="contributortype"
                  label="Tipo de cotizante *"
                  :options="contributortypeOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  reactive-rules
                  :rules="[ val => (regimetype != 1 ?? !!val) || (!!val || 'El campo es obligatorio')]"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  :readonly="readonly"
                  white
                  color="blue"
                  v-model="kinship"
                  :label="contributortype == 2 ? 'Parentesco *' : 'Parentesco'"
                  :options="kinshipOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  reactive-rules
                  :rules="[ val => (contributortype != 2 ?? !!val) || (!!val || 'El campo es obligatorio')]"
                />
              </div>
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="copgovfee"
                label="Copago y cuota moderadora *"
                @filter="filterCopgovfee"
                :options="filterOptionsCopgovfee"
                option-value="id"
                :option-label="(e)=> e.code + ' - ' + e.description"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
               </div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                white
                color="blue"
                v-model="sisbenlevel"
                label="Nivel del Sisbén *"
                @filter="filterSisbenlevel"
                :options="filterOptionsSisbenlevel"
                option-value="id"
                :option-label="e => e.code+ ' - '+e.description"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="benefitplan" label="Plan de beneficios *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="menbership" label="Numero de Afiliación" lazy-rules />
              </div>
              <div class="col-md-4">
                <q-select
                :readonly="readonly"
                white
                color="blue"
                v-model="specialpopulation"
                label="Población especial *"
                @filter="filterSpecialpopulation"
                :options="filterOptionsSpecialpopulation"
                option-value="id"
                :option-label="e => e.code+ ' - '+ e.description"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
<!--Falta aclarar estos campos ya que la entidad tercero y terceros contable no
poseen los campos direccion y telefono en sus entidades-->
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="patientaddress"
                label="Direccion del paciente *"
                @filter="filterThird"
                :options="filterOptionsThirdperson"
                option-value="id"
                option-label="firstname"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="phone"
                label="Direccion del paciente *"
                @filter="filterThirdPartyAccountant"
                :options="filterOptionsThirdPartyAccountant"
                option-value="id"
                option-label="taxpayer_type"
                emit-value
                map-options
                lazy-rules
                />
              </div>
<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
              <div class="col-md-12">
                <q-toggle
                  v-model="active"
                  label="Estado"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmit" color="primary" />
              <q-tooltip>Guardar datos</q-tooltip>
            </div>
            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditing" color="primary" />
              <q-tooltip>Editar datos</q-tooltip>
            </div> &nbsp;
            <div>
              <q-btn round icon="cancel" v-close-popup color="negative" />
              <q-tooltip>Cancelar</q-tooltip>
            </div>
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import {
  ACTIVE,
  INACTIVE,
  STATUS,
  DOCUMENTTYPE2,
  SEXTYPE,
  MARITALSTATUS,
  REGIMENTYPE,
  CONTRIBUTORTYPE,
  KINDSHIP
} from '../../constants/Constants'
export default defineComponent({
  name: 'PatientsPage',
  setup () {
    const path = '/admissions/patients'
    const readonly = ref(false)
    const obligate = {
      si: '*',
      no: ''
    }
    const documettypeOptions = ref(DOCUMENTTYPE2)
    const sexOptions = ref(SEXTYPE)
    const maritalstatusOptions = ref(MARITALSTATUS)
    const contributortypeOptions = ref(CONTRIBUTORTYPE)
    const kinshipOptions = ref(KINDSHIP)
    const regimetypeOptions = ref(REGIMENTYPE)
    const dataCopgovfee = ref([])
    const filterOptionsCopgovfee = ref(dataCopgovfee)
    const dataNeighborhood = ref([])
    const filterOptionsNeighborhood = ref([...dataNeighborhood.value])
    const dataCountry = ref([])
    const filterOptionsCountry = ref(dataCountry)
    const dataCharge = ref([])
    const filterOptionsCharge = ref(dataCharge)
    const dataOccupation = ref([])
    const filterOptionsOccupation = ref(dataOccupation)
    const dataSisbenlevel = ref([])
    const filterOptionsSisbenlevel = ref(dataSisbenlevel)
    const dataSpecialpopulation = ref([])
    const filterOptionsSpecialpopulation = ref(dataSpecialpopulation)
    const dataThirdperson = ref([])
    const filterOptionsThirdperson = ref(dataThirdperson)
    const dataThirdPartyAccountant = ref([])
    const filterOptionsThirdPartyAccountant = ref(dataThirdPartyAccountant)
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataPatients = ref([])
    const code = ref(null)
    const documettype = ref(null)
    const documentnumber = ref(null)
    const name1 = ref(null)
    const name2 = ref(null)
    const lastname1 = ref(null)
    const lastname2 = ref(null)
    const fullname = ref(null)
    const neighborhood = ref(null)
    const municipality = ref(null)
    const country = ref(null)
    const email = ref(null)
    const datebirth = ref(null)
    const age = ref(null)
    const sex = ref(null)
    const maritalstatus = ref(null)
    const charge = ref(null)
    const occupation = ref(null)
    const mothername = ref(null)
    const fathername = ref(null)
    const regimetype = ref(null)
    const contributortype = ref(null)
    const kinship = ref(null)
    const copgovfee = ref(null)
    const sisbenlevel = ref(null)
    const benefitplan = ref(null)
    const menbership = ref(null)
    const specialpopulation = ref(null)
    const patientaddress = ref(null)
    const phone = ref(null)
    const states = ref(STATUS)
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const fullName = ref(null)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'documettype', align: 'center', label: 'Tipo documento', field: 'documettype', sortable: true },
      { name: 'documentnumber', align: 'center', label: 'Número documento', field: 'documentnumber', sortable: true },
      { name: 'name1', align: 'center', label: 'Nombre 1', field: 'name1', sortable: true },
      { name: 'name2', align: 'center', label: 'Nombre 2', field: 'name2', sortable: true },
      { name: 'lastname1', align: 'center', label: 'Apellido 1', field: 'lastname1', sortable: true },
      { name: 'lastname2', align: 'center', label: 'Apellido 2', field: 'lastname2', sortable: true },
      { name: 'fullname', align: 'center', label: 'Nombre completo', field: 'fullname', sortable: true },
      { name: 'neighborhood', align: 'center', label: 'Barrio', field: 'neighborhood', sortable: true },
      { name: 'municipality', align: 'center', label: 'Municipio', field: 'municipality', sortable: true },
      { name: 'country', align: 'center', label: 'País', field: 'country', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'datebirth', align: 'center', label: 'Fecha de nacimiento', field: 'datebirth', sortable: true },
      { name: 'age', align: 'center', label: 'Edad', field: 'age', sortable: true },
      { name: 'sex', align: 'center', label: 'Sexo', field: 'sex', sortable: true },
      { name: 'maritalstatus', align: 'center', label: 'Estado civil', field: 'maritalstatus', sortable: true },
      { name: 'charge', align: 'center', label: 'Cargo', field: 'charge', sortable: true },
      { name: 'occupation', align: 'center', label: 'Ocupación', field: 'occupation', sortable: true },
      { name: 'mothername', align: 'center', label: 'Nombre de la madre', field: 'mothername', sortable: true },
      { name: 'fathername', align: 'center', label: 'Nombre de la padre', field: 'fathername', sortable: true },
      { name: 'regimetype', align: 'center', label: 'Tipo de régimen', field: 'regimetype', sortable: true },
      { name: 'contributortype', align: 'center', label: 'Tipo de cotizante', field: 'contributortype', sortable: true },
      { name: 'kinship', align: 'center', label: 'Parentesco', field: 'kinship', sortable: true },
      { name: 'copgovfee', align: 'center', label: 'Copago y cuota moderadora', field: 'copgovfee', sortable: true },
      { name: 'sisbenlevel', align: 'center', label: 'Nivel del Sisbén', field: 'sisbenlevel', sortable: true },
      { name: 'benefitplan', align: 'center', label: 'Plan de beneficios', field: 'benefitplan', sortable: true },
      { name: 'menbership', align: 'center', label: 'Numero de afiliación', field: 'menbership', sortable: true },
      { name: 'specialpopulation', align: 'center', label: 'Población especial', field: 'specialpopulation', sortable: true },
      { name: 'patientaddress', align: 'center', label: 'Dirección', field: 'patientaddress', sortable: true },
      { name: 'phone', align: 'center', label: 'Teléfono', field: 'phone', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getPatients()
      getCopgovfee()
      getNeighborhood()
      getCountry()
      getCharge()
      getOccupation()
      getSisbenlevel()
      getSpecialpopulation()
      getThird()
      getThirdPartyAccountant()
    })
    const completeName = (name1, name2, lastname1, lastname2) => {
      fullName.value = !name1 ? '' : name1 + ' '
      fullName.value += !name2 ? '' : name2 + ' '
      fullName.value += !lastname1 ? '' : lastname1 + ' '
      fullName.value += !lastname2 ? '' : lastname2 + ' '
      fullname.value = fullName.value.slice(0, -1)
    }
    const municipalityFn = (val) => {
      municipality.value = val.id
    }
    const calcularTiempo = (desdeFecha) => {
      if (desdeFecha != null) {
        console.log(desdeFecha)
        const [anio, mes, dia] = desdeFecha.split(/\W+/)
        const fecha = new Date(Number(anio), Number(mes) - 1, Number(dia))
        const hoy = new Date()
        const tiempoTranscurridoEnMilisegundos = hoy - fecha
        const milisegundosPorDia = 86400000 // 1000ms * 60s * 60min * 24h
        const diasTranscurridos = Math.floor(tiempoTranscurridoEnMilisegundos / milisegundosPorDia)
        const aniosTranscurridos = Math.floor(diasTranscurridos / 365)
        const mesesTranscurridos = Math.floor((diasTranscurridos % 365) / 30)
        const diasRestantes = diasTranscurridos - aniosTranscurridos * 365 - mesesTranscurridos * 30
        const req = aniosTranscurridos > 17 ? '' : '*'
        age.value = 'Años: ' + aniosTranscurridos + ' Meses: ' + mesesTranscurridos + ' Días: ' + diasRestantes
        return { anios: aniosTranscurridos, req }
      } else {
        return ''
      }
    }
    const getPatients = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataPatients.value = data
      visible.value = false
    }
    const getCopgovfee = async () => {
      visible.value = true
      const { data } = await api.get('admissions/moderatingcopays')
      dataCopgovfee.value = data
      visible.value = false
    }
    const getNeighborhood = async () => {
      visible.value = true
      const { data } = await api.get('neighborhoods')
      dataNeighborhood.value = Object.freeze(data)
      visible.value = false
    }
    const getCountry = async () => {
      visible.value = true
      const { data } = await api.get('countries')
      dataCountry.value = data
      visible.value = false
    }
    const getCharge = async () => {
      visible.value = true
      const { data } = await api.get('admissions/charges')
      dataCharge.value = data
      visible.value = false
    }
    const getOccupation = async () => {
      visible.value = true
      const { data } = await api.get('admissions/occupations')
      dataOccupation.value = data
      visible.value = false
    }
    const getSisbenlevel = async () => {
      visible.value = true
      const { data } = await api.get('admissions/sisbenlevels')
      dataSisbenlevel.value = data
      visible.value = false
    }
    const getSpecialpopulation = async () => {
      visible.value = true
      const { data } = await api.get('admissions/specialpopulations')
      dataSpecialpopulation.value = data
      visible.value = false
    }
    const getThird = async () => {
      visible.value = true
      const { data } = await api.get('thirdperson')
      dataThirdperson.value = data
      visible.value = false
    }
    const getThirdPartyAccountant = async () => {
      visible.value = true
      const { data } = await api.get('third-party-accountants')
      dataThirdPartyAccountant.value = data
      visible.value = false
    }
    const filterCopgovfee = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCopgovfee.value = dataCopgovfee.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCopgovfee.value = dataCopgovfee.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterNeighborhood = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsNeighborhood.value = dataNeighborhood.value
          console.log(filterOptionsNeighborhood.value)
          console.log('update 1 ' + val)
        })
        console.log('helo')
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsNeighborhood.value = dataNeighborhood.value.filter(v => {
          const codeMatch = v.code
          const descriptionMatch = v.description
          const municipalityCodeMatch = v.municipality.code
          const municipalityDescriptionMatch = v.municipality.description
          const departmentCodeMatch = v.municipality.department.codigo
          const departmentDescriptionMatch = v.municipality.department.descripcion
          const union = codeMatch + ' - ' + descriptionMatch + ' - ' +
                        municipalityCodeMatch + ' - ' + municipalityDescriptionMatch + ' - ' +
                        departmentCodeMatch + ' - ' + departmentDescriptionMatch
          const end = union.toLowerCase().indexOf(needle) > -1
          return end
        })
        console.log(filterOptionsNeighborhood.value)
        console.log('update 2 ' + val)
      })
    }
    const filterCountry = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCountry.value = dataCountry.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCountry.value = dataCountry.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterCharge = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCharge.value = dataCharge.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCharge.value = dataCharge.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterOccupation = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsOccupation.value = dataOccupation.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsOccupation.value = dataOccupation.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterSisbenlevel = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsSisbenlevel.value = dataSisbenlevel.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsSisbenlevel.value = dataSisbenlevel.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterSpecialpopulation = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsSpecialpopulation.value = dataSpecialpopulation.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsSpecialpopulation.value = dataSpecialpopulation.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterThird = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThirdperson.value = dataThirdperson.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThirdperson.value = dataThirdperson.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterThirdPartyAccountant = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThirdPartyAccountant.value = dataThirdPartyAccountant.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThirdPartyAccountant.value = dataThirdPartyAccountant.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const creating = () => {
      onReset()
      dialog.value = true
      active.value = true
    }
    const onReset = () => {
      code.value = null
      documentnumber.value = null
      name1.value = null
      name2.value = null
      lastname1.value = null
      lastname2.value = null
      fullname.value = null
      neighborhood.value = null
      municipality.value = null
      country.value = null
      email.value = null
      datebirth.value = null
      age.value = null
      charge.value = null
      occupation.value = null
      mothername.value = null
      fathername.value = null
      regimetype.value = null
      copgovfee.value = null
      sisbenlevel.value = null
      benefitplan.value = null
      menbership.value = null
      specialpopulation.value = null
      patientaddress.value = null
      phone.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            documettype: documettype.value,
            documentnumber: documentnumber.value,
            name1: name1.value,
            name2: name2.value,
            lastname1: lastname1.value,
            lastname2: lastname2.value,
            fullname: fullname.value,
            neighborhood: neighborhood.value.id,
            municipality: municipality.value,
            country: country.value,
            email: email.value,
            datebirth: datebirth.value,
            age: age.value,
            sex: sex.value,
            maritalstatus: maritalstatus.value,
            charge: charge.value,
            occupation: occupation.value,
            mothername: mothername.value,
            fathername: fathername.value,
            regimetype: regimetype.value,
            contributortype: contributortype.value,
            kinship: kinship.value,
            copgovfee: copgovfee.value,
            sisbenlevel: sisbenlevel.value,
            benefitplan: benefitplan.value,
            menbership: menbership.value,
            specialpopulation: specialpopulation.value,
            patientaddress: patientaddress.value,
            phone: phone.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPatients()
          })
        }
      })
    }
    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      code.value = row.code
      documentnumber.value = row.documentnumber
      name1.value = row.name1
      name2.value = row.name2
      lastname1.value = row.lastname1
      lastname2.value = row.lastname2
      fullname.value = row.fullname
      neighborhood.value = row.neighborhood
      municipality.value = row.municipality
      country.value = row.country
      email.value = row.email
      datebirth.value = row.datebirth
      charge.value = row.charge
      occupation.value = row.occupation
      mothername.value = row.mothername
      fathername.value = row.fathername
      regimetype.value = row.regimetype
      copgovfee.value = row.copgovfee
      sisbenlevel.value = row.sisbenlevel
      benefitplan.value = row.benefitplan
      menbership.value = row.menbership
      specialpopulation.value = row.specialpopulation
      patientaddress.value = row.patientaddress
      phone.value = row.phone
      readonly.value = true
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            documentnumber: documentnumber.value,
            name1: name1.value,
            name2: name2.value,
            lastname1: lastname1.value,
            lastname2: lastname2.value,
            fullname: fullname.value,
            neighborhood: neighborhood.value,
            municipality: municipality.value,
            country: country.value,
            email: email.value,
            datebirth: datebirth.value,
            age: age.value,
            charge: charge.value,
            occupation: occupation.value,
            mothername: mothername.value,
            fathername: fathername.value,
            regimetype: regimetype.value,
            copgovfee: copgovfee.value,
            sisbenlevel: sisbenlevel.value,
            benefitplan: benefitplan.value,
            menbership: menbership.value,
            specialpopulation: specialpopulation.value,
            patientaddress: patientaddress.value,
            phone: phone.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPatients()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el paciente: ' + row.code + ' - ' + row.fullname + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete(path + '/' + row.id).then(response => {
          dialog.value = false
          getPatients()
        })
      })
    }
    return {
      dialog,
      dataPatients,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      code,
      documettype,
      documentnumber,
      name1,
      name2,
      lastname1,
      lastname2,
      fullname,
      neighborhood,
      municipality,
      country,
      email,
      datebirth,
      age,
      sex,
      maritalstatus,
      charge,
      occupation,
      mothername,
      fathername,
      regimetype,
      contributortype,
      kinship,
      copgovfee,
      sisbenlevel,
      benefitplan,
      menbership,
      specialpopulation,
      patientaddress,
      phone,
      states,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      documettypeOptions,
      sexOptions,
      maritalstatusOptions,
      contributortypeOptions,
      kinshipOptions,
      regimetypeOptions,
      filterCopgovfee,
      filterNeighborhood,
      filterCountry,
      filterCharge,
      filterOccupation,
      filterSisbenlevel,
      filterSpecialpopulation,
      filterThird,
      filterThirdPartyAccountant,
      dataCopgovfee,
      dataNeighborhood,
      dataCountry,
      dataCharge,
      dataOccupation,
      dataSisbenlevel,
      dataSpecialpopulation,
      dataThirdperson,
      dataThirdPartyAccountant,
      filterOptionsCopgovfee,
      filterOptionsNeighborhood,
      filterOptionsCountry,
      filterOptionsCharge,
      filterOptionsOccupation,
      filterOptionsSisbenlevel,
      filterOptionsThirdperson,
      filterOptionsSpecialpopulation,
      filterOptionsThirdPartyAccountant,
      completeName,
      fullName,
      readonly,
      municipalityFn,
      calcularTiempo,
      obligate
    }
  }
})
</script>
