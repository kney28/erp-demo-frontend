<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Careservice" :rows="dataCareservices" :filter="filter" :columns="columns" row-key="name" >
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
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="typeservice" :props="props">
{{ typeServices[props.row.typeservice].description }}</q-td>
<q-td key="headquarter" :props="props">
{{ props.row.headquarter.description }}
</q-td>
<q-td key="idpharmacy" :props="props">
{{ props.row.idpharmacy }}
</q-td>
<q-td key="costcenter" :props="props">
{{ props.row.costcenter.description }}
</q-td>
<q-td key="incomeaccount" :props="props">
{{ props.row.incomeaccount.description }}
</q-td>
<q-td key="incomeaccountindividuals" :props="props">
{{ props.row.incomeaccountindividuals.description }}
</q-td>
<q-td key="capitationincomeaccount" :props="props">
{{ props.row.capitationincomeaccount.description }}
</q-td>
<q-td key="costaccountpharmacyorders" :props="props">
{{ props.row.costaccountpharmacyorders.description }}
</q-td>
<q-td key="discountaccount" :props="props">
{{ props.row.discountaccount.description }}
</q-td>
<q-td key="feesettlementaccount" :props="props">
{{ props.row.feesettlementaccount.description }}
</q-td>
<q-td key="accountpreviousperiods" :props="props">
{{ props.row.accountpreviousperiods.description }}
</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="status" :props="props">
  {{ states[props.row.status] }}</q-td>
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
label="Código *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="description"
label="Descripción *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary-->
<div class="col-md-4">
<q-select
white
color="blue"
v-model="typeservice"
label="Tipo de servicio *"
option-label="description"
option-value="id"
:options="typeServices"
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
v-model="headquarter"
label="Sede principal *"
@filter="filterFnHeadquarters"
:options="filterOptionsHeadquarters"
option-value="id"
option-label="description"
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
v-model="idpharmacy"
label="Farmacia *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="costcenter"
label="Centro de costo *"
@filter="filterFnCostCenter"
:options="filterOptionsCostCenter"
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
v-model="incomeaccount"
label="Cuenta de ingreso *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="incomeaccountindividuals"
label="Cuenta de ingreso a particulares *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="capitationincomeaccount"
label="Cuenta de ingreso capitación *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="costaccountpharmacyorders"
label="Cuenta de costo por orden de farmacia *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="discountaccount"
label="Cuenta de descuentos *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="feesettlementaccount"
label="Cuenta liquidación de honorarios *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
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
v-model="accountpreviousperiods"
label="Cuenta ingresos para vigencis anteriores *"
@filter="filterFnAccountCatalog"
:options="filterOptionsAccountCatalog"
option-value="id"
option-label="description"
emit-value
map-options
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="status"
//label="status *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
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
import { STATUS, TYPESERVICESTATUS, ACTIVE, INACTIVE } from '../../constants/Constants'
export default defineComponent({
  name: 'CareservicesPage',
  setup () {
    const path = '/billing/careservices'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const status = ref(null)
    const dataCareservices = ref([])
    const dataHeadquarters = ref([])
    const filterOptionsHeadquarters = ref(dataHeadquarters)
    const dataCostCenter = ref([])
    const filterOptionsCostCenter = ref(dataCostCenter)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const code = ref(null)
    const description = ref(null)
    const headquarter = ref(null)
    const idpharmacy = ref(null)
    const costcenter = ref(null)
    const incomeaccount = ref(null)
    const incomeaccountindividuals = ref(null)
    const capitationincomeaccount = ref(null)
    const costaccountpharmacyorders = ref(null)
    const discountaccount = ref(null)
    const feesettlementaccount = ref(null)
    const accountpreviousperiods = ref(null)
    const states = ref(STATUS)
    const typeServices = ref(TYPESERVICESTATUS)
    const typeservice = ref(null)
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
      { name: 'typeservice', align: 'center', label: 'Tipo de servicio', field: 'typeservice', sortable: true },
      { name: 'headquarter', align: 'center', label: 'Sede principal', field: 'headquarter', sortable: true },
      { name: 'idpharmacy', align: 'center', label: 'Farmacia', field: 'idpharmacy', sortable: true },
      { name: 'costcenter', align: 'center', label: 'Centro de costo', field: 'costcenter', sortable: true },
      { name: 'incomeaccount', align: 'center', label: 'Cuenta de ingreso', field: 'incomeaccount', sortable: true },
      { name: 'incomeaccountindividuals', align: 'center', label: 'Cuenta de ingreso a particulares', field: 'incomeaccountindividuals', sortable: true },
      { name: 'capitationincomeaccount', align: 'center', label: 'Cuenta de ingreso de capitación', field: 'capitationincomeaccount', sortable: true },
      { name: 'costaccountpharmacyorders', align: 'center', label: 'Cuenta de costo por órdenes de farmacia', field: 'costaccountpharmacyorders', sortable: true },
      { name: 'discountaccount', align: 'center', label: 'Cuenta de descuentos', field: 'discountaccount', sortable: true },
      { name: 'feesettlementaccount', align: 'center', label: 'Cuenta liquidación de honorarios', field: 'feesettlementaccount', sortable: true },
      { name: 'accountpreviousperiods', align: 'center', label: 'Cuenta ingresos vigencias anteriores', field: 'accountpreviousperiods', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getCareservices()
      getHeadquarters()
      getCostCenter()
      getAccountCatalog()
    })
    const getCareservices = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataCareservices.value = data
      visible.value = false
    }
    const getHeadquarters = async () => {
      visible.value = true
      const { data } = await api.get('/admissions/headquarters')
      dataHeadquarters.value = data
      visible.value = false
    }
    const getCostCenter = async () => {
      visible.value = true
      const { data } = await api.get('/costcenter')
      dataCostCenter.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      typeservice.value = null
      headquarter.value = null
      idpharmacy.value = null
      costcenter.value = null
      incomeaccount.value = null
      incomeaccountindividuals.value = null
      capitationincomeaccount.value = null
      costaccountpharmacyorders.value = null
      discountaccount.value = null
      feesettlementaccount.value = null
      accountpreviousperiods.value = null
      isEditing.value = false
      active.value = false
      status.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            headquarter: headquarter.value,
            typeservice: typeservice.value,
            idpharmacy: idpharmacy.value,
            costcenter: costcenter.value,
            incomeaccount: incomeaccount.value,
            incomeaccountindividuals: incomeaccountindividuals.value,
            capitationincomeaccount: capitationincomeaccount.value,
            costaccountpharmacyorders: costaccountpharmacyorders.value,
            discountaccount: discountaccount.value,
            feesettlementaccount: feesettlementaccount.value,
            accountpreviousperiods: accountpreviousperiods.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getCareservices()
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
      typeservice.value = row.typeservice
      headquarter.value = row.headquarter
      idpharmacy.value = row.idpharmacy
      costcenter.value = row.costcenter
      incomeaccount.value = row.incomeaccount
      incomeaccountindividuals.value = row.incomeaccountindividuals
      capitationincomeaccount.value = row.capitationincomeaccount
      costaccountpharmacyorders.value = row.costaccountpharmacyorders
      discountaccount.value = row.discountaccount
      feesettlementaccount.value = row.feesettlementaccount
      accountpreviousperiods.value = row.accountpreviousperiods
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
            typeservice: typeservice.value,
            headquarter: headquarter.value,
            idpharmacy: idpharmacy.value,
            costcenter: costcenter.value,
            incomeaccount: incomeaccount.value,
            incomeaccountindividuals: incomeaccountindividuals.value,
            capitationincomeaccount: capitationincomeaccount.value,
            costaccountpharmacyorders: costaccountpharmacyorders.value,
            discountaccount: discountaccount.value,
            feesettlementaccount: feesettlementaccount.value,
            accountpreviousperiods: accountpreviousperiods.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getCareservices()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Está seguro que desea eliminar el servicio de atención: ' + row.description + '?',
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
          getCareservices()
        })
      })
    }
    const filterFnHeadquarters = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsHeadquarters.value = dataHeadquarters.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsHeadquarters.value = dataHeadquarters.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnCostCenter = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCostCenter.value = dataCostCenter.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCostCenter.value = dataCostCenter.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
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
      dataCareservices,
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
      typeservice,
      headquarter,
      idpharmacy,
      costcenter,
      incomeaccount,
      incomeaccountindividuals,
      capitationincomeaccount,
      costaccountpharmacyorders,
      discountaccount,
      feesettlementaccount,
      accountpreviousperiods,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      typeServices,
      states,
      dataHeadquarters,
      filterOptionsHeadquarters,
      filterFnHeadquarters,
      dataCostCenter,
      filterOptionsCostCenter,
      filterFnCostCenter,
      dataAccountCatalog,
      filterOptionsAccountCatalog,
      filterFnAccountCatalog,
      status
    }
  }
})
</script>
