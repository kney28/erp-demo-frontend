<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Tsnotcon"
            :rows="dataTsnotcons" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="autcoll" :props="props">
                  {{ findBy(enumSelection,props.row.autcoll)[0].description }}
                </q-td>
                <q-td key="budint" :props="props">
                  {{ findBy(enumSelection,props.row.budint)[0].description }}
                </q-td>
                <q-td key="nature" :props="props">
                  {{ findBy(enumNature, props.row.nature)[0].description }}
                </q-td>
                <q-td key="idledacc" :props="props">
                  {{ props.row.idledacc.accountCatalogId }} - {{ props.row.idledacc.description }}
                </q-td>
                <q-td key="statu" :props="props">
                  {{ states[props.row.statu] }}
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
                  v-model="autcoll"
                  label="Recaudo automático *"
                  :options="enumSelection"
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
                  v-model="budint"
                  label="Interfaz presupuestal *"
                  :options="enumSelection"
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
                  v-model="nature"
                  label="Naturaleza *"
                  :options="enumNature"
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
                  v-model="idledacc"
                  label="Cuenta contable *"
                  @filter="filterFnAccount"
                  :options="filterOptionsAccount"
                  option-value="id"
                  :option-label="(e) => + e.accountCatalogId +' - '+ e.description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
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
import { ACTIVE, INACTIVE, SELECTIONCATALOG, NATURECATALOG, findBy, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'TsnotconsPage',
  setup () {
    const path = '/treasury/tsnotcons'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataTsnotcons = ref([])
    const code = ref(null)
    const description = ref(null)
    const autcoll = ref(2)
    const budint = ref(2)
    const nature = ref(null)
    const dataAccount = ref([])
    const filterOptionsAccount = ref(dataAccount)
    const idledacc = ref(null)
    const enumSelection = ref(SELECTIONCATALOG)
    const enumNature = ref(NATURECATALOG)
    const states = ref(STATUS)
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
      { name: 'autcoll', align: 'center', label: 'Recaudo automático', field: 'autcoll', sortable: true },
      { name: 'budint', align: 'center', label: 'Interfaz presupuestal', field: 'budint', sortable: true },
      { name: 'nature', align: 'center', label: 'Naturaleza', field: 'nature', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta contable', field: 'idledacc', sortable: true },
      { name: 'statu', align: 'center', label: 'Estado', field: 'statu', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getTsnotcons()
      getAccount()
    })
    const getAccount = async () => {
      visible.value = true
      const { data } = await api.get('account-catalog')
      dataAccount.value = data
      visible.value = false
    }
    const getTsnotcons = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataTsnotcons.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      idledacc.value = null
      nature.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            autcoll: autcoll.value,
            idledacc: idledacc.value,
            budint: budint.value,
            nature: nature.value,
            statu: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTsnotcons()
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
      autcoll.value = row.autcoll
      idledacc.value = row.idledacc
      budint.value = row.budint
      nature.value = row.nature
      if (row.statu === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            description: description.value,
            autcoll: autcoll.value,
            idledacc: idledacc.value,
            budint: budint.value,
            nature: nature.value,
            statu: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTsnotcons()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '!Está seguro que desea eliminar el concepto de nota: ' + row.description + '?',
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
          getTsnotcons()
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
    return {
      dialog,
      dataTsnotcons,
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
      autcoll,
      budint,
      nature,
      idledacc,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      enumSelection,
      enumNature,
      filterFnAccount,
      filterOptionsAccount,
      dataAccount,
      findBy,
      states
    }
  }
})
</script>
