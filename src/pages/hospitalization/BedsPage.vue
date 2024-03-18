<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Bed" :rows="dataBeds" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="floor" :props="props">
{{ props.row.floor.description }}
</q-td>
<q-td key="location" :props="props">
{{ props.row.location.description }}
</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="typebed" :props="props">
{{ typebeds[props.row.typebed].description }}</q-td>
<q-td key="careservice" :props="props">
{{ props.row.careservice.description }}
</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="status" :props="props">
  {{ states[props.row.status].description }}</q-td>
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
v-model="floor"
label="Piso *"
@filter="filterFnFloors"
:options="filterOptionsFloors"
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
v-model="location"
label="Ubicación *"
@filter="filterFnLocations"
:options="filterOptionsLocations"
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
//v-model="typebed"
//label="typebed *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<div class="col-md-4">
<q-select
white
color="blue"
v-model="typebed"
label="Tipo de cama *"
option-label="description"
option-value="id"
:options="typebeds"
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
v-model="careservice"
label="Servicio de atención *"
@filter="filterFnCareservices"
:options="filterOptionsCareservices"
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
<div class="col-md-4">
<q-select
white
color="blue"
v-model="status"
label="Estado *"
option-label="description"
option-value="id"
:options="states"
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
import { BEDSTATUS, TYPEBED } from '../../constants/Constants'
export default defineComponent({
  name: 'BedsPage',
  setup () {
    const path = '/hospitalization/beds'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataBeds = ref([])
    const dataFloors = ref([])
    const filterOptionsFloors = ref(dataFloors)
    const dataLocations = ref([])
    const filterOptionsLocations = ref(dataLocations)
    const dataCareservices = ref([])
    const filterOptionsCareservices = ref(dataCareservices)
    const code = ref(null)
    const description = ref(null)
    const floor = ref(null)
    const location = ref(null)
    const careservice = ref(null)
    const status = ref(null)
    const typebed = ref(null)
    const states = ref(BEDSTATUS)
    const typebeds = ref(TYPEBED)
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
      { name: 'floor', align: 'center', label: 'Piso', field: 'floor', sortable: true },
      { name: 'location', align: 'center', label: 'Ubicación', field: 'location', sortable: true },
      { name: 'typebed', align: 'center', label: 'Tipo de cama', field: 'typebed', sortable: true },
      { name: 'careservice', align: 'center', label: 'Servicio de atención', field: 'careservice', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getBeds()
      getFloors()
      getLocations()
      getCareservices()
    })
    const getBeds = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataBeds.value = data
      visible.value = false
    }
    const getFloors = async () => {
      visible.value = true
      const { data } = await api.get('/hospitalization/floors')
      dataFloors.value = data
      visible.value = false
    }
    const getLocations = async () => {
      visible.value = true
      const { data } = await api.get('/hospitalization/locations')
      dataLocations.value = data
      visible.value = false
    }
    const getCareservices = async () => {
      visible.value = true
      const { data } = await api.get('/billing/careservices')
      dataCareservices.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      floor.value = null
      location.value = null
      careservice.value = null
      status.value = null
      typebed.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            floor: floor.value,
            location: location.value,
            careservice: careservice.value,
            status: status.value,
            typebed: typebed.value
          }).then(() => {
            dialog.value = false
            getBeds()
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
      floor.value = row.floor
      location.value = row.location
      careservice.value = row.careservice
      status.value = row.status
      typebed.value = row.typebed
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            description: description.value,
            floor: floor.value,
            location: location.value,
            careservice: careservice.value,
            status: status.value,
            typebed: typebed.value
          }).then(() => {
            dialog.value = false
            getBeds()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la cama: ' + row.description + '?',
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
          getBeds()
        })
      })
    }
    const filterFnFloors = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsFloors.value = dataFloors.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsFloors.value = dataFloors.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnLocations = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsLocations.value = dataLocations.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsLocations.value = dataLocations.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnCareservices = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCareservices.value = dataCareservices.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCareservices.value = dataCareservices.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataBeds,
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
      floor,
      location,
      careservice,
      status,
      states,
      typebed,
      typebeds,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      dataFloors,
      filterOptionsFloors,
      filterFnFloors,
      dataLocations,
      filterOptionsLocations,
      filterFnLocations,
      dataCareservices,
      filterOptionsCareservices,
      filterFnCareservices
    }
  }
})
</script>
