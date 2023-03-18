<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Tsboxes"
            :rows="dataTsboxess" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="tipbox" :props="props">
                  {{ findBy(enumTipbox, props.row.tipbox)[0].description }}
                </q-td>
                <q-td key="opecasbal" :props="props">
                  {{ props.row.opecasbal }}
                </q-td>
                <q-td key="datstabox" :props="props">
                  {{ props.row.datstabox }}
                </q-td>
                <q-td key="maxamo" :props="props">
                  {{ props.row.maxamo }}
                </q-td>
                <q-td key="minamo" :props="props">
                  {{ props.row.minamo }}
                </q-td>
                <q-td key="avaval" :props="props">
                  {{ props.row.avaval }}
                </q-td>
                <q-td key="idledacc" :props="props">
                  {{ props.row.idledacc.accountCatalogId }} - {{ props.row.idledacc.description }}
                </q-td>
                <q-td key="idcoscen" :props="props">
                  {{ props.row.idcoscen.code }} - {{ props.row.idcoscen.description }}
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
                <q-select
                  white
                  color="blue"
                  v-model="tipbox"
                  label="Tipo de caja *"
                  :options="enumTipbox"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="opecasbal" label="Saldo inicial de caja *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input label="Fecha inicial de caja" white color="blue" v-model="datstabox" mask="date" :rules="[val => !!val || 'El campo es obligatorio']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="datstabox">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="maxamo" label="Cuantia máxima *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="minamo" label="Cuantia mínima *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="avaval" label="Valor disponible *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio', val => val < 0 ? 'El valor debe ser positivo' : !!val]" />
              </div>
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="idledacc"
                label="Cuenta contable *"
                @filter="filterFnAccount"
                :options="filterOptionsAccount"
                option-value="id"
                :option-label="(e) => e.accountCatalogId +' - '+ e.description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="idcoscen"
                label="Centro de costo *"
                @filter="filterFnCenterCost"
                :options="filterOptionsCenterCost"
                option-value="id"
                :option-label="(e) => e.code +' - '+ e.description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4"></div>
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
import { ACTIVE, INACTIVE, MINORMAJOR, STATUS, findBy } from '../../constants/Constants'
export default defineComponent({
  name: 'TsboxessPage',
  setup () {
    const path = '/treasury/tsboxess'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataTsboxess = ref([])
    const code = ref(null)
    const description = ref(null)
    const tipbox = ref(null)
    const opecasbal = ref(null)
    const datstabox = ref(null)
    const enumTipbox = ref(MINORMAJOR)
    const maxamo = ref(null)
    const minamo = ref(null)
    const avaval = ref(null)
    const idledacc = ref(null)
    const idcoscen = ref(null)
    const dataAccount = ref([])
    const filterOptionsAccount = ref(dataAccount)
    const dataCenterCost = ref([])
    const filterOptionsCenterCost = ref(dataCenterCost)
    const role = ref(null)
    const active = ref(false)
    const states = ref(STATUS)
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
      { name: 'tipbox', align: 'center', label: 'Tipo de caja', field: 'tipbox', sortable: true },
      { name: 'opecasbal', align: 'center', label: 'Saldo inicial de caja', field: 'opecasbal', sortable: true },
      { name: 'datstabox', align: 'center', label: 'Fecha inicial de caja', field: 'datstabox', sortable: true },
      { name: 'maxamo', align: 'center', label: 'Cuantia máxima', field: 'maxamo', sortable: true },
      { name: 'minamo', align: 'center', label: 'Cuantia mínima', field: 'minamo', sortable: true },
      { name: 'avaval', align: 'center', label: 'Valor disponible', field: 'avaval', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta contable', field: 'idledacc', sortable: true },
      { name: 'idcoscen', align: 'center', label: 'Centro de costo', field: 'idcoscen', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getTsboxess()
      getAccount()
      getCenterCost()
    })
    const getAccount = async () => {
      visible.value = true
      const { data } = await api.get('account-catalog')
      dataAccount.value = data
      visible.value = false
    }
    const getCenterCost = async () => {
      visible.value = true
      const { data } = await api.get('acccostcenterss')
      dataCenterCost.value = data
      visible.value = false
    }
    const getTsboxess = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataTsboxess.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      tipbox.value = null
      opecasbal.value = null
      datstabox.value = null
      maxamo.value = null
      minamo.value = null
      avaval.value = null
      idledacc.value = null
      idcoscen.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            tipbox: tipbox.value,
            opecasbal: opecasbal.value,
            datstabox: datstabox.value,
            maxamo: maxamo.value,
            minamo: minamo.value,
            avaval: avaval.value,
            idledacc: idledacc.value,
            idcoscen: idcoscen.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTsboxess()
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
      tipbox.value = row.tipbox
      opecasbal.value = row.opecasbal
      datstabox.value = row.datstabox
      maxamo.value = row.maxamo
      minamo.value = row.minamo
      avaval.value = row.avaval
      idledacc.value = row.idledacc
      idcoscen.value = row.idcoscen
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
            tipbox: tipbox.value,
            opecasbal: opecasbal.value,
            datstabox: datstabox.value,
            maxamo: maxamo.value,
            minamo: minamo.value,
            avaval: avaval.value,
            idledacc: idledacc.value,
            idcoscen: idcoscen.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTsboxess()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '!Está seguro que desea eliminar la caja: ' + row.description + '?',
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
          getTsboxess()
        })
      })
    }
    const filterFnAccount = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccount.value = dataAccount.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccount.value = dataAccount.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnCenterCost = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCenterCost.value = dataCenterCost.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCenterCost.value = dataCenterCost.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataTsboxess,
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
      tipbox,
      opecasbal,
      datstabox,
      maxamo,
      minamo,
      avaval,
      idledacc,
      idcoscen,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      enumTipbox,
      states,
      findBy,
      dataAccount,
      filterOptionsAccount,
      dataCenterCost,
      filterOptionsCenterCost,
      filterFnAccount,
      filterFnCenterCost
    }
  }
})
</script>
