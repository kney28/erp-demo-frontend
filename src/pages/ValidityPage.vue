<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataValidity" :filter="filter" :columns="columns" row-key="name" >
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
  </q-page>
  </template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import {
  ACTIVE, INACTIVE, STATUS
} from '../constants/Constants'

export default defineComponent({
  name: 'ValidityPage',
  setup () {
    const formatNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    const path = '/validity'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataValidity = ref([])
    const uvtValue = ref(null)
    const year = ref(null)
    const minimumSalary = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
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
      formatNumbers
    }
  }
})
</script>
