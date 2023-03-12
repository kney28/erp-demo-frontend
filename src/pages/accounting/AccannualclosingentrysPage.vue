<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accannualclosingentry" :rows="dataAccannualclosingentrys" :filter="filter" :columns="columns" row-key="name" >
<template v-slot:top-left>
<q-btn unelevated rounded icon="add" color="primary" @click="onAlert" label="Agregar"/>
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
<q-td key="validity" :props="props">
{{ props.row.validity }}
</q-td>
<q-td key="month" :props="props">
{{ props.row.month }}
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
  v-model="validity"
  label="Vigencia *"
  @filter="filterFnValidity"
  :options="filterOptionsValidity"
  option-value="id"
  option-label="status"
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
  v-model="month"
  label="Meses *"
  @filter="filterFnAccountBalances"
  :options="filterOptionsAccountCatalog"
  option-value="id"
  option-label="month"
  emit-value
  map-options
  lazy-rules
  :rules="[ val => !!val || 'El campo es obligatorio']"
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
export default defineComponent({
  name: 'AccannualclosingentrysPage',
  setup () {
    const path = 'accounting/accannualclosingentrys'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccannualclosingentrys = ref([])
    const dataValidity = ref([])
    const filterOptionsValidity = ref(dataValidity)
    const dataAccountBalances = ref([])
    const filterOptionsAccountBalances = ref(dataAccountBalances)
    const code = ref(null)
    const validity = ref(null)
    const month = ref(null)
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
      { name: 'validity', align: 'center', label: 'Validar', field: 'validity', sortable: true },
      { name: 'month', align: 'center', label: 'Mes', field: 'month', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccannualclosingentrys()
      getValidity()
      getAccountBalances()
    })
    const getAccannualclosingentrys = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccannualclosingentrys.value = data
      visible.value = false
    }
    const getValidity = async () => {
      visible.value = true
      const { data } = await api.get('/configuration/validity')
      dataValidity.value = data
      visible.value = false
    }
    const getAccountBalances = async () => {
      visible.value = true
      const { data } = await api.get('/account-balances')
      dataAccountBalances.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      validity.value = null
      month.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            validity: validity.value,
            month: month.value
          }).then(() => {
            dialog.value = false
            getAccannualclosingentrys()
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
      validity.value = row.validity
      month.value = row.month
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            validity: validity.value,
            month: month.value
          }).then(() => {
            dialog.value = false
            getAccannualclosingentrys()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el cierre anual de asientos de contabilidad: ' + row.id + '?',
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
          getAccannualclosingentrys()
        })
      })
    }
    const onAlert = () => {
      $q.dialog({
        title: 'Asciento Cierre Anual',
        message: 'Se va proceder a realizar el cierre anual. Recuerde que una vez que se realice este proceso no se podrá realizar ningún tipo de movimiento en la vigencia.',
        ok: {
          label: 'Ok',
          color: 'positive'
        }
      }).onOk(() => {
        creating()
      })
    }
    const filterFnAccountBalances = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountBalances.value = dataAccountBalances.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountBalances.value = dataAccountBalances.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
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
      dataAccannualclosingentrys,
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
      validity,
      month,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      onAlert,
      dataValidity,
      filterOptionsValidity,
      filterFnValidity,
      filterFnAccountBalances,
      filterOptionsAccountBalances,
      dataAccountBalances
    }
  }
})
</script>
