<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Usuarios" :rows="dataValidity" :filter="filter" :columns="columns" row-key="name" >
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
                <q-td key="year" :props="props">
                  {{ props.row.year }}
                </q-td>
                <q-td key="minimunsalary" :props="props">
                  {{ formatNumbers(props.row.minimumsalary) }}
                </q-td>
                <q-td key="uvtvalue" :props="props">
                  {{ formatNumbers(props.row.uvtvalue) }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ status[props.row.status] }}
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
            <div class="col-md-3">
              <q-input
                white
                color="blue"
                v-model="year"
                label="Vigencia *"
                :readonly="isEditing"
                mask="####"
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-input
                white
                color="blue"
                v-model="minimumSalary"
                label="Salario mínimo"
                type="number"
              />
            </div>
            <div class="col-md-3">
              <q-input
                white
                color="blue"
                v-model="uvtValue"
                type="number"
                label="UVT"
              />
            </div>
          </div>

          <div class="row justify-around">
              <div class="col-md-3">
              </div>
              <div class="col-md-3">
                <q-toggle v-model="active" label="Estado Vigencia"/>
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
              <q-field label="Vigencia" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ year }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Salario mínimo" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ minimumSalary }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Valor UVT" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ uvtValue }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Estado" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusDetail] }}</div>
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
                <!--
                <q-td key="validity" :props="props">
                  {{ props.row.validity }}
                </q-td>
              -->
                <q-td key="process" :props="props">
                  {{ consecontvaliProcess[props.row.process - 1].description }}
                </q-td>
                <q-td key="option" :props="props">
                  {{ consecontvaliOption[props.row.option - 1].description }}
                </q-td>
                <q-td key="number" :props="props">
                  {{ props.row.number }}
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
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="process"
                  label="Proceso *"
                  :options="consecontvaliProcess"
                  option-label="description"
                  option-value="id"
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
                  v-model="option"
                  label="Opción *"
                  :options="consecontvaliOption"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="number"
                  label="Número *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
              </div>
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
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import {
  ACTIVE, INACTIVE, STATUS, CONSECONTVALIPROCESS, CONSECONTVALIOPTION
} from '../../constants/Constants'

export default defineComponent({
  name: 'ValidityPage',
  setup () {
    const formatNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    const path = '/configuration/validity'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataValidity = ref([])
    const uvtValue = ref(null)
    const year = ref(null)
    const option = ref(null)
    const number = ref(null)
    const statusRowDetail = ref(null)
    const minimumSalary = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const idValidity = ref(null)
    const idDetalle = ref(null)
    const rowsDetail = ref([])
    const dialogDetail = ref(false)
    const states = ref(STATUS)
    const filterDetail = ref(null)
    const statusDetail = ref(null)
    const activeDetail = ref(false)
    const dialogFormDetail = ref(false)
    const myFormDetail = ref(null)
    const process = ref(null)
    const consecontvaliProcess = ref(CONSECONTVALIPROCESS)
    const consecontvaliOption = ref(CONSECONTVALIOPTION)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'year', align: 'center', label: 'Vigencia', field: 'year', sortable: true },
      { name: 'minimunsalary', align: 'center', label: 'Salario mínimo', field: 'minimunsalary', sortable: true },
      { name: 'uvtvalue', align: 'center', label: 'UVT', field: 'uvtvalue', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    const columnsDetail = ref([
      { name: 'process', align: 'center', label: 'Proceso', field: 'process', sortable: true },
      { name: 'option', align: 'center', label: 'Opción', field: 'option', sortable: true },
      { name: 'number', align: 'center', label: 'Número', field: 'number', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const status = ref(STATUS)

    onMounted(() => {
      getValidity()
    })

    const getValidity = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataValidity.value = data
      visible.value = false
    }

    const getAllDetail = async () => {
      visible.value = true
      const { data } = await api.get('/configuration/consecutivecontrolvaliditiess/head/' + idValidity.value)
      // const { data } = await api.get(pathDetail + '/head/' + row.id)
      rowsDetail.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
      active.value = false
    }

    const onReset = () => {
      year.value = null
      minimumSalary.value = null
      uvtValue.value = null
      active.value = null
      isEditing.value = false
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            year: year.value,
            minimumsalary: parseInt(minimumSalary.value),
            uvtvalue: parseInt(uvtValue.value),
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getValidity()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      year.value = row.year
      uvtValue.value = row.uvtvalue
      minimumSalary.value = row.minimumsalary
      if (row.status === ACTIVE) {
        active.value = true
      }
    }

    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            year: year.value,
            minimumsalary: minimumSalary.value,
            uvtvalue: uvtValue.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getValidity()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar esta vigencia: ' + row.year + '?',
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
          getValidity()
        })
      })
    }

    const formatNumbers = (valor) => {
      return formatNumber.format(valor)
    }

    const detail = (row) => {
      idValidity.value = row.id
      year.value = row.year
      minimumSalary.value = row.minimumsalary
      uvtValue.value = row.uvtvalue
      statusDetail.value = row.status
      getAllDetail()
      dialogDetail.value = true
    }

    const creatingDetail = () => {
      onResetDetail()
      dialogFormDetail.value = true
    }

    const onResetDetail = () => {
      process.value = null
      option.value = null
      number.value = null
      statusRowDetail.value = null
      activeDetail.value = false
      isEditing.value = false
    }

    const onSubmitDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.post('/configuration/consecutivecontrolvaliditiess', {
            validity: idValidity.value,
            process: process.value,
            option: option.value,
            number: number.value,
            status: activeDetail.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }

    const editingDetail = (row) => {
      onResetDetail()
      idDetalle.value = row.id
      dialogFormDetail.value = true
      isEditing.value = true
      process.value = row.process
      option.value = row.option
      number.value = row.number
      status.value = row.status
      if (row.status === ACTIVE) {
        activeDetail.value = true
      }
    }

    const onEditingDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.patch('/configuration/consecutivecontrolvaliditiess/' + idDetalle.value, {
            validity: idValidity.value,
            process: process.value,
            option: option.value,
            number: number.value,
            status: activeDetail.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }

    const onDeleteDetail = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el detalle de vigencia?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete('/configuration/consecutivecontrolvaliditiess/' + row.id).then(response => {
          dialogFormDetail.value = false
          getAllDetail()
        })
      })
    }

    return {
      dialog,
      dataValidity,
      isEditing,
      minimumSalary,
      active,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      year,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      status,
      uvtValue,
      formatNumber,
      formatNumbers,
      detail,
      dialogDetail,
      states,
      columnsDetail,
      filterDetail,
      rowsDetail,
      statusDetail,
      creatingDetail,
      activeDetail,
      dialogFormDetail,
      myFormDetail,
      option,
      onSubmitDetail,
      process,
      number,
      editingDetail,
      onEditingDetail,
      onDeleteDetail,
      consecontvaliProcess,
      consecontvaliOption
    }
  }
})
</script>
