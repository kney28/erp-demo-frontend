<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Cxpproviders" :rows="dataCxpproviderss" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idthird" :props="props">
{{ props.row.idthird }}
</q-td>
<q-td key="thirddocument" :props="props">
{{ props.row.thirddocument }}
</q-td>
<q-td key="type" :props="props">
{{ providertype[props.row.type].description  }}
</q-td>
<q-td key="idledacc" :props="props">
{{ props.row.idledacc }}
</q-td>
<q-td key="idecoact" :props="props">
{{ props.row.idecoact }}
</q-td>
<q-td key="ecoactper" :props="props">
{{ props.row.ecoactper }}
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
    v-model="idthird"
    label="Tercero *"
    @filter="filterFnAccountThirPerson"
    :options="filterOptionsAccountThirPerson"
    option-value="id"
    option-label="code"
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
    v-model="thirddocument"
    label="Documento del Tercer *"
    @filter="filterFnAccountThirPerson"
    :options="filterOptionsAccountThirPerson"
    option-value="id"
    option-label="document"
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
v-model="type"
label="Tipo *"
option-label="description"
option-value="id"
:options="providertype"
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
  v-model="idledacc"
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
<q-input
white
color="blue"
v-model="idecoact"
label="Actividad económica *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="ecoactper"
label="Porcentaje actividad económica *"
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
import { ACTIVE, INACTIVE, STATUS, PROVIDERTYPE } from '../../constants/Constants'
export default defineComponent({
  name: 'CxpproviderssPage',
  setup () {
    const path = 'accounts-payable/cxpproviderss'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataCxpproviderss = ref([])
    const states = ref(STATUS)
    const dataAccountThirPerson = ref([])
    const filterOptionsAccountThirPerson = ref(dataAccountThirPerson)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const providertype = ref(PROVIDERTYPE)
    const type = ref(null)
    const code = ref(null)
    const idthird = ref(null)
    const thirddocument = ref(null)
    const idledacc = ref(null)
    const idecoact = ref(null)
    const ecoactper = ref(null)
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
      { name: 'idthird', align: 'center', label: 'Tercero', field: 'idthird', sortable: true },
      { name: 'thirddocument', align: 'center', label: 'Documento del Tercero ', field: 'thirddocument', sortable: true },
      { name: 'typeprovider', align: 'center', label: 'Tipo de proveedor', field: 'typeprovider', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta Contable', field: 'idledacc', sortable: true },
      { name: 'idecoact', align: 'center', label: 'Actividad económica', field: 'idecoact', sortable: true },
      { name: 'ecoactper', align: 'center', label: 'Porcentaje actividad económica', field: 'ecoactper', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getCxpproviderss()
      getAccountThirPerson()
      getAccountCatalog()
    })
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 5)
      visible.value = false
    }
    const getAccountThirPerson = async () => {
      visible.value = true
      const { data } = await api.get('/thirdperson')
      dataAccountThirPerson.value = data
      visible.value = false
    }
    const getCxpproviderss = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataCxpproviderss.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      idthird.value = null
      thirddocument.value = null
      idledacc.value = null
      idecoact.value = null
      ecoactper.value = null
      type.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            idthird: idthird.value,
            thirddocument: thirddocument.value,
            idledacc: idledacc.value,
            idecoact: idecoact.value,
            type: type.value,
            ecoactper: ecoactper.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getCxpproviderss()
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
      type.value = row.type
      idthird.value = row.idthird
      thirddocument.value = row.thirddocument
      idledacc.value = row.idledacc
      idecoact.value = row.idecoact
      ecoactper.value = row.ecoactper
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            idthird: idthird.value,
            thirddocument: thirddocument.value,
            idledacc: idledacc.value,
            idecoact: idecoact.value,
            ecoactper: ecoactper.value,
            type: type.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getCxpproviderss()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar los Proveedores: ' + row.id + '?',
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
          getCxpproviderss()
        })
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
    return {
      dialog,
      dataCxpproviderss,
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
      idthird,
      thirddocument,
      idledacc,
      idecoact,
      ecoactper,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      providertype,
      type,
      filterFnAccountCatalog,
      filterFnAccountThirPerson,
      filterOptionsAccountThirPerson,
      dataAccountThirPerson,
      dataAccountCatalog,
      filterOptionsAccountCatalog
    }
  }
})
</script>
