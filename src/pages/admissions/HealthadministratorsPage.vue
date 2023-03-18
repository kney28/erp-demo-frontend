<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Healthadministrator" :rows="dataHealthadministrators" :filter="filter" :columns="columns"
            row-key="name">
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
                <q-td key="idthird" :props="props">
                  {{ props.row.idthird.document }} - {{ props.row.idthird.fullname }}
                </q-td>
                <q-td key="enttypman" :props="props">
                  {{ enttypmanOptions[props.row.enttypman].description }}
                </q-td>
                <q-td key="idtiype" :props="props">
                  {{ idtiypeOptions[props.row.idtiype - 1].description }}
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
              <div class="col-md-4">
                <q-input white color="blue" :readonly="readonlyState" v-model="code" label="Código *" lazy-rules
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
                  v-model="idthird"
                  label="Tercero *"
                  @filter="filterFnThird"
                  :options="dataThirdOptions"
                  option-value="id"
                  :option-label="(e) => e.document +' - '+ e.fullname"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="enttypman"
                  label="Tipo entidad administradora *"
                  :options="enttypmanOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="idtiype"
                  label="Tipo  de  identificación *"
                  :options="idtiypeOptions"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-12 text-center">
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
import { ACTIVE, INACTIVE, STATUS, TYPEADMIN, TYPEIDENT } from '../../constants/Constants'
export default defineComponent({
  name: 'HealthadministratorsPage',
  setup () {
    const path = 'admissions/healthadministrators'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataHealthadministrators = ref([])
    const dataThird = ref([])
    const dataThirdOptions = ref(dataThird)
    const code = ref(null)
    const description = ref(null)
    const states = ref(STATUS)
    const readonlyState = ref(false)
    const idthird = ref(null)
    const enttypman = ref(null)
    const enttypmanOptions = ref(TYPEADMIN)
    const idtiype = ref(null)
    const idtiypeOptions = ref(TYPEIDENT)
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
      { name: 'idthird', align: 'center', label: 'Tercero', field: 'idthird', sortable: true },
      { name: 'enttypman', align: 'center', label: 'Tipo', field: 'enttypman', sortable: true },
      { name: 'idtiype', align: 'center', label: 'Tipo de identificación', field: 'idtiype', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getHealthadministrators()
      getThird()
    })
    const getThird = async () => {
      visible.value = true
      const { data } = await api.get('thirdperson')
      dataThird.value = data
      visible.value = false
    }
    const getHealthadministrators = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataHealthadministrators.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
      readonlyState.value = false
    }
    const onReset = () => {
      code.value = null
      description.value = null
      idthird.value = null
      enttypman.value = null
      idtiype.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idthird: idthird.value,
            enttypman: enttypman.value,
            idtiype: idtiype.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthadministrators()
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
      idthird.value = row.idthird
      enttypman.value = row.enttypman
      idtiype.value = row.idtiype
      readonlyState.value = true
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
            idthird: idthird.value,
            enttypman: enttypman.value,
            idtiype: idtiype.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthadministrators()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '!Está seguro que desea eliminar la administradora de salud: ' + row.code + '?',
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
          getHealthadministrators()
        })
      })
    }
    const filterFnThird = (val, update) => {
      if (val === '') {
        update(() => {
          dataThirdOptions.value = dataThird.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        dataThirdOptions.value = dataThird.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataHealthadministrators,
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
      idthird,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      enttypman,
      enttypmanOptions,
      idtiype,
      idtiypeOptions,
      readonlyState,
      dataThird,
      dataThirdOptions,
      filterFnThird
    }
  }
})
</script>
