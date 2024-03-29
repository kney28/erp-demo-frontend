<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Terceros contables" :rows="dataValidity" :filter="filter" :columns="columns" row-key="name" >
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
                <q-td key="status" :props="props">
                  {{ listStatus[props.row.status] }}
                </q-td>
                <q-td key="in_use" :props="props">
                  {{ listInUse[props.row.in_use] }}
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
    <q-card style="width: 800px; max-width: 80vw;">
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
              <q-select
                white
                color="blue"
                :readonly="isEditing"
                v-model="validity"
                label="Vigencia *"
                option-label="year"
                option-value="id"
                @filter="filterFNValidity"
                :options="filterOptionsValidity"
                stack-label
                use-input
                input-debounce="0"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                :readonly="isEditing"
                v-model="status"
                label="Estado *"
                option-label="description"
                option-value="id"
                :options="statuses"
                stack-label
                use-input
                input-debounce="0"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                v-model="inUse"
                label="En uso *"
                lazy-rules
                option-label="description"
                option-value="id"
                :options="inUses"
                use-input
                input-debounce="0"
                emit-value
                stack-label
                map-options
                :rules="[ val => !!val || 'El campo es obligatorio']"
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
  LISTACCOUNTINGVALIDITYSTATUS, ACCOUNTINGVALIDITYSTATUS,
  SELECTIONCATALOG, LISTSELECTIONCATALOG
} from '../constants/Constants'

export default defineComponent({
  name: 'AccountTermsPage',
  setup () {
    const path = '/accountingvalidity'
    const status = ref(null)
    const inUse = ref(null)
    const inUses = ref(SELECTIONCATALOG)
    const listInUse = ref(LISTSELECTIONCATALOG)
    const listStatus = ref(LISTACCOUNTINGVALIDITYSTATUS)
    const statuses = ref(ACCOUNTINGVALIDITYSTATUS)
    const validity = ref(null)
    const filterOptionsValidity = ref([])
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataValidity = ref([])
    const dataSetValidity = ref([])
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'year', align: 'center', label: 'Vigencia', field: 'year', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'in_use', align: 'center', label: 'En uso', field: 'in_use', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getSetValidity()
      getValidity()
    })

    const getValidity = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataValidity.value = data
      visible.value = false
    }

    const getSetValidity = async () => {
      visible.value = true
      const { data } = await api.get('configuration/validity')
      dataSetValidity.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
    }

    const onReset = () => {
      isEditing.value = false
      inUse.value = null
      status.value = null
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            validity: validity.value,
            status: status.value,
            in_use: inUse.value
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
      status.value = row.status
      validity.value = row.validity
      inUse.value = row.in_use
    }

    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            validity: validity.value,
            status: status.value,
            in_use: inUse.value
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
        message: '¿Está seguro que desea eliminar la vigencia ' + row.validity.year + '?',
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

    const filterFNValidity = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsValidity.value = dataSetValidity.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsValidity.value = dataSetValidity.value.filter(v => v.year.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      dialog,
      dataValidity,
      inUse,
      status,
      isEditing,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      inUses,
      listInUse,
      listStatus,
      statuses,
      validity,
      filterOptionsValidity,
      getSetValidity,
      dataSetValidity,
      filterFNValidity
    }
  }
})
</script>
