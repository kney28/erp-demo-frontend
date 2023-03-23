<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Numeración DIAN" :rows="rows" :filter="filter" :columns="columns" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar"/>
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
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="detail" :props="props">
                  <q-btn round size="xs" color="info" icon="slideshow" v-on:click="detail(props.row)" />
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
        <q-spinner-pie color="primary" size="70px"/>
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
              <div class="col-md-6">
                <q-input
                  white
                  :readonly="readonlyState"
                  color="blue"
                  v-model="numerationDian.code"
                  label="Código *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6">
                <q-input
                  white
                  color="blue"
                  v-model="numerationDian.description"
                  label="Descripción *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
                />
              </div>
              <!--
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="numerationDian.status"
                  label="Estado *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
                />
              </div>
              -->
            </div>
            <div class="row justify-around">
              <div class="col-md-3">
              </div>
              <div class="col-md-3">
                <q-toggle v-model="active" label="Estado"/>
              </div>
              <div class="col-md-3">
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmit" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditing" color="primary"/>
              <q-tooltip>Editar datos</q-tooltip>
            </div> &nbsp;

            <div>
              <q-btn round icon="cancel" v-close-popup color="negative"/>
              <q-tooltip>Cancelar</q-tooltip>
            </div>
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogDetail" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
        <q-linear-progress :value="10" color="blue" />

        <q-card-section class="row items-center">
          <div class="text-h6"> </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row justify-around">
            <div class="col-md-4">
              <q-field label="Código" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ codeNumerationDian }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Descripción" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ descriptionNumerationDian }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Estado" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusNumerationDian] }}</div>
                </template>
              </q-field>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Detalle Numeración DIAN" :rows="rowsDetail" :filter="filterDetail" :columns="columnsDetail" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creatingDetail" label="Agregar"/>
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="filterDetail" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="resolutiondian" :props="props">
                  {{ props.row.resolutiondian }}
                </q-td>
                <q-td key="dateresolution" :props="props">
                  {{ props.row.dateresolution }}
                </q-td>
                <q-td key="initialdateresolution" :props="props">
                  {{ props.row.initialdateresolution }}
                </q-td>
                <q-td key="resolutionenddate" :props="props">
                  {{ props.row.resolutionenddate }}
                </q-td>
                <q-td key="billingprefix" :props="props">
                  {{ props.row.billingprefix }}
                </q-td>
                <q-td key="initialinvoice" :props="props">
                  {{ props.row.initialinvoice }}
                </q-td>
                <q-td key="finalbill" :props="props">
                  {{ props.row.finalbill }}
                </q-td>
                <q-td key="billingtype" :props="props">
                  {{ facturationType[props.row.billingtype - 1].description }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editingDetail(props.row)" />
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDeleteDetail(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogFormDetail" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
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
          <q-form ref="myFormDetail" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-md-6">
                <q-input
                  white
                  color="blue"
                  v-model="detailNumerationDian.resolutiondian"
                  label="Resolución *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div class="col-md-3">
                <q-input
                  filled
                  v-model="detailNumerationDian.dateresolution"
                  white
                  color="blue"
                  mask="date"
                  label="Fecha resolución *"
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="detailNumerationDian.dateresolution">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3">
                <q-input
                  filled
                  v-model="detailNumerationDian.initialdateresolution"
                  white
                  color="blue"
                  mask="date"
                  label="Fecha inicial *"
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="detailNumerationDian.initialdateresolution">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3">
                <q-input
                  filled
                  v-model="detailNumerationDian.resolutionenddate"
                  white
                  color="blue"
                  mask="date"
                  label="Fecha final *"
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="detailNumerationDian.resolutionenddate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="detailNumerationDian.billingprefix"
                  label="Prefijo"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="detailNumerationDian.initialinvoice"
                  label="Factura inicial *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio', val => val < 0 ? 'El número debe ser positivo' : !!val, val => val % 1 == 0 ? !!val : 'El número de ser un entero']"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="detailNumerationDian.finalbill"
                  label="Factura final *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio', val => val > detailNumerationDian.initialinvoice ? !!val : 'El número debe ser mayor que factura inicial', val => val % 1 == 0 ? !!val : 'El número de ser un entero']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="detailNumerationDian.billingtype"
                  label="Tipo de facturación *"
                  :options="facturationType"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <!--
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="detailNumerationDian.status"
                  label="Estado *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
                />
              </div>-->
            </div>
            <div class="row justify-around">
              <div class="col-md-3">
              </div>
              <div class="col-md-3">
                <q-toggle v-model="activeDetail" label="Estado"/>
              </div>
              <div class="col-md-3">
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmitDetail" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditingDetail" color="primary"/>
              <q-tooltip>Editar datos</q-tooltip>
            </div> &nbsp;

            <div>
              <q-btn round icon="cancel" v-close-popup color="negative"/>
              <q-tooltip>Cancelar</q-tooltip>
            </div>
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
  </template>
<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { STATUS, ACTIVE, INACTIVE, TIPOFACTURACION } from '../../constants/Constants'

export default defineComponent({
  name: 'NumerationDiansPage',
  setup () {
    const numerationDian = reactive({
      code: null,
      description: null,
      status: null
    })
    const detailNumerationDian = reactive({
      numerationdian: null,
      resolutiondian: null,
      dateresolution: null,
      initialdateresolution: null,
      resolutionenddate: null,
      billingprefix: null,
      initialinvoice: null,
      finalbill: null,
      billingtype: null,
      status: null
    })
    const readonlyState = ref(false)
    const path = '/billing/numerationdians'
    const pathDetail = '/billing/detailnumerationdians'
    const dialog = ref(false)
    const dialogDetail = ref(false)
    const dialogFormDetail = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const idNumerationDian = ref(null)
    const idNumerationDianDetail = ref(null)
    const codeNumerationDian = ref(null)
    const descriptionNumerationDian = ref(null)
    const statusNumerationDian = ref(null)
    const filter = ref(null)
    const filterDetail = ref(null)
    const rows = ref([])
    const rowsDetail = ref([])
    const myForm = ref(null)
    const myFormDetail = ref(null)
    const $q = useQuasar()
    const active = ref(false)
    const activeDetail = ref(false)
    const states = ref(STATUS)
    const facturationType = ref(TIPOFACTURACION)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columnsDetail = ref([
      { name: 'resolutiondian', align: 'center', label: 'Resolución DIAN', field: 'resolutiondian', sortable: true },
      { name: 'dateresolution', align: 'center', label: 'Fecha resolución', field: 'dateresolution', sortable: true },
      { name: 'initialdateresolution', align: 'center', label: 'Fecha inicial', field: 'initialdateresolution', sortable: true },
      { name: 'resolutionenddate', align: 'center', label: 'Fecha final', field: 'resolutionenddate', sortable: true },
      { name: 'billingprefix', align: 'center', label: 'Prefijo', field: 'billingprefix', sortable: true },
      { name: 'initialinvoice', align: 'center', label: 'Factura inicial', field: 'initialinvoice', sortable: true },
      { name: 'finalbill', align: 'center', label: 'Factura final', field: 'finalbill', sortable: true },
      { name: 'billingtype', align: 'center', label: 'Tipo de facturación', field: 'billingtype', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getAll()
    })

    const getAll = async () => {
      visible.value = true
      const { data } = await api.get(path)
      rows.value = data
      visible.value = false
    }

    const getAllDetail = async () => {
      visible.value = true
      const { data } = await api.get(`${pathDetail}/head/${idNumerationDian.value}`)
      // const { data } = await api.get(pathDetail + '/head/' + row.id)
      rowsDetail.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
      readonlyState.value = false
      active.value = true
    }

    const creatingDetail = () => {
      onResetDetail()
      dialogFormDetail.value = true
      activeDetail.value = true
    }

    const onReset = () => {
      numerationDian.code = null
      numerationDian.description = null
      numerationDian.status = false
      active.value = false
      isEditing.value = false
    }

    const onResetDetail = () => {
      detailNumerationDian.resolutiondian = null
      detailNumerationDian.dateresolution = null
      detailNumerationDian.initialdateresolution = null
      detailNumerationDian.resolutionenddate = null
      detailNumerationDian.billingprefix = null
      detailNumerationDian.initialinvoice = null
      detailNumerationDian.finalbill = null
      detailNumerationDian.billingtype = null
      detailNumerationDian.status = null
      activeDetail.value = false
      isEditing.value = false
    }

    const onSubmit = () => {
      numerationDian.status = active.value ? ACTIVE : INACTIVE
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, numerationDian).then(() => {
            dialog.value = false
            getAll()
          })
        }
      })
    }

    const onSubmitDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          detailNumerationDian.numerationdian = idNumerationDian.value
          detailNumerationDian.status = activeDetail.value ? ACTIVE : INACTIVE
          api.post(pathDetail, detailNumerationDian).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      numerationDian.code = row.code
      numerationDian.description = row.description
      numerationDian.status = row.status
      readonlyState.value = true
      if (row.status === ACTIVE) {
        active.value = true
      }
    }

    const editingDetail = (row) => {
      onResetDetail()
      idNumerationDianDetail.value = row.id
      dialogFormDetail.value = true
      isEditing.value = true
      detailNumerationDian.numerationdian = row.numerationdian.id
      detailNumerationDian.resolutiondian = row.resolutiondian
      detailNumerationDian.dateresolution = row.dateresolution
      detailNumerationDian.initialdateresolution = row.initialdateresolution
      detailNumerationDian.resolutionenddate = row.resolutionenddate
      detailNumerationDian.billingprefix = row.billingprefix
      detailNumerationDian.initialinvoice = row.initialinvoice
      detailNumerationDian.finalbill = row.finalbill
      detailNumerationDian.billingtype = row.billingtype
      detailNumerationDian.status = row.status
      if (row.status === ACTIVE) {
        activeDetail.value = true
      }
    }

    const detail = (row) => {
      idNumerationDian.value = row.id
      codeNumerationDian.value = row.code
      descriptionNumerationDian.value = row.description
      statusNumerationDian.value = row.status
      getAllDetail()
      dialogDetail.value = true
    }

    const onEditing = () => {
      numerationDian.status = active.value ? ACTIVE : INACTIVE
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, numerationDian).then(() => {
            dialog.value = false
            getAll()
          })
        }
      })
    }

    const onEditingDetail = () => {
      detailNumerationDian.status = activeDetail.value ? ACTIVE : INACTIVE
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.patch(pathDetail + '/' + idNumerationDianDetail.value, detailNumerationDian).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la numeración ' + row.description + '?',
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
          getAll()
        })
      })
    }

    const onDeleteDetail = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar resolución: ' + row.resolutiondian + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete(pathDetail + '/' + row.id).then(response => {
          dialogFormDetail.value = false
          getAllDetail()
        })
      })
    }

    return {
      dialog,
      dialogDetail,
      rows,
      rowsDetail,
      numerationDian,
      isEditing,
      myForm,
      myFormDetail,
      pagination,
      creating,
      columns,
      columnsDetail,
      visible,
      filter,
      filterDetail,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      detail,
      detailNumerationDian,
      creatingDetail,
      dialogFormDetail,
      onSubmitDetail,
      onEditingDetail,
      editingDetail,
      onDeleteDetail,
      active,
      states,
      codeNumerationDian,
      descriptionNumerationDian,
      statusNumerationDian,
      facturationType,
      activeDetail,
      readonlyState
    }
  }
})
</script>
