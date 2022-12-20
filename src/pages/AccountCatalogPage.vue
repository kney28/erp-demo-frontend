<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataAccountCatalog" :filter="filter" :columns="columns" row-key="name" >
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
                <q-td key="accountCatalogId" :props="props">
                  {{ props.row.accountCatalogId }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="level" :props="props">
                  {{ props.row.level }}
                </q-td>
                <q-td key="sort" :props="props">
                  {{ props.row.class }}
                </q-td>
                <q-td key="nature" :props="props">
                  {{ props.row.nature }}
                </q-td>
                <q-td key="availabilityType" :props="props">
                  {{ props.row.availabilityType }}
                </q-td>
                <q-td key="affectsThirdParties" :props="props">
                  {{ props.row.affectsThirdParties }}
                </q-td>
                <q-td key="affectsCostCenters" :props="props">
                  {{ props.row.affectsCostCenters }}
                </q-td>
                <q-td key="transferThirdParties" :props="props">
                  {{ props.row.transferThirdParties }}
                </q-td>
                <q-td key="thirdId" :props="props">
                  {{ props.row.thirdId }}
                </q-td>
                <q-td key="affectsRetention" :props="props">
                  {{ props.row.affectsRetention }}
                </q-td>
                <q-td key="status" :props="props">
                  <template v-if="(props.row.status === 1)">
                    {{ 'Activo' }}
                  </template>
                  <template v-if="(props.row.status === 2)">
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
            <div class="col-md-2">
              <q-input
                white
                color="blue"
                v-model="code"
                label="Código *"
                stack-label
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-2">
              <q-input
                white
                color="blue"
                v-model="accountCatalogId"
                label="Cuenta contable *"
                stack-label
                lazy-rules
                type="number"
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-2">
              <q-input
                white
                color="blue"
                v-model="description"
                label="Descripción *"
                stack-label
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-2">
              <q-select
                white
                color="blue"
                v-model="level"
                label="Nivel contable *"
                @filter="filterFNAccountCatalog"
                :options="filterOptionsMunicipalities"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
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
import { ACTIVE, INACTIVE, LEVELCATALOG } from '../constants/Constants'

export default defineComponent({
  name: 'AccountCatalogPage',
  setup () {
    const path = '/account-catalog'
    const status = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const active = ref(ACTIVE)
    const id = ref(null)
    const filter = ref(null)
    const dataAccountCatalog = ref([])
    const dataThirdsAccount = ref([])
    const filterOptionsMunicipalities = ref(dataThirdsAccount)
    const myForm = ref(null)
    const code = ref(null)
    const accountCatalogId = ref(null)
    const description = ref(null)
    const level = ref(null)
    const levels = ref(LEVELCATALOG)
    const sort = ref(null)
    const nature = ref(null)
    const availabilityType = ref(null)
    const affectsThirdParties = ref(null)
    const affectsCostCenters = ref(null)
    const transferThirdParties = ref(null)
    const thirdId = ref(null)
    const affectsRetention = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'accountCatalogId', align: 'center', label: 'Cuenta contable', field: 'accountCatalogId', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'level', align: 'center', label: 'Nivel', field: 'level', sortable: true },
      { name: 'sort', align: 'center', label: 'Clase', field: 'sort', sortable: true },
      { name: 'nature', align: 'center', label: 'Natualeza', field: 'nature', sortable: true },
      { name: 'availabilityType', align: 'center', label: 'Tipo disponibilidad', field: 'availabilityType', sortable: true },
      { name: 'affectsThirdParties', align: 'center', label: 'Afecta terceros', field: 'affectsThirdParties', sortable: true },
      { name: 'affectsCostCenters', align: 'center', label: 'Afecta centro de costos', field: 'affectsCostCenters', sortable: true },
      { name: 'transferThirdParties', align: 'center', label: 'Transferir terceros', field: 'transferThirdParties', sortable: true },
      { name: 'thirdId', align: 'center', label: 'Tercero', field: 'thirdId', sortable: true },
      { name: 'affectsRetention', align: 'center', label: 'Afecta retención', field: 'affectsRetention', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getAccountCatalog()
      getThirdAcount()
    })

    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccountCatalog.value = data
      visible.value = false
    }

    const getThirdAcount = async () => {
      visible.value = true
      const { data } = await api.get('/third-party-accountants')
      dataThirdsAccount.value = data
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
      status.value = null
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            status: active.value ? ACTIVE : INACTIVE,
            verificationcode: 0
          }).then(() => {
            dialog.value = false
            getAccountCatalog()
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
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountCatalog()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar al usuario: ' + row.description + '?',
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
          getAccountCatalog()
        })
      })
    }

    const filterFNAccountCatalog = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsMunicipalities.value = dataThirdsAccount.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsMunicipalities.value = dataThirdsAccount.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      dialog,
      dataAccountCatalog,
      dataThirdsAccount,
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
      status,
      active,
      filterOptionsMunicipalities,
      filterFNAccountCatalog,
      accountCatalogId,
      level,
      sort,
      nature,
      availabilityType,
      affectsThirdParties,
      affectsCostCenters,
      transferThirdParties,
      thirdId,
      affectsRetention,
      levels
    }
  }
})
</script>
