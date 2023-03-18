<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Tscasreccon" :rows="dataTscasreccons" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="descripcion" :props="props">
{{ props.row.descripcion }}
</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="inttypcxc" :props="props">
{{ optionsInterfaceCxc[props.row.inttypcxc - 1].description }}</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="intwitbud" :props="props">
{{ lisinUsoCouting[props.row.intwitbud - 1].description}}</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="autocollection" :props="props">
{{ lisinUsoCouting[props.row.autocollection - 1].description }}</q-td>
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="nature" :props="props">
{{ optionNature[props.row.nature - 1].description }}</q-td>
<q-td key="idledacc" :props="props">
{{ props.row.idledacc.description }}
</q-td>
<q-td key="status" :props="props">
  {{ states[props.row.status] }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="status" :props="props">
{{ props.row.status }}</q-td>-->
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
v-model="descripcion"
label="Descripciòn *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary
<div class="col-md-4">
<q-input
white
color="blue"
v-model="inttypcxc"
label="Tipo de Interfaz CXC *"
azy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>-->
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="inttypcxc"
    label="Tipo de Interfaz CXC *"
    :options="optionsInterfaceCxc"
    option-label="description"
    option-value="id"
    emit-value
    map-options
    lazy-rules
    :rules="[ val => !!val || 'El campo es obligatorio']"
  />
</div>
<div class="col-md-5">
  <q-select
    white
    color="blue"
    v-model="idledacc"
    label="Cuenta contable *"
    @filter="filterFnConcepCaja"
    :options="filterOptionsConcepCaja"
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
    v-model="intwitbud"
    label="Interfaz con Presupuesto *"
    :options="lisinUsoCouting"
    option-label="description"
    option-value="id"
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
    v-model="autocollection"
    label="Recaudo Automàtico *"
    :options="lisinUsoCouting"
    option-label="description"
    option-value="id"
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
    v-model="nature"
    label="Naturaleza *"
    lazy-rules
    :options="optionNature"
    option-label="description"
    option-value="id"
    emit-value
    map-options
    :rules="[ val => !!val || 'El campo es obligatorio']"
  />
</div>
<!--
<div class="col-md-4">
<q-input
white
color="blue"
v-model="idledacc"
label="Cuenta Contable *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
-->
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="status"
//label="Estado *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<div class="col-md-4"></div>
<div class="col-md-4">
  <q-toggle v-model="active" label="Estado"/>
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
import { OPTIONSINTERFACECXC, ACTIVE, INACTIVE, STATUS, LISINUSOCOUNTING, OPTIONNATURE } from '../../constants/Constants'
export default defineComponent({
  name: 'TscasrecconsPage',
  setup () {
    const path = '/treasury/tscasreccons'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataTscasreccons = ref([])
    const code = ref(null)
    const descripcion = ref(null)
    const idledacc = ref(null)
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const inttypcxc = ref(null)
    const intwitbud = ref(null)
    const nature = ref(null)
    const autocollection = ref(null)
    const states = ref(STATUS)
    const lisinUsoCouting = ref(LISINUSOCOUNTING)
    const optionNature = ref(OPTIONNATURE)
    const optionsInterfaceCxc = ref(OPTIONSINTERFACECXC)
    const dataConcepCaja = ref([])
    const filterOptionsConcepCaja = ref(dataConcepCaja)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Codigo', field: 'code', sortable: true },
      { name: 'descripcion', align: 'center', label: 'Descripciòn', field: 'descripcion', sortable: true },
      { name: 'inttypcxc', align: 'center', label: 'Tipo de Interfaz CXC', field: 'inttypcxc', sortable: true },
      { name: 'intwitbud', align: 'center', label: 'Interfaz con Presupuesto', field: 'intwitbud', sortable: true },
      { name: 'autocollection', align: 'center', label: 'Recaudo Automàtico', field: 'autocollection', sortable: true },
      { name: 'nature', align: 'center', label: 'Naturaleza', field: 'nature', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta Contable', field: 'idledacc', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getTscasreccons()
      getConcepCaja()
    })
    const getTscasreccons = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataTscasreccons.value = data
      visible.value = false
    }
    const getConcepCaja = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataConcepCaja.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      descripcion.value = null
      idledacc.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            descripcion: descripcion.value,
            idledacc: idledacc.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTscasreccons()
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
      descripcion.value = row.descripcion
      idledacc.value = row.idledacc
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            descripcion: descripcion.value,
            idledacc: idledacc.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getTscasreccons()
          })
        }
      })
    }
    const filterFnConcepCaja = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsConcepCaja.value = dataConcepCaja.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsConcepCaja.value = dataConcepCaja.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmaciòn',
        message: '¿Està seguro que desea eliminar la tscasreccon: ' + row.description + '?',
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
          getTscasreccons()
        })
      })
    }
    return {
      dialog,
      dataTscasreccons,
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
      descripcion,
      idledacc,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      inttypcxc,
      intwitbud,
      nature,
      autocollection,
      dataConcepCaja,
      optionsInterfaceCxc,
      optionNature,
      lisinUsoCouting,
      filterFnConcepCaja,
      filterOptionsConcepCaja,
      states
    }
  }
})
</script>
