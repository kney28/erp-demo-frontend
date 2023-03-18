<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accbeginningbalancesdet" :rows="dataAccbeginningbalancesdets" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idaccountvalidity" :props="props">
{{ props.row.idaccountvalidity }}
</q-td>
<q-td key="idseattype" :props="props">
{{ props.row.idseattype }}
</q-td>
<q-td key="idconsbegibalan" :props="props">
{{ props.row.idconsbegibalan }}
</q-td>
<q-td key="docudate" :props="props">
{{ props.row.docudate }}
</q-td>
<q-td key="initbaladeta" :props="props">
{{ props.row.initbaladeta }}
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
<div class="col-md-4">
<q-input
white
color="blue"
v-model="code"
label="code *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
  white
  color="blue"
  v-model="idaccountvalidity"
  label="Vigencia *"
  @filter="filterFnAccountingValidity"
  :options="filterOptionsAccountingValidity"
  option-value="id"
  option-label="validity"
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
  v-model="idseattype"
  label="Tipo de asiento *"
  @filter="filterFnAccountingSeat"
  :options="filterOptionsAccountingSeat"
  option-value="id"
  option-label="detail"
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
v-model="idconsbegibalan"
label="Consecutivo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="docudate"
label="Fecha Documento *"
type="date"
stack-label
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="initbaladeta"
label="Balance inicial *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="row justify-around">
    <div class="col-md-3">
    </div>
    <div class="col-md-3">
      <q-toggle v-model="active" label="Estado"/>
    </div>
    <div class="col-md-3">
  </div>
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
import { ACTIVE, INACTIVE, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'AccbeginningbalancesdetsPage',
  setup () {
    const path = 'accounting/accbeginningbalancesdets'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccbeginningbalancesdets = ref([])
    const states = ref(STATUS)
    const dataAccountingSeat = ref([])
    const filterOptionsAccountingSeat = ref(dataAccountingSeat)
    const dataAccountingValidity = ref([])
    const filterOptionsAccountingValidity = ref(dataAccountingValidity)
    const code = ref(null)
    const idaccountvalidity = ref(null)
    const idseattype = ref(null)
    const idconsbegibalan = ref(null)
    const docudate = ref(null)
    const initbaladeta = ref(null)
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
      { name: 'code', align: 'center', label: 'code', field: 'Codigo', sortable: true },
      { name: 'idaccountvalidity', align: 'center', label: 'Vigencia Contable', field: 'idaccountvalidity', sortable: true },
      { name: 'idseattype', align: 'center', label: 'Tipo de asiento', field: 'idseattype', sortable: true },
      { name: 'idconsbegibalan', align: 'center', label: 'Consecutivo', field: 'idconsbegibalan', sortable: true },
      { name: 'docudate', align: 'center', label: 'Fecha Documento', field: 'docudate', sortable: true },
      { name: 'initbaladeta', align: 'center', label: 'Balance inicial', field: 'initbaladeta', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccbeginningbalancesdets()
      getAccountingValidity()
      getAccountingSeat()
    })
    const getAccbeginningbalancesdets = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccbeginningbalancesdets.value = data
      visible.value = false
    }
    const getAccountingValidity = async () => {
      visible.value = true
      const { data } = await api.get('/accountingvalidity')
      dataAccountingValidity.value = data
      visible.value = false
    }
    const getAccountingSeat = async () => {
      visible.value = true
      const { data } = await api.get('/accountingseats')
      dataAccountingSeat.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      idaccountvalidity.value = null
      idseattype.value = null
      idconsbegibalan.value = null
      docudate.value = null
      initbaladeta.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            idaccountvalidity: idaccountvalidity.value,
            idseattype: idseattype.value,
            idconsbegibalan: idconsbegibalan.value,
            docudate: docudate.value,
            initbaladeta: initbaladeta.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbeginningbalancesdets()
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
      idaccountvalidity.value = row.idaccountvalidity
      idseattype.value = row.idseattype
      idconsbegibalan.value = row.idconsbegibalan
      docudate.value = row.docudate
      initbaladeta.value = row.initbaladeta
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            idaccountvalidity: idaccountvalidity.value,
            idseattype: idseattype.value,
            idconsbegibalan: idconsbegibalan.value,
            docudate: docudate.value,
            initbaladeta: initbaladeta.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbeginningbalancesdets()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el saldo inicial: ' + row.code + '?',
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
          getAccbeginningbalancesdets()
        })
      })
    }
    const filterFnAccountingValidity = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountingValidity.value = dataAccountingValidity.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountingValidity.value = dataAccountingValidity.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnAccountingSeat = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountingSeat.value = dataAccountingSeat.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountingSeat.value = dataAccountingSeat.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataAccbeginningbalancesdets,
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
      idaccountvalidity,
      idseattype,
      idconsbegibalan,
      docudate,
      initbaladeta,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      filterFnAccountingSeat,
      dataAccountingSeat,
      filterOptionsAccountingSeat,
      filterFnAccountingValidity,
      dataAccountingValidity,
      filterOptionsAccountingValidity
    }
  }
})
</script>
