<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataNeighborhoods" :filter="filter" :columns="columns" row-key="name" >
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
                <q-td key="municipality" :props="props">
                  {{ props.row.municipality }}
                </q-td>
                <q-td key="status" :props="props">
                  <template v-if="props.row.status === ACTIVE">
                    {{ 'Activo' }}
                  </template>
                  <template v-else>
                    {{ 'Inactivo' }}
                  </template>
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
              <q-input
                white
                color="blue"
                v-model="code"
                label="Código *"
                stack-label
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-input
                white
                color="blue"
                v-model="description"
                label="Descripción *"
                stack-label
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                v-model="municipality"
                label="Municipio *"
                lazy-rules
                :options="municipalities"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div class="row justify-around">
            <div class="col-md-3">
            </div>
            <div class="col-md-3">
              <q-toggle v-model="active" label="Estado barrio"/>
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
import { ACTIVE, INACTIVE, NATURAL } from '../constants/Constants'

export default defineComponent({
  name: 'NeighborhoodsPage',
  setup () {
    const path = '/neighborhoods'
    const description = ref(null)
    const code = ref(null)
    const municipality = ref(null)
    const status = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const active = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataNeighborhoods = ref([])
    const municipalities = ref(NATURAL)
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
      { name: 'fullname', align: 'center', label: 'Municipio', field: 'fullname', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getNeighborhoods()
    })

    const getNeighborhoods = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataNeighborhoods.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
      active.value = true
    }

    const onReset = () => {
      active.value = false
      isEditing.value = false
      code.value = null
      description.value = null
      municipality.value = null
      status.value = null
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            municipality: municipality.value,
            status: active.value ? ACTIVE : INACTIVE,
            verificationcode: 0
          }).then(() => {
            dialog.value = false
            getNeighborhoods()
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
      municipality.value = row.municipality
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
            municipality: municipality.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getNeighborhoods()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar al usuario: ' + row.username + '?',
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
          getNeighborhoods()
        })
      })
    }

    return {
      dialog,
      dataNeighborhoods,
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
      description,
      code,
      municipality,
      status,
      active,
      municipalities
    }
  }
})
</script>
