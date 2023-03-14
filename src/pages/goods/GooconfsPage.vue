<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Gooconf" :rows="dataGooconfs" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="idgoocla" :props="props">
{{ props.row.idgoocla.description }}
</q-td>
<q-td key="idaccpar" :props="props">
{{ props.row.idaccpar.description }}
</q-td>
<q-td key="tipgoo" :props="props">
{{ typegoods[props.row.tipgoo-1].description  }}
</q-td>
<q-td key="gendep" :props="props">
{{ gendeps[props.row.gendep-1].description  }}
</q-td>
<q-td key="typuselif" :props="props">
{{ typeusefullife[props.row.typuselif-1].description }}
</q-td>
<q-td key="uselif" :props="props">
{{ props.row.uselif }}
</q-td>
<q-td key="coniva" :props="props">
{{ props.row.coniva }}
</q-td>
<q-td key="resvaltyp" :props="props">
{{ residualvaluetype[props.row.resvaltyp-1].description }}
</q-td>
<q-td key="resval" :props="props">
{{ props.row.resval }}
</q-td>
<q-td key="status" :props="props">
  {{ state[props.row.status] }}
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
    v-model="idgoocla"
    label="Clasificación de Bienes *"
    @filter="filterFnGooClass"
    :options="filterOptionsGooClass"
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
    v-model="idaccpar"
    label="Parametrización Contable *"
    @filter="filterFnGooPars"
    :options="filterOptionsGooPars"
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
v-model="tipgoo"
label="Tipo de Bien *"
option-label="description"
option-value="id"
:options="typegoods"
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
v-model="gendep"
label="Genera Depreciación *"
option-label="description"
option-value="id"
:options="gendeps"
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
v-model="typuselif"
label="Tipo Vida Útil *"
option-label="description"
option-value="id"
:options="typeusefullife"
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
v-model="uselif"
label="Vida Útil *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="coniva"
label="Concepto de IVA *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="resvaltyp"
label="Tipo Valor Residual *"
option-label="description"
option-value="id"
:options="residualvaluetype"
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
v-model="resval"
label="Valor Residual *"
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
import { ACTIVE, INACTIVE, STATUS, TYPEGOODS, RESIDUALVALUETYPE, GENDEP, TYPEUSEFULLIFE } from '../../constants/Constants'
export default defineComponent({
  name: 'GooconfsPage',
  setup () {
    const path = '/goods/gooconfs'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataGooconfs = ref([])
    const dataGooClass = ref([])
    const dataGooPars = ref([])
    const filterOptionsGooClass = ref(dataGooClass)
    const filterOptionsGooPars = ref(dataGooPars)
    const code = ref(null)
    const state = ref(STATUS)
    const typegoods = ref(TYPEGOODS)
    const tipgoo = ref(null)
    const residualvaluetype = ref(RESIDUALVALUETYPE)
    const resvaltyp = ref(null)
    const gendeps = ref(GENDEP)
    const gendep = ref(null)
    const typeusefullife = ref(TYPEUSEFULLIFE)
    const typuselif = ref(null)
    const description = ref(null)
    const idgoocla = ref(null)
    const idaccpar = ref(null)
    const uselif = ref(null)
    const coniva = ref(null)
    const resval = ref(null)
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
      { name: 'idgoocla', align: 'center', label: 'Clasificación de Bienes', field: 'idgoocla', sortable: true },
      { name: 'idaccpar', align: 'center', label: 'Parametrización Contable', field: 'idaccpar', sortable: true },
      { name: 'tipgoo', align: 'center', label: 'Tipo de Bien', field: 'tipgoo', sortable: true },
      { name: 'gendep', align: 'center', label: 'Genera Depreciación', field: 'gendep', sortable: true },
      { name: 'typuselif', align: 'center', label: 'Tipo Vida Útil', field: 'typuselif', sortable: true },
      { name: 'uselif', align: 'center', label: 'Vida Útil', field: 'uselif', sortable: true },
      { name: 'coniva', align: 'center', label: 'Concepto de IVA', field: 'coniva', sortable: true },
      { name: 'resvaltyp', align: 'center', label: 'Tipo Valor Residual', field: 'resvaltyp', sortable: true },
      { name: 'resval', align: 'center', label: 'Valor Residual', field: 'resval', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getGooconfs()
      getGooClass()
      getGooPars()
    })
    const getGooconfs = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataGooconfs.value = data
      visible.value = false
    }
    const getGooClass = async () => {
      visible.value = true
      const { data } = await api.get('/goods/gooclas')
      dataGooClass.value = data
      visible.value = false
    }
    const getGooPars = async () => {
      visible.value = true
      const { data } = await api.get('/goods/goopars')
      dataGooPars.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      tipgoo.value = null
      gendep.value = null
      idgoocla.value = null
      idaccpar.value = null
      typuselif.value = null
      uselif.value = null
      coniva.value = null
      resvaltyp.value = null
      resval.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idgoocla: idgoocla.value,
            idaccpar: idaccpar.value,
            tipgoo: tipgoo.value,
            gendep: gendep.value,
            typuselif: typuselif.value,
            uselif: uselif.value,
            coniva: coniva.value,
            resvaltyp: resvaltyp.value,
            resval: resval.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getGooconfs()
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
      idgoocla.value = row.idgoocla
      idaccpar.value = row.idaccpar
      typuselif.value = row.typuselif
      uselif.value = row.uselif
      coniva.value = row.coniva
      resvaltyp.value = row.resvaltyp
      resval.value = row.resval
      tipgoo.value = row.tipgoo
      gendep.value = row.gendep
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
            idgoocla: idgoocla.value,
            idaccpar: idaccpar.value,
            typuselif: typuselif.value,
            uselif: uselif.value,
            coniva: coniva.value,
            resvaltyp: resvaltyp.value,
            resval: resval.value,
            tipgoo: tipgoo.value,
            gendep: gendep.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getGooconfs()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la configuracíon de bienes: ' + row.id + '?',
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
          getGooconfs()
        })
      })
    }
    const filterFnGooClass = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsGooClass.value = dataGooClass.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsGooClass.value = dataGooClass.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnGooPars = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsGooPars.value = dataGooPars.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsGooPars.value = dataGooPars.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataGooconfs,
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
      idgoocla,
      idaccpar,
      typuselif,
      uselif,
      coniva,
      resvaltyp,
      resval,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      state,
      typegoods,
      tipgoo,
      residualvaluetype,
      gendeps,
      gendep,
      typeusefullife,
      dataGooClass,
      filterOptionsGooClass,
      filterFnGooClass,
      dataGooPars,
      filterOptionsGooPars,
      filterFnGooPars
    }
  }
})
</script>
