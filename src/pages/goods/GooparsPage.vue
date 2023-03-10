<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Goopar" :rows="dataGoopars" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idledacc" :props="props">
{{ props.row.idledacc }}
</q-td>
<q-td key="idadmdepacc" :props="props">
{{ props.row.idadmdepacc }}
</q-td>
<q-td key="idweldepacc" :props="props">
{{ props.row.idweldepacc }}
</q-td>
<q-td key="idaccdepacc" :props="props">
{{ props.row.idaccdepacc }}
</q-td>
<q-td key="idaccmovgoowar" :props="props">
{{ props.row.idaccmovgoowar }}
</q-td>
<q-td key="idacclos" :props="props">
{{ props.row.idacclos }}
</q-td>
<q-td key="idaccoutusedue" :props="props">
{{ props.row.idaccoutusedue }}
</q-td>
<q-td key="idacccomowe" :props="props">
{{ props.row.idacccomowe }}
</q-td>
<q-td key="idcrecomacc" :props="props">
{{ props.row.idcrecomacc }}
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
<q-input
white
color="blue"
v-model="description"
label="Descripción *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
  white
  color="blue"
  v-model="idledacc"
  label="Cuenta Activo *"
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
  v-model="idadmdepacc"
  label="Cuenta Depreciación Administrativa *"
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
  v-model="idweldepacc"
  label="Cuenta Depreciación Asistencial *"
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
  v-model="idaccdepacc"
  label="Cuenta Depreciación Acumulada *"
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
  v-model="idaccmovgoowar"
  label="Cuenta Bienes Muebles en Bodega *"
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
  v-model="idacclos"
  label="Cuenta Ganancia *"
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
  v-model="idaccoutusedue"
  label="Cuenta Perdida *"
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
  v-model="idacccomowe"
  label="Cuenta Salida Inservibles Debito *"
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
  v-model="idcrecomacc"
  label="Cuenta Salida Inservibles Crédito *"
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
  name: 'GooparsPage',
  setup () {
    const path = '/goods/goopars'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataGoopars = ref([])
    const code = ref(null)
    const states = ref(STATUS)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const description = ref(null)
    const idledacc = ref(null)
    const idadmdepacc = ref(null)
    const idweldepacc = ref(null)
    const idaccdepacc = ref(null)
    const idaccmovgoowar = ref(null)
    const idacclos = ref(null)
    const idaccoutusedue = ref(null)
    const idacccomowe = ref(null)
    const idcrecomacc = ref(null)
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
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta Activo', field: 'idledacc', sortable: true },
      { name: 'idadmdepacc', align: 'center', label: 'Cuenta Depreciación Administrativa', field: 'idadmdepacc', sortable: true },
      { name: 'idweldepacc', align: 'center', label: 'Cuenta Depreciación Asistencial', field: 'idweldepacc', sortable: true },
      { name: 'idaccdepacc', align: 'center', label: 'Cuenta Depreciación Acumulada', field: 'idaccdepacc', sortable: true },
      { name: 'idaccmovgoowar', align: 'center', label: 'Cuenta Bienes Muebles en Bodega', field: 'idaccmovgoowar', sortable: true },
      { name: 'idacclos', align: 'center', label: 'Cuenta Ganancia', field: 'idacclos', sortable: true },
      { name: 'idaccoutusedue', align: 'center', label: 'Cuenta Perdida', field: 'idaccoutusedue', sortable: true },
      { name: 'idacccomowe', align: 'center', label: 'Cuenta Salida Inservibles Debito', field: 'idacccomowe', sortable: true },
      { name: 'idcrecomacc', align: 'center', label: 'Cuenta Salida Inservibles Crédito ', field: 'idcrecomacc', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getGoopars()
      getAccountCatalog()
    })
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 3)
      visible.value = false
    }
    const getGoopars = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataGoopars.value = data
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
      idadmdepacc.value = null
      idweldepacc.value = null
      idaccdepacc.value = null
      idaccmovgoowar.value = null
      idacclos.value = null
      idaccoutusedue.value = null
      idacccomowe.value = null
      idcrecomacc.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idledacc: idledacc.value,
            idadmdepacc: idadmdepacc.value,
            idweldepacc: idweldepacc.value,
            idaccdepacc: idaccdepacc.value,
            idaccmovgoowar: idaccmovgoowar.value,
            idacclos: idacclos.value,
            idaccoutusedue: idaccoutusedue.value,
            idacccomowe: idacccomowe.value,
            idcrecomacc: idcrecomacc.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getGoopars()
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
      idledacc.value = row.idledacc
      idadmdepacc.value = row.idadmdepacc
      idweldepacc.value = row.idweldepacc
      idaccdepacc.value = row.idaccdepacc
      idaccmovgoowar.value = row.idaccmovgoowar
      idacclos.value = row.idacclos
      idaccoutusedue.value = row.idaccoutusedue
      idacccomowe.value = row.idacccomowe
      idcrecomacc.value = row.idcrecomacc
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
            idledacc: idledacc.value,
            idadmdepacc: idadmdepacc.value,
            idweldepacc: idweldepacc.value,
            idaccdepacc: idaccdepacc.value,
            idaccmovgoowar: idaccmovgoowar.value,
            idacclos: idacclos.value,
            idaccoutusedue: idaccoutusedue.value,
            idacccomowe: idacccomowe.value,
            idcrecomacc: idcrecomacc.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getGoopars()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la parametrizacion contable: ' + row.description + '?',
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
          getGoopars()
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
    return {
      dialog,
      dataGoopars,
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
      idledacc,
      idadmdepacc,
      idweldepacc,
      idaccdepacc,
      idaccmovgoowar,
      idacclos,
      idaccoutusedue,
      idacccomowe,
      idcrecomacc,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      filterFnAccountCatalog,
      filterOptionsAccountCatalog,
      dataAccountCatalog
    }
  }
})
</script>
