<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accbeginningbalancesdet2" :rows="dataAccbeginningbalancesdet2s" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idaccoentry" :props="props">
{{ props.row.idaccoentry }}
</q-td>
<q-td key="idledgacco" :props="props">
{{ props.row.idledgacco }}
</q-td>
<q-td key="idthird" :props="props">
{{ props.row.idthird }}
</q-td>
<q-td key="idcostcent" :props="props">
{{ props.row.idcostcent }}
</q-td>
<q-td key="duevalue" :props="props">
{{ props.row.duevalue }}
</q-td>
<q-td key="credvalue" :props="props">
{{ props.row.credvalue }}
</q-td>
<q-td key="accoentrdeta" :props="props">
{{ props.row.accoentrdeta }}
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
label="Codigo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
  white
  color="blue"
  v-model="idaccoentry"
  label="Asiento Contable *"
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
  <q-select
  white
  color="blue"
  v-model="idledgacco"
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
  v-model="idthird"
  label="Nombre *"
  @filter="filterFnThirdPerson"
  :options="filterOptionsThirdPerson"
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
  v-model="idcostcent"
  label="Centros de costo *"
  @filter="filterFnAcccostCenterss"
  :options="filterOptionsAcccostCenterss"
  option-value="id"
  option-label="fullname"
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
v-model="duevalue"
label="Valor Débito *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="credvalue"
label="Valor Crédito *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="accoentrdeta"
label="Detalle"
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
  name: 'Accbeginningbalancesdet2sPage',
  setup () {
    const path = 'accounting/accbeginningbalancesdet2s'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccbeginningbalancesdet2s = ref([])
    const states = ref(STATUS)
    const dataAccountingSeat = ref([])
    const filterOptionsAccountingSeat = ref(dataAccountingSeat)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const dataThirdPerson = ref([])
    const filterOptionsThirdPerson = ref(dataThirdPerson)
    const dataAcccostCenterss = ref([])
    const filterOptionsAcccostCenterss = ref(dataAcccostCenterss)
    const code = ref(null)
    const idaccoentry = ref(null)
    const idledgacco = ref(null)
    const idthird = ref(null)
    const idcostcent = ref(null)
    const duevalue = ref(null)
    const credvalue = ref(null)
    const accoentrdeta = ref(null)
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
      { name: 'idaccoentry', align: 'center', label: 'Asiento Contable', field: 'idaccoentry', sortable: true },
      { name: 'idledgacco', align: 'center', label: 'Cuenta Contable', field: 'idledgacco', sortable: true },
      { name: 'idthird', align: 'center', label: 'Nombre', field: 'idthird', sortable: true },
      { name: 'idcostcent', align: 'center', label: 'Centros de costo', field: 'idcostcent', sortable: true },
      { name: 'duevalue', align: 'center', label: 'Valor Débito', field: 'duevalue', sortable: true },
      { name: 'credvalue', align: 'center', label: 'Valor Crédito', field: 'credvalue', sortable: true },
      { name: 'accoentrdeta', align: 'center', label: 'Detalle', field: 'accoentrdeta', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccbeginningbalancesdet2s()
      getAccountingSeat()
      getAccountCatalog()
      getAccountThirPerson()
      getAcccostCenterss()
    })
    const getAccbeginningbalancesdet2s = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccbeginningbalancesdet2s.value = data
      visible.value = false
    }
    const getAccountingSeat = async () => {
      visible.value = true
      const { data } = await api.get('/accountingseats')
      dataAccountingSeat.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 3)
      visible.value = false
    }
    const getAccountThirPerson = async () => {
      visible.value = true
      const { data } = await api.get('/thirdperson')
      dataThirdPerson.value = data
      visible.value = false
    }
    const getAcccostCenterss = async () => {
      visible.value = true
      const { data } = await api.get('/acccostcenterss')
      dataAcccostCenterss.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      idaccoentry.value = null
      idledgacco.value = null
      idthird.value = null
      idcostcent.value = null
      duevalue.value = null
      credvalue.value = null
      accoentrdeta.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            idaccoentry: idaccoentry.value,
            idledgacco: idledgacco.value,
            idthird: idthird.value,
            idcostcent: idcostcent.value,
            duevalue: duevalue.value,
            credvalue: credvalue.value,
            accoentrdeta: accoentrdeta.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbeginningbalancesdet2s()
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
      idaccoentry.value = row.idaccoentry
      idledgacco.value = row.idledgacco
      idthird.value = row.idthird
      idcostcent.value = row.idcostcent
      duevalue.value = row.duevalue
      credvalue.value = row.credvalue
      accoentrdeta.value = row.accoentrdeta
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            idaccoentry: idaccoentry.value,
            idledgacco: idledgacco.value,
            idthird: idthird.value,
            idcostcent: idcostcent.value,
            duevalue: duevalue.value,
            credvalue: credvalue.value,
            accoentrdeta: accoentrdeta.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbeginningbalancesdet2s()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el detalle del saldo inicial: ' + row.code + '?',
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
          getAccbeginningbalancesdet2s()
        })
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
    const filterFnThirdPerson = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThirdPerson.value = dataThirdPerson.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThirdPerson.value = dataThirdPerson.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnAcccostCenterss = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAcccostCenterss.value = dataAcccostCenterss.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAcccostCenterss.value = dataAcccostCenterss.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataAccbeginningbalancesdet2s,
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
      idaccoentry,
      idledgacco,
      idthird,
      idcostcent,
      duevalue,
      credvalue,
      accoentrdeta,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      dataAccountingSeat,
      filterOptionsAccountingSeat,
      filterFnAccountingSeat,
      dataAccountCatalog,
      filterOptionsAccountCatalog,
      filterFnAccountCatalog,
      dataThirdPerson,
      filterOptionsThirdPerson,
      filterFnThirdPerson,
      dataAcccostCenterss,
      filterOptionsAcccostCenterss,
      filterFnAcccostCenterss
    }
  }
})
</script>
