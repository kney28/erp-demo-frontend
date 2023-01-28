<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Healthproviders" :rows="dataHealthproviderss" :filter="filter" :columns="columns" row-key="name">
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
                <!--The next column is ENUM, please complete the code necessary-->
                <q-td key="complexitylevel" :props="props">
                {{ levels[props.row.complexitylevel] }}
                </q-td>
                <!--The next column is ENUM, please complete the code necessary-->
                <q-td key="providerclass" :props="props">
                {{ providerClass[props.row.providerclass] }}
                </q-td>
                <q-td key="legrepnam" :props="props">
                  {{ props.row.legrepnam }}
                </q-td>
                <!--The next column is ENUM, please complete the code necessary-->
                <q-td key="status" :props="props">
                {{ states[props.row.status] }}
                </q-td>
                <q-td key="thirdPerson" :props="props">
                  {{ props.row.thirdPerson.fullname }}
                </q-td>
                <q-td key="legrepide" :props="props">
                  {{ props.row.legrepide }}
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
                  v-model="complexitylevel"
                  label="Nivel de complejidad *"
                  :options="listComplexityLevel"
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
                  v-model="providerclass"
                  label="Clase de prestador *"
                  :options="listProviderClass"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="legrepnam" label="Nombre representante legal *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="legrepide" label="Identificación del representante legal *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="thirdPerson"
                  label="Tercero *"
                  @filter="filterFnThird"
                  :options="filterOptionsThird"
                  option-value="id"
                  option-label="fullname"
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
import { ACTIVE, INACTIVE, STATUS, COMPLEXITYLEVEL, PROVIDERCLASS, LISTPROVIDERCLASS, LISTCOMPLEXITYLEVEL } from '../../constants/Constants'
export default defineComponent({
  name: 'HealthproviderssPage',
  setup () {
    const path = '/admissions/healthproviders'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const states = ref(STATUS)
    const levels = ref(COMPLEXITYLEVEL)
    const listComplexityLevel = ref(LISTCOMPLEXITYLEVEL)
    const providerClass = ref(PROVIDERCLASS)
    const listProviderClass = ref(LISTPROVIDERCLASS)
    const dataThird = ref([])
    const filterOptionsThird = ref(dataThird)
    const filter = ref(null)
    const dataHealthproviderss = ref([])
    const code = ref(null)
    const description = ref(null)
    const legrepnam = ref(null)
    const complexitylevel = ref(null)
    const providerclass = ref(null)
    const third = ref(null)
    const thirdPerson = ref(null)
    const legrepide = ref(null)
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
      { name: 'complexitylevel', align: 'center', label: 'Nivel de complejidad', field: 'complexitylevel', sortable: true },
      { name: 'providerclass', align: 'center', label: 'Clase de prestador', field: 'providerclass', sortable: true },
      { name: 'legrepnam', align: 'center', label: 'Nombre representante legal', field: 'legrepnam', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'thirdPerson', align: 'center', label: 'Tercero', field: 'thirdPerson', sortable: true },
      { name: 'legrepide', align: 'center', label: 'Identificación del representante legal', field: 'legrepide', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getHealthproviderss()
      getThird()
    })
    const getThird = async () => {
      visible.value = true
      const { data } = await api.get('thirdperson')
      dataThird.value = data
      visible.value = false
    }
    const getHealthproviderss = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataHealthproviderss.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      legrepnam.value = null
      thirdPerson.value = null
      legrepide.value = null
      complexitylevel.value = null
      providerclass.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            legrepnam: legrepnam.value,
            thirdPerson: thirdPerson.value,
            complexitylevel: complexitylevel.value,
            providerclass: providerclass.value,
            legrepide: legrepide.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthproviderss()
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
      legrepnam.value = row.legrepnam
      thirdPerson.value = row.thirdPerson
      complexitylevel.value = row.complexitylevel
      providerclass.value = row.providerclass
      legrepide.value = row.legrepide
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
            legrepnam: legrepnam.value,
            thirdPerson: thirdPerson.value,
            complexitylevel: complexitylevel.value,
            providerclass: providerclass.value,
            legrepide: legrepide.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHealthproviderss()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Está seguro que desea eliminar el prestador de salud: ' + row.description + '?',
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
          getHealthproviderss()
        })
      })
    }
    const filterFnThird = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThird.value = dataThird.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThird.value = dataThird.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataHealthproviderss,
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
      legrepnam,
      providerclass,
      complexitylevel,
      third,
      thirdPerson,
      legrepide,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      levels,
      providerClass,
      listComplexityLevel,
      listProviderClass,
      dataThird,
      filterFnThird,
      filterOptionsThird
    }
  }
})
</script>
