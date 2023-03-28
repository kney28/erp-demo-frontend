<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Preconfigeneral" :rows="dataPreconfigenerals" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idvalidity" :props="props">
{{ props.row.idvalidity }}
</q-td>
<q-td key="datdec" :props="props">
{{ props.row.datdec }}
</q-td>
<q-td key="decnum" :props="props">
{{ props.row.decnum }}
</q-td>
<q-td key="budval" :props="props">
{{ props.row.budval }}
</q-td>
<q-td key="section" :props="props">
{{ props.row.section }}
</q-td>
<q-td key="unitexe" :props="props">
{{ props.row.unitexe }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="conannprobox" :props="props">
{{ props.row.conannprobox }}</q-td>-->
<!--The next column is ENUM, please complete the code necessary
<q-td key="stabudproinc" :props="props">
{{ props.row.stabudproinc }}</q-td>-->
<q-td key="incbudprodat" :props="props">
{{ props.row.incbudprodat }}
</q-td>
<q-td key="idusedubproinc" :props="props">
{{ props.row.idusedubproinc }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="stabudproexp" :props="props">
{{ props.row.stabudproexp }}</q-td>-->
<q-td key="budprodatexp" :props="props">
{{ props.row.budprodatexp }}
</q-td>
<q-td key="idusebudproexp" :props="props">
{{ props.row.idusebudproexp }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="staannprocasinc" :props="props">
{{ props.row.staannprocasinc }}</q-td>-->
<q-td key="datannprocasinc" :props="props">
{{ props.row.datannprocasinc }}
</q-td>
<q-td key="iduseannproincbox" :props="props">
{{ props.row.iduseannproincbox }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="staannproboxexp" :props="props">
{{ props.row.staannproboxexp }}</q-td>-->
<q-td key="datannproboxexp" :props="props">
{{ props.row.datannproboxexp }}
</q-td>
<q-td key="iduseannproboxexp" :props="props">
{{ props.row.iduseannproboxexp }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="nuse" :props="props">
{{ props.row.nuse }}</q-td>-->
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
label="Codigo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="idvalidity"
    label="Vigencia *"
    @filter="filterFnValidity"
    :options="filterOptionsValidity"
    option-value="id"
    option-label="year"
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
    v-model="statusvalidity"
    label="Estado Vigencia *"
    option-label="description"
    option-value="id"
    :options="stateValidity"
    stack-label
    use-input
    input-debounce="0"
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
v-model="datdec"
label="Fecha Decreto *"
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
v-model="decnum"
label="Número Decreto *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="budval"
label="Valor Presupuesto *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="section"
label="Sección *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="unitexe"
label="unitexe *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="conannprobox"
label="Control Programación Anual Caja *"
option-label="description"
option-value="id"
:options="selection"
stack-label
use-input
input-debounce="0"
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
v-model="stabudproinc"
label="Estado Programación Presupuestal Ingresos *"
option-label="description"
option-value="id"
:options="stateDocumentValidy"
stack-label
use-input
input-debounce="0"
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
v-model="incbudprodat"
label="Fecha Programación Presupuestal Ingresost *"
type="date"
stack-label
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="idusedubproinc"
    label="Usuario Programación Presupuestal Ingresos *"
    @filter="filterFnUsers"
    :options="filterOptionsUsers"
    option-value="id"
    option-label="username"
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
v-model="stabudproexp"
label="Estado Programación Presupuestal Gastos*"
option-label="description"
option-value="id"
:options="stateDocumentValidy"
stack-label
use-input
input-debounce="0"
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
v-model="budprodatexp"
label="Fecha Programación Presupuestal Gastos *"
type="date"
stack-label
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="idusebudproexp"
    label="Usuario Programación Presupuestal Gastos *"
    @filter="filterFnUsers"
    :options="filterOptionsUsers"
    option-value="id"
    option-label="username"
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
v-model="staannprocasinc"
label="Estado Programación Anual Caja Ingresos*"
option-label="description"
option-value="id"
:options="stateDocumentValidy"
stack-label
use-input
input-debounce="0"
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
v-model="datannprocasinc"
label="Fecha Programación Anual Caja Ingresos *"
type="date"
stack-label
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="iduseannproincbox"
    label="Usuario Programación Anual Caja Ingresos *"
    @filter="filterFnUsers"
    :options="filterOptionsUsers"
    option-value="id"
    option-label="username"
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
v-model="staannproboxexp"
label="Estado Programación Anual Caja Gastos*"
option-label="description"
option-value="id"
:options="stateDocumentValidy"
stack-label
use-input
input-debounce="0"
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
v-model="datannproboxexp"
label="Fecha Programación Anual Caja Gastos *"
lazy-rules
type="date"
stack-label
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="iduseannproboxexp"
    label="Usuario Programación Anual Caja Gastos *"
    @filter="filterFnUsers"
    :options="filterOptionsUsers"
    option-value="id"
    option-label="username"
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
v-model="nuse"
label="en uso*"
option-label="description"
option-value="id"
:options="selection"
stack-label
use-input
input-debounce="0"
emit-value
map-options
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
import { ACTIVE, INACTIVE, STATUS, STATEDOCUMENTVIGENCIA, STATUSVALIDITY, SELECTION } from '../../constants/Constants'
export default defineComponent({
  name: 'PreconfigeneralsPage',
  setup () {
    const path = 'budget/preconfigenerals'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataPreconfigenerals = ref([])
    const dataUsers = ref([])
    const filterOptionsUsers = ref(dataUsers)
    const dataValidity = ref([])
    const filterOptionsValidity = ref(dataValidity)
    const stateDocumentValidy = ref(STATEDOCUMENTVIGENCIA)
    const stabudproinc = ref(null)
    const stabudproexp = ref(null)
    const staannprocasinc = ref(null)
    const staannproboxexp = ref(null)
    const stateValidity = ref(STATUSVALIDITY)
    const statusvalidity = ref(null)
    const selection = ref(SELECTION)
    const nuse = ref(null)
    const conannprobox = ref(null)
    const states = ref(STATUS)
    const code = ref(null)
    const idvalidity = ref(null)
    const datdec = ref(null)
    const decnum = ref(null)
    const budval = ref(null)
    const section = ref(null)
    const unitexe = ref(null)
    const incbudprodat = ref(null)
    const idusedubproinc = ref(null)
    const budprodatexp = ref(null)
    const idusebudproexp = ref(null)
    const datannprocasinc = ref(null)
    const iduseannproincbox = ref(null)
    const datannproboxexp = ref(null)
    const iduseannproboxexp = ref(null)
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
      { name: 'code', align: 'center', label: 'Codigo', field: 'code', sortable: true },
      { name: 'idvalidity', align: 'center', label: 'Vigencia', field: 'idvalidity', sortable: true },
      { name: 'statusvalidity', align: 'center', label: 'Estado Vigencia', field: 'statusvalidity', sortable: true },
      { name: 'datdec', align: 'center', label: 'Fecha Decreto', field: 'datdec', sortable: true },
      { name: 'decnum', align: 'center', label: 'Número Decreto', field: 'decnum', sortable: true },
      { name: 'budval', align: 'center', label: 'Valor Presupuesto', field: 'budval', sortable: true },
      { name: 'status', align: 'center', label: 'Estado Registro', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getPreconfigenerals()
      getUsers()
      getValidity()
    })
    const getPreconfigenerals = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataPreconfigenerals.value = data
      visible.value = false
    }
    const getUsers = async () => {
      visible.value = true
      const { data } = await api.get('/users')
      dataUsers.value = data
      visible.value = false
    }
    const getValidity = async () => {
      visible.value = true
      const { data } = await api.get('configuration/validity')
      dataValidity.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      idvalidity.value = null
      datdec.value = null
      decnum.value = null
      budval.value = null
      section.value = null
      unitexe.value = null
      incbudprodat.value = null
      idusedubproinc.value = null
      budprodatexp.value = null
      idusebudproexp.value = null
      datannprocasinc.value = null
      iduseannproincbox.value = null
      datannproboxexp.value = null
      iduseannproboxexp.value = null
      conannprobox.value = null
      statusvalidity.value = null
      stabudproinc.value = null
      stabudproexp.value = null
      staannprocasinc.value = null
      staannproboxexp.value = null
      nuse.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            idvalidity: idvalidity.value,
            datdec: datdec.value,
            decnum: decnum.value,
            budval: budval.value,
            section: section.value,
            unitexe: unitexe.value,
            incbudprodat: incbudprodat.value,
            idusedubproinc: idusedubproinc.value,
            budprodatexp: budprodatexp.value,
            idusebudproexp: idusebudproexp.value,
            datannprocasinc: datannprocasinc.value,
            iduseannproincbox: iduseannproincbox.value,
            datannproboxexp: datannproboxexp.value,
            iduseannproboxexp: iduseannproboxexp.value,
            conannprobox: conannprobox.value,
            statusvalidity: statusvalidity.value,
            stabudproinc: stabudproinc.value,
            stabudproexp: stabudproexp.value,
            staannprocasinc: staannprocasinc.value,
            staannproboxexp: staannproboxexp.value,
            nuse: nuse.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPreconfigenerals()
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
      idvalidity.value = row.idvalidity
      datdec.value = row.datdec
      decnum.value = row.decnum
      budval.value = row.budval
      section.value = row.section
      unitexe.value = row.unitexe
      incbudprodat.value = row.incbudprodat
      idusedubproinc.value = row.idusedubproinc
      budprodatexp.value = row.budprodatexp
      idusebudproexp.value = row.idusebudproexp
      datannprocasinc.value = row.datannprocasinc
      iduseannproincbox.value = row.iduseannproincbox
      datannproboxexp.value = row.datannproboxexp
      iduseannproboxexp.value = row.iduseannproboxexp
      conannprobox.value = row.conannprobox
      statusvalidity.value = row.statusvalidity
      stabudproinc.value = row.stabudproinc
      stabudproexp.value = row.stabudproexp
      staannprocasinc.value = row.staannprocasinc
      staannproboxexp.value = row.staannproboxexp
      nuse.value = row.nuse
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            idvalidity: idvalidity.value,
            datdec: datdec.value,
            decnum: decnum.value,
            budval: budval.value,
            section: section.value,
            unitexe: unitexe.value,
            incbudprodat: incbudprodat.value,
            idusedubproinc: idusedubproinc.value,
            budprodatexp: budprodatexp.value,
            idusebudproexp: idusebudproexp.value,
            datannprocasinc: datannprocasinc.value,
            iduseannproincbox: iduseannproincbox.value,
            datannproboxexp: datannproboxexp.value,
            iduseannproboxexp: iduseannproboxexp.value,
            conannprobox: conannprobox.value,
            statusvalidity: statusvalidity.value,
            stabudproinc: stabudproinc.value,
            stabudproexp: stabudproexp.value,
            staannprocasinc: staannprocasinc.value,
            staannproboxexp: staannproboxexp.value,
            nuse: nuse.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPreconfigenerals()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la vigencia presupuestal: ' + row.code + '?',
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
          getPreconfigenerals()
        })
      })
    }
    const filterFnUsers = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsUsers.value = dataUsers.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsUsers.value = dataUsers.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnValidity = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsValidity.value = dataValidity.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsValidity.value = dataValidity.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataPreconfigenerals,
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
      idvalidity,
      datdec,
      decnum,
      budval,
      section,
      unitexe,
      incbudprodat,
      idusedubproinc,
      budprodatexp,
      idusebudproexp,
      datannprocasinc,
      iduseannproincbox,
      datannproboxexp,
      iduseannproboxexp,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      stateDocumentValidy,
      stateValidity,
      selection,
      statusvalidity,
      conannprobox,
      filterOptionsUsers,
      dataUsers,
      filterFnUsers,
      filterOptionsValidity,
      dataValidity,
      filterFnValidity,
      stabudproexp,
      stabudproinc,
      staannprocasinc,
      staannproboxexp,
      nuse
    }
  }
})
</script>
