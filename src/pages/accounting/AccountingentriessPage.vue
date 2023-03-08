<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accountingentries" :rows="dataAccountingentriess" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="accval" :props="props">
{{ props.row.accval }}
</q-td>
<q-td key="consecutive" :props="props">
{{ props.row.consecutive }}
</q-td>
<q-td key="condition" :props="props">
{{ statedocument[props.row.condition - 1].description }}
</q-td>
<q-td key="datedocument" :props="props">
{{ props.row.datedocument }}
</q-td>
<q-td key="detail" :props="props">
{{ props.row.detail }}
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
v-model="accval"
label="Vigencia Contable *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="consecutive"
label="Consecutivo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-select
white
color="blue"
v-model="condition"
label="Estado *"
option-label="description"
option-value="id"
:options="statedocument"
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
type="date"
v-model="datedocument"
label="Fecha Documento *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="detail"
label="Detalle *"
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
import { STATEDOCUMENT } from '../../constants/Constants'
export default defineComponent({
  name: 'AccountingentriessPage',
  setup () {
    const path = 'accounting/accountingentriess'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccountingentriess = ref([])
    const code = ref(null)
    const accval = ref(null)
    const statedocument = ref(STATEDOCUMENT)
    const condition = ref(null)
    const consecutive = ref(null)
    const datedocument = ref(null)
    const detail = ref(null)
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
      { name: 'accval', align: 'center', label: 'Vigencia Contable', field: 'accval', sortable: true },
      { name: 'consecutive', align: 'center', label: 'Consecutivo', field: 'consecutive', sortable: true },
      { name: 'condition', align: 'center', label: 'Estado', field: 'condition', sortable: true },
      { name: 'datedocument', align: 'center', label: 'Fecha Documento', field: 'datedocument', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccountingentriess()
    })
    const getAccountingentriess = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccountingentriess.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      accval.value = null
      consecutive.value = null
      datedocument.value = null
      detail.value = null
      isEditing.value = false
      active.value = false
      condition.value = null
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            accval: accval.value,
            consecutive: consecutive.value,
            datedocument: datedocument.value,
            detail: detail.value,
            condition: condition.value
          }).then(() => {
            dialog.value = false
            getAccountingentriess()
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
      accval.value = row.accval
      consecutive.value = row.consecutive
      datedocument.value = row.datedocument
      detail.value = row.detail
      condition.value = row.statusdocument
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            accval: accval.value,
            consecutive: consecutive.value,
            datedocument: datedocument.value,
            detail: detail.value,
            condition: condition.value
          }).then(() => {
            dialog.value = false
            getAccountingentriess()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la principal: ' + row.id + '?',
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
          getAccountingentriess()
        })
      })
    }
    return {
      dialog,
      dataAccountingentriess,
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
      accval,
      consecutive,
      datedocument,
      detail,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      statedocument,
      condition
    }
  }
})
</script>
