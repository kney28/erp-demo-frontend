<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accountingentriesdet" :rows="dataAccountingentriesdets" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="accent" :props="props">
{{ props.row.accent }}
</q-td>
<q-td key="ledacc" :props="props">
{{ props.row.ledacc }}
</q-td>
<q-td key="third" :props="props">
{{ props.row.third }}
</q-td>
<q-td key="costcenter" :props="props">
{{ props.row.costcenter }}
</q-td>
<q-td key="debitvalue" :props="props">
{{ props.row.debitvalue }}
</q-td>
<q-td key="creditvalue" :props="props">
{{ props.row.creditvalue }}
</q-td>
<q-td key="detail" :props="props">
{{ props.row.detail }}
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
<q-input
white
color="blue"
v-model="accent"
label="accent *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
  white
  color="blue"
  v-model="ledacc"
  label="Cuenta Contable *"
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
    v-model="third"
    label="Tercero *"
    @filter="filterFnAccountThirPerson"
    :options="filterOptionsAccountThirPerson"
    option-value="id"
    option-label="fullname"
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
    v-model="costcenter"
    label="Centro de costo  *"
    @filter="filterFnCostCenter"
    :options="filterOptionsCostCenter"
    option-value="id"
    option-label="code"
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
v-model="debitvalue"
label="Valor Débito *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="creditvalue"
label="Valor Crédito *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="detail"
label="Detalle *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
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
import { ACTIVE, INACTIVE, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'AccountingentriesdetsPage',
  setup () {
    const path = 'accounting/accountingentriesdets'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccountingentriesdets = ref([])
    const code = ref(null)
    const accent = ref(null)
    const ledacc = ref(null)
    const third = ref(null)
    const states = ref(STATUS)
    const dataAccountThirPerson = ref([])
    const filterOptionsAccountThirPerson = ref(dataAccountThirPerson)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const dataCostCenter = ref([])
    const filterOptionsCostCenter = ref(dataCostCenter)
    const costcenter = ref([])
    const debitvalue = ref(null)
    const creditvalue = ref(null)
    const detail = ref(null)
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
      { name: 'accent', align: 'center', label: 'Asiento Contable', field: 'accent', sortable: true },
      { name: 'ledacc', align: 'center', label: 'Cuenta Contable', field: 'ledacc', sortable: true },
      { name: 'third', align: 'center', label: 'Tercero', field: 'third', sortable: true },
      { name: 'costcenter', align: 'center', label: 'Centro de costo', field: 'costcenter', sortable: true },
      { name: 'debitvalue', align: 'center', label: 'Valor Débito', field: 'debitvalue', sortable: true },
      { name: 'creditvalue', align: 'center', label: 'Valor Crédito', field: 'creditvalue', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccountingentriesdets()
      getAccountThirPerson()
      getAccountCatalog()
      getCostCenter()
    })
    const getAccountingentriesdets = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccountingentriesdets.value = data
      visible.value = false
    }
    const getAccountThirPerson = async () => {
      visible.value = true
      const { data } = await api.get('/thirdperson')
      dataAccountThirPerson.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 5)
      visible.value = false
    }
    const getCostCenter = async () => {
      visible.value = true
      const { data } = await api.get('/costcenter')
      dataCostCenter.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      accent.value = null
      ledacc.value = null
      third.value = null
      costcenter.value = null
      debitvalue.value = null
      creditvalue.value = null
      detail.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            accent: accent.value,
            ledacc: ledacc.value,
            third: third.value,
            costcenter: costcenter.value,
            debitvalue: debitvalue.value,
            creditvalue: creditvalue.value,
            detail: detail.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountingentriesdets()
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
      accent.value = row.accent
      ledacc.value = row.ledacc
      third.value = row.third
      costcenter.value = row.costcenter
      debitvalue.value = row.debitvalue
      creditvalue.value = row.creditvalue
      detail.value = row.detail
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            accent: accent.value,
            ledacc: ledacc.value,
            third: third.value,
            costcenter: costcenter.value,
            debitvalue: debitvalue.value,
            creditvalue: creditvalue.value,
            detail: detail.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountingentriesdets()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el detalle: ' + row.id + '?',
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
          getAccountingentriesdets()
        })
      })
    }
    const filterFnAccountThirPerson = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountThirPerson.value = dataAccountThirPerson.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountThirPerson.value = dataAccountThirPerson.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
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
    return {
      dialog,
      dataAccountingentriesdets,
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
      accent,
      ledacc,
      third,
      costcenter,
      debitvalue,
      creditvalue,
      detail,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      dataAccountThirPerson,
      filterOptionsAccountThirPerson,
      filterFnAccountThirPerson,
      dataAccountCatalog,
      filterOptionsAccountCatalog,
      filterFnAccountCatalog,
      dataCostCenter,
      filterOptionsCostCenter,
      filterFnCostCenter
    }
  }
})
</script>
