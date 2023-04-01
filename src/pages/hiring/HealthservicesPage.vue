<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Healthservice" :rows="dataHealthservices" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="parcups" :props="props">
                  {{ props.row.parcups.description }}
                </q-td>
                <q-td key="servicetype" :props="props">
                  {{ findById(filterOptServicetype,  props.row.servicetype)[0].description }}
                </q-td>
                <q-td key="nqxservice" :props="props">
                {{ findById(filterOptNqxservice, props.row.nqxservice)[0].description }}</q-td>
                <q-td key="porposeprocedure" :props="props">
                {{ findById(filterOptPorposeprocedure, props.row.porposeprocedure)[0].description }}</q-td>
                <q-td key="concepthealth" :props="props">
                {{ findById(filterOptConcepthealth, props.row.concepthealth)[0].description }}</q-td>
                <q-td key="complexitylevel" :props="props">
                {{ findById(filterOptComplexitylevel, props.row.complexitylevel)[0].description }}</q-td>
                <q-td key="appprohiprep" :props="props">
                  {{ findById(filterOptYesNot, props.row.appprohiprep)[0].description }}
                </q-td>
                <q-td key="arthroscopy" :props="props">
                {{ findById(filterOptYesNot, props.row.arthroscopy)[0].description }}</q-td>
                <q-td key="pathology" :props="props">
                {{ findById(filterOptYesNot, props.row.pathology)[0].description }}</q-td>
                <q-td key="organizationalservices" :props="props">
                  {{ findById(filterOptYesNot, props.row.organizationalservices)[0].description }}</q-td>
                <q-td key="careservice" :props="props">
                  {{ props.row.careservice.code }} - {{ props.row.careservice.description }}
                </q-td>
                <q-td key="conceptsrips" :props="props">
                {{ findById(filterOptConceptsrips, props.row.conceptsrips)[0].description }}</q-td>
                <q-td key="minimumage" :props="props">
                  {{ props.row.minimumage }}
                </q-td>
                <q-td key="maximumage" :props="props">
                  {{ props.row.maximumage }}
                </q-td>
                <q-td key="pos" :props="props">
                {{ findById(filterOptYesNot, props.row.pos)[0].description }}</q-td>
                <q-td key="sex" :props="props">
                {{ findById(filterOptSex, props.row.sex)[0].description }}</q-td>
                <q-td key="status" :props="props">
                {{ states[props.row.status] }}</q-td>
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
              <div class="col-md-4">
                <q-input white color="blue" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="parcups"
                  label="CUPS *"
                  @filter="filterFnParcups"
                  :options="filterOptParcups"
                  option-value="id"
                  option-label="description"
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
                  v-model="servicetype"
                  label="Tipo de servicio *"
                  :options="filterOptServicetype"
                  option-value="id"
                  option-label="description"
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
                  v-model="nqxservice"
                  label="Servicios NQx *"
                  :options="filterOptNqxservice"
                  option-value="id"
                  option-label="description"
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
                  v-model="porposeprocedure"
                  label="Finalidad del procedimiento *"
                  :options="filterOptPorposeprocedure"
                  option-value="id"
                  option-label="description"
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
                  v-model="concepthealth"
                  label="Conceptos Susalud *"
                  :options="filterOptConcepthealth"
                  option-value="id"
                  option-label="description"
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
                  v-model="complexitylevel"
                  label="Nivel de complejidad *"
                  :options="filterOptComplexitylevel"
                  option-value="id"
                  option-label="description"
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
                  v-model="appprohiprep"
                  label="Reemplazo protésico total de cadera *"
                  :options="filterOptYesNot"
                  option-value="id"
                  option-label="description"
                  stack-label
                  input-debounce="0"
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
                  v-model="arthroscopy"
                  label="Artroscopia *"
                  :options="filterOptYesNot"
                  option-value="id"
                  option-label="description"
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
                  v-model="pathology"
                  label="Patología *"
                  :options="filterOptYesNot"
                  option-value="id"
                  option-label="description"
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
                  v-model="organizationalservices"
                  label="Servicio organizacional *"
                  :options="filterOptYesNot"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
<!--++++++++++Este campo es relacional pero el modelo aun no esta definido-->
                <q-select
                white
                color="blue"
                v-model="careservice"
                label="Servicios de atención *"
                @filter="filterFnCareservice"
                :options="filterOptCareservice"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
              <div class="col-md-4">
                <q-select
                    white
                    color="blue"
                    v-model="conceptsrips"
                    label="Conceptos RIPS *"
                    :options="filterOptConceptsrips"
                    option-value="id"
                    option-label="description"
                    emit-value
                    map-options
                    lazy-rules
                    :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="minimumage" label="Edad minima *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="maximumage" label="Edad maxima *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="pos"
                  label="POS *"
                  :options="filterOptYesNot"
                  option-value="id"
                  option-label="description"
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
                  v-model="sex"
                  label="Sexo *"
                  :options="filterOptSex"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
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
  LISTYESNOT,
  findBy,
  LISTSERVICETYPE,
  LISTNQXSERVICE,
  LISTPROPOSEPROCEDURE,
  LISTCONCEPHEALTH,
  LISTCOMPLEXITYLEVEL2,
  LISTCONCEPRIPS,
  SEX
} from '../../constants/Constants'
export default defineComponent({
  name: 'HealthservicesPage',
  setup () {
    const path = 'hiring/healthservices'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const states = ref(STATUS)
    const findById = ref(findBy)
    const dataParcups = ref([])
    const filterOptParcups = ref(dataParcups)
    const dataCareservice = ref([])
    const filterOptCareservice = ref(dataCareservice)
    const filterOptYesNot = ref(LISTYESNOT)
    const filterOptServicetype = ref(LISTSERVICETYPE)
    const filterOptNqxservice = ref(LISTNQXSERVICE)
    const filterOptPorposeprocedure = ref(LISTPROPOSEPROCEDURE)
    const filterOptConcepthealth = ref(LISTCONCEPHEALTH)
    const filterOptComplexitylevel = ref(LISTCOMPLEXITYLEVEL2)
    const filterOptConceptsrips = ref(LISTCONCEPRIPS)
    const filterOptSex = ref(SEX)
    const filter = ref(null)
    const dataHealthservices = ref([])
    const code = ref(null)
    const description = ref(null)
    const parcups = ref(null)
    const servicetype = ref(null)
    const careservice = ref(null)
    const minimumage = ref(null)
    const maximumage = ref(null)
    const appprohiprep = ref(null)
    const nqxservice = ref(null)
    const porposeprocedure = ref(null)
    const concepthealth = ref(null)
    const complexitylevel = ref(null)
    const arthroscopy = ref(null)
    const pathology = ref(null)
    const organizationalservices = ref(null)
    const conceptsrips = ref(null)
    const pos = ref(null)
    const sex = ref(null)
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'parcups', align: 'center', label: 'CUPS', field: 'parcups', sortable: true },
      { name: 'servicetype', align: 'center', label: 'Tipo de servicio', field: 'servicetype', sortable: true },
      { name: 'nqxservice', align: 'center', label: 'Servicios NQx', field: 'nqxservice', sortable: true },
      { name: 'porposeprocedure', align: 'center', label: 'Finalidad del procedimiento', field: 'porposeprocedure', sortable: true },
      { name: 'concepthealth', align: 'center', label: 'Conceptos Susalud', field: 'concepthealth', sortable: true },
      { name: 'complexitylevel', align: 'center', label: 'Nivel de complejidad', field: 'complexitylevel', sortable: true },
      { name: 'appprohiprep', align: 'center', label: 'Reemplazo protésico total de cadera', field: 'appprohiprep', sortable: true },
      { name: 'arthroscopy', align: 'center', label: 'Artroscopia', field: 'arthroscopy', sortable: true },
      { name: 'pathology', align: 'center', label: 'Patología', field: 'pathology', sortable: true },
      { name: 'organizationalservices', align: 'center', label: 'Servicio organizacional', field: 'organizationalservices', sortable: true },
      { name: 'careservice', align: 'center', label: 'Servicios de atención', field: 'careservice', sortable: true },
      { name: 'conceptsrips', align: 'center', label: 'Conceptos RIPS', field: 'conceptsrips', sortable: true },
      { name: 'minimumage', align: 'center', label: 'Edad minima', field: 'minimumage', sortable: true },
      { name: 'maximumage', align: 'center', label: 'Edad maxima', field: 'maximumage', sortable: true },
      { name: 'pos', align: 'center', label: 'pos', field: 'POS', sortable: true },
      { name: 'sex', align: 'center', label: 'sex', field: 'Sexo', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getHealthservices()
      getParameterization()
      getCareservice()
    })
    const getHealthservices = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataHealthservices.value = data
      visible.value = false
    }
    const getParameterization = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/parameterizationcupss')
      dataParcups.value = data
      visible.value = false
    }
    const getCareservice = async () => {
      visible.value = true
      const { data } = await api.get('/billing/careservices')
      dataCareservice.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      parcups.value = null
      servicetype.value = null
      careservice.value = null
      minimumage.value = null
      maximumage.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            parcups: parcups.value,
            servicetype: servicetype.value,
            careservice: careservice.value,
            minimumage: minimumage.value,
            maximumage: maximumage.value,
            appprohiprep: appprohiprep.value,
            nqxservice: nqxservice.value,
            porposeprocedure: porposeprocedure.value,
            concepthealth: concepthealth.value,
            complexitylevel: complexitylevel.value,
            arthroscopy: arthroscopy.value,
            pathology: pathology.value,
            organizationalservices: organizationalservices.value,
            conceptsrips: conceptsrips.value,
            pos: pos.value,
            sex: sex.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthservices()
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
      description.value = row.description
      parcups.value = row.parcups
      servicetype.value = row.servicetype
      careservice.value = row.careservice
      minimumage.value = row.minimumage
      maximumage.value = row.maximumage
      appprohiprep.value = row.appprohiprep
      nqxservice.value = row.nqxservice
      porposeprocedure.value = row.porposeprocedure
      concepthealth.value = row.concepthealth
      complexitylevel.value = row.complexitylevel
      arthroscopy.value = row.arthroscopy
      pathology.value = row.pathology
      organizationalservices.value = row.organizationalservices
      conceptsrips.value = row.conceptsrips
      pos.value = row.pos
      sex.value = row.sex
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            description: description.value,
            parcups: parcups.value,
            servicetype: servicetype.value,
            careservice: careservice.value,
            minimumage: minimumage.value,
            maximumage: maximumage.value,
            appprohiprep: appprohiprep.value,
            nqxservice: nqxservice.value,
            porposeprocedure: porposeprocedure.value,
            concepthealth: concepthealth.value,
            complexitylevel: complexitylevel.value,
            arthroscopy: arthroscopy.value,
            pathology: pathology.value,
            organizationalservices: organizationalservices.value,
            conceptsrips: conceptsrips.value,
            pos: pos.value,
            sex: sex.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthservices()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Está seguro que desea eliminar el Servicio de salud: ' + row.id + '?',
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
          getHealthservices()
        })
      })
    }
    const filterFnParcups = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptParcups.value = dataParcups.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptParcups.value = dataParcups.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnCareservice = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptCareservice.value = dataCareservice.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptCareservice.value = dataCareservice.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataHealthservices,
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
      description,
      parcups,
      servicetype,
      careservice,
      minimumage,
      maximumage,
      appprohiprep,
      nqxservice,
      porposeprocedure,
      concepthealth,
      complexitylevel,
      arthroscopy,
      pathology,
      organizationalservices,
      conceptsrips,
      pos,
      sex,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      findById,
      dataParcups,
      dataCareservice,
      filterFnParcups,
      filterOptParcups,
      filterFnCareservice,
      filterOptCareservice,
      filterOptYesNot,
      filterOptServicetype,
      filterOptNqxservice,
      filterOptPorposeprocedure,
      filterOptConcepthealth,
      filterOptComplexitylevel,
      filterOptConceptsrips,
      filterOptSex
    }
  }
})
</script>
