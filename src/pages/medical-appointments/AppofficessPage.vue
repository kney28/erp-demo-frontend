<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Appoffices" :rows="dataAppofficess" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idheadquarters" :props="props">
{{ props.row.idheadquarters.description }}
</q-td>
<q-td key="emeroffice" :props="props">
{{ emeroffices[props.row.emeroffice - 1].description }}
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
<div class="col-md-4">
  <q-select
  white
  color="blue"
  v-model="idheadquarters"
  label="Sede *"
  @filter="filterFnHeadquarter"
  :options="filterOptionsHeadquarter"
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
v-model="emeroffice"
label="Consultorio Urgencias *"
option-label="description"
option-value="id"
:options="emeroffices"
stack-label
use-input
input-debounce="0"
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
import { ACTIVE, INACTIVE, STATUS, EMEROFFICE } from '../../constants/Constants'
export default defineComponent({
  name: 'AppofficessPage',
  setup () {
    const path = 'medical-appointments/appofficess'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const states = ref(STATUS)
    const emeroffices = ref(EMEROFFICE)
    const emeroffice = ref(null)
    const dataAppofficess = ref([])
    const dataHeadquarter = ref([])
    const filterOptionsHeadquarter = ref(dataHeadquarter)
    const code = ref(null)
    const description = ref(null)
    const idheadquarters = ref(null)
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
      { name: 'idheadquarters', align: 'center', label: 'Sede', field: 'idheadquarters', sortable: true },
      { name: 'emeroffice', align: 'center', label: 'Consultorio Urgencias', field: 'emeroffice', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAppofficess()
      getHeadquarter()
    })
    const getAppofficess = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAppofficess.value = data
      visible.value = false
    }
    const getHeadquarter = async () => {
      visible.value = true
      const { data } = await api.get('/admissions/headquarters')
      dataHeadquarter.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      idheadquarters.value = null
      emeroffice.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idheadquarters: idheadquarters.value,
            emeroffice: emeroffice.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAppofficess()
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
      emeroffice.value = row.emeroffice
      idheadquarters.value = row.idheadquarters
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
            idheadquarters: idheadquarters.value,
            emeroffice: emeroffice.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAppofficess()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el consultorio: ' + row.description + '?',
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
          getAppofficess()
        })
      })
    }
    const filterFnHeadquarter = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsHeadquarter.value = dataHeadquarter.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsHeadquarter.value = dataHeadquarter.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataAppofficess,
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
      idheadquarters,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      emeroffices,
      emeroffice,
      filterFnHeadquarter,
      dataHeadquarter,
      filterOptionsHeadquarter
    }
  }
})
</script>
