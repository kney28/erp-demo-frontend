<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Hchealthpro" :rows="dataHchealthpros" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="typheapro" :props="props">
{{ typeprofs[props.row.typeprof].description  }}</q-td>
<q-td key="idthird" :props="props">
{{ props.row.idthird }}
</q-td>
<q-td key="businesscard" :props="props">
{{ props.row.businesscard }}
</q-td>
<q-td key="conttyp" :props="props">
{{ typeconts[props.row.typecont].description  }}</q-td>
<q-td key="idspecialty" :props="props">
{{ props.row.idspecialty }}
</q-td>
<q-td key="digsig" :props="props">
{{ digsig[props.row.digsig] }}
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
label="Descripción  *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="typeprof"
label="Tipo de profesional en salud *"
option-label="description"
option-value="id"
:options="typeprofs"
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
<q-input
white
color="blue"
v-model="idthird"
label="Tercero *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="businesscard"
label="Tarjeta Profesional *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="typecont"
label="Tipo de Contratación *"
option-label="description"
option-value="id"
:options="typeconts"
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
<q-input
white
color="blue"
v-model="idspecialty"
label="idspecialty *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="digsig"
label="digsig *"
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
import { ACTIVE, INACTIVE, STATUS, TYPECONT, TYPEPROF } from '../../constants/Constants'
export default defineComponent({
  name: 'HchealthprosPage',
  setup () {
    const path = '/clinict-history/hchealthpros'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataHchealthpros = ref([])
    const code = ref(null)
    const states = ref(STATUS)
    const typeconts = ref(TYPECONT)
    const typecont = ref(null)
    const typeprofs = ref(TYPEPROF)
    const typeprof = ref(null)
    const description = ref(null)
    const idthird = ref(null)
    const businesscard = ref(null)
    const idspecialty = ref(null)
    const digsig = ref(null)
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
      { name: 'typheapro', align: 'center', label: 'Tipo de profesional en salud', field: 'typheapro', sortable: true },
      { name: 'idthird', align: 'center', label: 'Tercero', field: 'idthird', sortable: true },
      { name: 'businesscard', align: 'center', label: 'Tarjeta Profesional', field: 'businesscard', sortable: true },
      { name: 'conttyp', align: 'center', label: 'Tipo de Contratación', field: 'conttyp', sortable: true },
      { name: 'idspecialty', align: 'center', label: 'Especialidad', field: 'idspecialty', sortable: true },
      { name: 'digsig', align: 'center', label: 'Descripción de Especialidad', field: 'digsig', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getHchealthpros()
    })
    const getHchealthpros = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataHchealthpros.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      idthird.value = null
      businesscard.value = null
      idspecialty.value = null
      digsig.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idthird: idthird.value,
            businesscard: businesscard.value,
            idspecialty: idspecialty.value,
            digsig: digsig.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHchealthpros()
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
      idthird.value = row.idthird
      businesscard.value = row.businesscard
      idspecialty.value = row.idspecialty
      digsig.value = row.digsig
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
            idthird: idthird.value,
            businesscard: businesscard.value,
            idspecialty: idspecialty.value,
            digsig: digsig.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getHchealthpros()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el profesional de la salud: ' + row.id + '?',
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
          getHchealthpros()
        })
      })
    }
    return {
      dialog,
      dataHchealthpros,
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
      idthird,
      businesscard,
      idspecialty,
      digsig,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      typeconts,
      typecont,
      typeprofs,
      typeprof
    }
  }
})
</script>
