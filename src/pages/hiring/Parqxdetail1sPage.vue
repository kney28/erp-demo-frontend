<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Parqxdetail1" :rows="dataParqxdetail1s" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="parameterizationxp" :props="props">
{{ props.row.parameterizationxp }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="typesurgery" :props="props">
{{ props.row.typesurgery }}</q-td>-->
<q-td key="numbersurgeries" :props="props">
{{ props.row.numbersurgeries }}
</q-td>
<q-td key="surgeon" :props="props">
{{ props.row.surgeon }}
</q-td>
<q-td key="anesthesiologist" :props="props">
{{ props.row.anesthesiologist }}
</q-td>
<q-td key="surgical assistant" :props="props">
{{ props.row.surgical assistant }}
</q-td>
<q-td key="operoorig" :props="props">
{{ props.row.operoorig }}
</q-td>
<q-td key="meterials" :props="props">
{{ props.row.meterials }}
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
label="code *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="parameterizationxp"
label="parameterizationxp *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="typesurgery"
//label="typesurgery *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<div class="col-md-4">
<q-input
white
color="blue"
v-model="numbersurgeries"
label="numbersurgeries *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="surgeon"
label="surgeon *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="anesthesiologist"
label="anesthesiologist *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="surgical assistant"
label="surgical assistant *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="operoorig"
label="operoorig *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="meterials"
label="meterials *"
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
export default defineComponent({
  name: 'Parqxdetail1sPage',
  setup () {
    const path = '/parqxdetail1s'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataParqxdetail1s = ref([])
    const code = ref(null)
    const parameterizationxp = ref(null)
    const numbersurgeries = ref(null)
    const surgeon = ref(null)
    const anesthesiologist = ref(null)
    const surgical assistant = ref(null)
    const operoorig = ref(null)
    const meterials = ref(null)
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
      { name: 'code', align: 'center', label: 'code', field: 'code', sortable: true },
      { name: 'parameterizationxp', align: 'center', label: 'parameterizationxp', field: 'parameterizationxp', sortable: true },
      { name: 'typesurgery', align: 'center', label: 'typesurgery', field: 'typesurgery', sortable: true },
      { name: 'numbersurgeries', align: 'center', label: 'numbersurgeries', field: 'numbersurgeries', sortable: true },
      { name: 'surgeon', align: 'center', label: 'surgeon', field: 'surgeon', sortable: true },
      { name: 'anesthesiologist', align: 'center', label: 'anesthesiologist', field: 'anesthesiologist', sortable: true },
      { name: 'surgical assistant', align: 'center', label: 'surgical assistant', field: 'surgical assistant', sortable: true },
      { name: 'operoorig', align: 'center', label: 'operoorig', field: 'operoorig', sortable: true },
      { name: 'meterials', align: 'center', label: 'meterials', field: 'meterials', sortable: true },
      { name: 'status', align: 'center', label: 'status', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getParqxdetail1s()
    })
    const getParqxdetail1s = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataParqxdetail1s.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      parameterizationxp.value = null
      numbersurgeries.value = null
      surgeon.value = null
      anesthesiologist.value = null
      surgical assistant.value = null
      operoorig.value = null
      meterials.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            parameterizationxp: parameterizationxp.value,
            numbersurgeries: numbersurgeries.value,
            surgeon: surgeon.value,
            anesthesiologist: anesthesiologist.value,
            surgical assistant: surgical assistant.value,
            operoorig: operoorig.value,
            meterials: meterials.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail1s()
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
      parameterizationxp.value = row.parameterizationxp
      numbersurgeries.value = row.numbersurgeries
      surgeon.value = row.surgeon
      anesthesiologist.value = row.anesthesiologist
      surgical assistant.value = row.surgical assistant
      operoorig.value = row.operoorig
      meterials.value = row.meterials
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            parameterizationxp: parameterizationxp.value,
            numbersurgeries: numbersurgeries.value,
            surgeon: surgeon.value,
            anesthesiologist: anesthesiologist.value,
            surgical assistant: surgical assistant.value,
            operoorig: operoorig.value,
            meterials: meterials.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail1s()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la parqxdetail1: ' + row.id + '?',
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
          getParqxdetail1s()
        })
      })
    }
    return {
      dialog,
      dataParqxdetail1s,
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
      parameterizationxp,
      numbersurgeries,
      surgeon,
      anesthesiologist,
      surgical assistant,
      operoorig,
      meterials,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
    }
  }
})
</script>
