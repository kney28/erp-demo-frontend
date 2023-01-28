<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Headquarters" :rows="dataHeadquarterss" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="numberingdian" :props="props">
                  {{ props.row.numberingdian }}
                </q-td>
                <q-td key="healthprovider" :props="props">
                  {{ props.row.healthprovider.legrepnam }}
                </q-td>
                <q-td key="activationcode" :props="props">
                  {{ props.row.activationcode }}
                </q-td>
                <q-td key="udacccanpreval" :props="props">
                  {{ props.row.udacccanpreval.code }} {{ props.row.udacccanpreval.description }}
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
                <q-input white color="blue" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="numberingdian" label="Numeración DIAN *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white color="blue"
                  v-model="healthprovider"
                  label="Prestador de salud *"
                  @filter="filterFnHealthprovider"
                  :options="filterOptionsHealthprovider"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="activationcode" label="Código de habilitacón *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white color="blue"
                  v-model="udacccanpreval"
                  label="Cuenta de anulación vigencia anterior *"
                  @filter="filterFnAccountCatalog"
                  :options="filterOptionsAccountCatalog"
                  option-value="id"
                  option-label="code"
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
import { ACTIVE, INACTIVE, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'HeadquarterssPage',
  setup () {
    const path = '/admissions/headquarters'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const states = ref(STATUS)
    const filter = ref(null)
    const dataHealthprovider = ref([])
    const filterOptionsHealthprovider = ref(dataHealthprovider)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const dataHeadquarterss = ref([])
    const code = ref(null)
    const description = ref(null)
    const numberingdian = ref(null)
    const healthprovider = ref(null)
    const activationcode = ref(null)
    const udacccanpreval = ref(null)
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
      { name: 'numberingdian', align: 'center', label: 'Numeración DIAN', field: 'numberingdian', sortable: true },
      { name: 'healthprovider', align: 'center', label: 'Prestador de salud', field: 'healthprovider', sortable: true },
      { name: 'activationcode', align: 'center', label: 'Código de habilitación', field: 'activationcode', sortable: true },
      { name: 'udacccanpreval', align: 'center', label: 'Cuenta de anulación vigencia anterior', field: 'udacccanpreval', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getHeadquarterss()
      getHealthprovider()
      getAccountCatalog()
    })
    const getHealthprovider = async () => {
      visible.value = true
      const { data } = await api.get('/admissions/healthproviders')
      dataHealthprovider.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('account-catalog')
      dataAccountCatalog.value = data
      visible.value = false
    }
    const getHeadquarterss = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataHeadquarterss.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      numberingdian.value = null
      healthprovider.value = null
      activationcode.value = null
      udacccanpreval.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            numberingdian: numberingdian.value,
            healthprovider: healthprovider.value,
            activationcode: activationcode.value,
            udacccanpreval: udacccanpreval.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHeadquarterss()
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
      numberingdian.value = row.numberingdian
      healthprovider.value = row.healthprovider
      activationcode.value = row.activationcode
      udacccanpreval.value = row.udacccanpreval
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
            numberingdian: numberingdian.value,
            healthprovider: healthprovider.value,
            activationcode: activationcode.value,
            udacccanpreval: udacccanpreval.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHeadquarterss()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la sede: ' + row.description + '?',
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
          getHeadquarterss()
        })
      })
    }
    const filterFnHealthprovider = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsHealthprovider.value = dataHealthprovider.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsHealthprovider.value = dataHealthprovider.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnAccountCatalog = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountCatalog.value = dataAccountCatalog.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountCatalog.value = dataAccountCatalog.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataHeadquarterss,
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
      numberingdian,
      healthprovider,
      activationcode,
      udacccanpreval,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      filterFnHealthprovider,
      dataHealthprovider,
      filterOptionsHealthprovider,
      filterFnAccountCatalog,
      dataAccountCatalog,
      filterOptionsAccountCatalog
    }
  }
})
</script>
