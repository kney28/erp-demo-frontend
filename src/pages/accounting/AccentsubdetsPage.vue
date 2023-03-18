<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accentsubdet" :rows="dataAccentsubdets" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="conret" :props="props">
{{ props.row.conret }}
</q-td>
<q-td key="nature" :props="props">
{{ natures[props.row.nature-1].description }}</q-td>
<q-td key="basevalue" :props="props">
{{ props.row.basevalue }}
</q-td>
<q-td key="withholdingpercentage" :props="props">
{{ props.row.withholdingpercentage }}
</q-td>
<q-td key="holdvalue" :props="props">
{{ props.row.holdvalue }}
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
label="codigo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
  <q-select
    white
    color="blue"
    v-model="conret"
    label="Concepto Retención *"
    @filter="filterRetentionConcept"
    :options="filterOptionsRetentionConcept"
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
v-model="nature"
label="Naturaleza *"
option-label="description"
option-value="id"
:options="natures"
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
v-model="basevalue"
label="valor base *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="withholdingpercentage"
label="Porcentaje Retención *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="holdvalue"
label="Valor Retenido *"
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
import { ACTIVE, INACTIVE, STATUS, NATURE } from '../../constants/Constants'
export default defineComponent({
  name: 'AccentsubdetsPage',
  setup () {
    const path = 'accounting/accentsubdets'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccentsubdets = ref([])
    const code = ref(null)
    const states = ref(STATUS)
    const natures = ref(NATURE)
    const nature = ref(null)
    const conret = ref(null)
    const dataRetentionConcept = ref([])
    const filterOptionsRetentionConcept = ref(dataRetentionConcept)
    const basevalue = ref(null)
    const withholdingpercentage = ref(null)
    const holdvalue = ref(null)
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
      { name: 'conret', align: 'center', label: 'Concepto Retención', field: 'conret', sortable: true },
      { name: 'nature', align: 'center', label: 'Naturaleza', field: 'nature', sortable: true },
      { name: 'basevalue', align: 'center', label: 'Valor Base', field: 'basevalue', sortable: true },
      { name: 'withholdingpercentage', align: 'center', label: 'Porcentaje Retención', field: 'withholdingpercentage', sortable: true },
      { name: 'holdvalue', align: 'center', label: 'Valor Retenido', field: 'holdvalue', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccentsubdets()
      getRetentionConcept()
    })
    const getAccentsubdets = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccentsubdets.value = data
      visible.value = false
    }
    const getRetentionConcept = async () => {
      visible.value = true
      const { data } = await api.get('/retention-concepts')
      dataRetentionConcept.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      conret.value = null
      nature.value = null
      basevalue.value = null
      withholdingpercentage.value = null
      holdvalue.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            conret: conret.value,
            basevalue: basevalue.value,
            withholdingpercentage: withholdingpercentage.value,
            holdvalue: holdvalue.value,
            nature: nature.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccentsubdets()
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
      nature.value = row.nature
      conret.value = row.conret
      basevalue.value = row.basevalue
      withholdingpercentage.value = row.withholdingpercentage
      holdvalue.value = row.holdvalue
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            conret: conret.value,
            basevalue: basevalue.value,
            nature: nature.value,
            withholdingpercentage: withholdingpercentage.value,
            holdvalue: holdvalue.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccentsubdets()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el sub formulario de detalles: ' + row.id + '?',
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
          getAccentsubdets()
        })
      })
    }
    const filterRetentionConcept = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsRetentionConcept.value = dataRetentionConcept.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsRetentionConcept.value = dataRetentionConcept.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataAccentsubdets,
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
      conret,
      basevalue,
      withholdingpercentage,
      holdvalue,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      natures,
      nature,
      getRetentionConcept,
      dataRetentionConcept,
      filterRetentionConcept,
      filterOptionsRetentionConcept
    }
  }
})
</script>
