<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Permissions" :rows="dataPermissionss" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="profile" :props="props">
{{ props.row.profile.description }}
</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="option" :props="props">
{{ optionsPermissions[props.row.option - 1].description }}
</q-td>
<q-td key="add" :props="props">
{{ props.row.add ? 'SI' : 'NO' }}
</q-td>
<q-td key="modify" :props="props">
{{ props.row.modify ? 'SI' : 'NO' }}
</q-td>
<q-td key="record" :props="props">
{{ props.row.record ? 'SI' : 'NO' }}
</q-td>
<q-td key="query" :props="props">
{{ props.row.query ? 'SI' : 'NO' }}
</q-td>
<q-td key="remove" :props="props">
{{ props.row.remove ? 'SI' : 'NO' }}
</q-td>
<q-td key="print" :props="props">
{{ props.row.print ? 'SI' : 'NO' }}
</q-td>
<q-td key="confirm" :props="props">
{{ props.row.confirm ? 'SI' : 'NO' }}
</q-td>
<q-td key="process" :props="props">
{{ props.row.process ? 'SI' : 'NO' }}
</q-td>
<q-td key="run" :props="props">
{{ props.row.run ? 'SI' : 'NO' }}
</q-td>
<q-td key="override" :props="props">
{{ props.row.override ? 'SI' : 'NO' }}
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
<!--
<q-input
white
color="blue"
v-model="profile"
label="Perfil *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>-->
<q-select
white
color="blue"
v-model="profile"
label="Perfil *"
@filter="filterFnProfiles"
:options="filterOptionsProfiles"
option-value="id"
option-label="description"
emit-value
map-options
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary-->
<div class="col-md-4">
<q-select
white
color="blue"
v-model="option"
label="Opción *"
option-label="description"
option-value="id"
:options="optionsPermissions"
emit-value
map-options
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="add"
label="Añadir"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="modify"
label="Modificar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="record"
label="Grabar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="query"
label="Consultar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="remove"
label="Eliminar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="print"
label="Imprimir"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="confirm"
label="Confirmar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="process"
label="Procesar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="run"
label="Ejecutar"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-checkbox
white
color="blue"
v-model="override"
label="Anular"
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
import { OPTIONPERMISSIONS } from '../../constants/Constants'
export default defineComponent({
  name: 'PermissionssPage',
  setup () {
    const path = 'configuration/permissionss'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataPermissionss = ref([])
    const dataProfiles = ref([])
    const filterOptionsProfiles = ref(dataProfiles)
    const optionsPermissions = ref(OPTIONPERMISSIONS)
    const option = ref(null)
    const code = ref(null)
    const profile = ref(null)
    const add = ref(null)
    const modify = ref(null)
    const record = ref(null)
    const query = ref(null)
    const remove = ref(null)
    const print = ref(null)
    const confirm = ref(null)
    const process = ref(null)
    const run = ref(null)
    const override = ref(null)
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
      { name: 'profile', align: 'center', label: 'Perfil', field: 'profile', sortable: true },
      { name: 'option', align: 'center', label: 'Opción', field: 'option', sortable: true },
      { name: 'add', align: 'center', label: 'Agregar', field: 'add', sortable: true },
      { name: 'modify', align: 'center', label: 'Modificar', field: 'modify', sortable: true },
      { name: 'record', align: 'center', label: 'Guardar', field: 'record', sortable: true },
      { name: 'query', align: 'center', label: 'Consultar', field: 'query', sortable: true },
      { name: 'remove', align: 'center', label: 'Eliminar', field: 'remove', sortable: true },
      { name: 'print', align: 'center', label: 'Imprimir', field: 'print', sortable: true },
      { name: 'confirm', align: 'center', label: 'Confirmar', field: 'confirm', sortable: true },
      { name: 'process', align: 'center', label: 'Procesar', field: 'process', sortable: true },
      { name: 'run', align: 'center', label: 'Ejecutar', field: 'run', sortable: true },
      { name: 'override', align: 'center', label: 'Anular', field: 'override', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getPermissionss()
      getProfiles()
    })
    const getPermissionss = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataPermissionss.value = data
      visible.value = false
    }
    const getProfiles = async () => {
      visible.value = true
      const { data } = await api.get('/profiles')
      dataProfiles.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      profile.value = null
      option.value = null
      add.value = false
      modify.value = false
      record.value = false
      query.value = false
      remove.value = false
      print.value = false
      confirm.value = false
      process.value = false
      run.value = false
      override.value = false
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            profile: profile.value,
            option: option.value,
            add: add.value,
            modify: modify.value,
            record: record.value,
            query: query.value,
            remove: remove.value,
            print: print.value,
            confirm: confirm.value,
            process: process.value,
            run: run.value,
            override: override.value
          }).then(() => {
            dialog.value = false
            getPermissionss()
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
      profile.value = row.profile
      option.value = row.option
      add.value = row.add
      modify.value = row.modify
      record.value = row.record
      query.value = row.query
      remove.value = row.remove
      print.value = row.print
      confirm.value = row.confirm
      process.value = row.process
      run.value = row.run
      override.value = row.override
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            profile: profile.value.id ? profile.value.id : profile.value,
            option: option.value,
            add: add.value,
            modify: modify.value,
            record: record.value,
            query: query.value,
            remove: remove.value,
            print: print.value,
            confirm: confirm.value,
            process: process.value,
            run: run.value,
            override: override.value
          }).then(() => {
            dialog.value = false
            getPermissionss()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la permissions: ' + row.id + '?',
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
          getPermissionss()
        })
      })
    }
    const filterFnProfiles = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsProfiles.value = dataProfiles.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsProfiles.value = dataProfiles.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataPermissionss,
      dataProfiles,
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
      profile,
      add,
      modify,
      record,
      query,
      remove,
      print,
      confirm,
      process,
      run,
      override,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      option,
      optionsPermissions,
      filterFnProfiles,
      filterOptionsProfiles
    }
  }
})
</script>
