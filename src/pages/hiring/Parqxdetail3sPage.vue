<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Parqxdetail3" :rows="dataParqxdetail3s" :filter="filter" :columns="columns" row-key="name" >
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
<q-td key="parameterizationqx" :props="props">
{{ props.row.parameterizationqx }}
</q-td>
<q-td key="assistantvalue" :props="props">
{{ props.row.assistantvalue }}
</q-td>
<q-td key="roomrightvalue" :props="props">
{{ props.row.roomrightvalue }}
</q-td>
<q-td key="roomrightypeuvr" :props="props">
{{ props.row.roomrightypeuvr }}
</q-td>
<q-td key="uvrinitialrango" :props="props">
{{ props.row.uvrinitialrango }}
</q-td>
<q-td key="matheaser" :props="props">
{{ props.row.matheaser }}
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
v-model="parameterizationqx"
label="parameterizationqx *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="assistantvalue"
label="assistantvalue *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="roomrightvalue"
label="roomrightvalue *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="roomrightypeuvr"
label="roomrightypeuvr *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="uvrinitialrango"
label="uvrinitialrango *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="matheaser"
label="matheaser *"
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
  name: 'Parqxdetail3sPage',
  setup () {
    const path = '/parqxdetail3s'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataParqxdetail3s = ref([])
    const code = ref(null)
    const parameterizationqx = ref(null)
    const assistantvalue = ref(null)
    const roomrightvalue = ref(null)
    const roomrightypeuvr = ref(null)
    const uvrinitialrango = ref(null)
    const matheaser = ref(null)
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
      { name: 'parameterizationqx', align: 'center', label: 'parameterizationqx', field: 'parameterizationqx', sortable: true },
      { name: 'assistantvalue', align: 'center', label: 'assistantvalue', field: 'assistantvalue', sortable: true },
      { name: 'roomrightvalue', align: 'center', label: 'roomrightvalue', field: 'roomrightvalue', sortable: true },
      { name: 'roomrightypeuvr', align: 'center', label: 'roomrightypeuvr', field: 'roomrightypeuvr', sortable: true },
      { name: 'uvrinitialrango', align: 'center', label: 'uvrinitialrango', field: 'uvrinitialrango', sortable: true },
      { name: 'matheaser', align: 'center', label: 'matheaser', field: 'matheaser', sortable: true },
      { name: 'status', align: 'center', label: 'status', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getParqxdetail3s()
    })
    const getParqxdetail3s = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataParqxdetail3s.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      parameterizationqx.value = null
      assistantvalue.value = null
      roomrightvalue.value = null
      roomrightypeuvr.value = null
      uvrinitialrango.value = null
      matheaser.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            parameterizationqx: parameterizationqx.value,
            assistantvalue: assistantvalue.value,
            roomrightvalue: roomrightvalue.value,
            roomrightypeuvr: roomrightypeuvr.value,
            uvrinitialrango: uvrinitialrango.value,
            matheaser: matheaser.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail3s()
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
      parameterizationqx.value = row.parameterizationqx
      assistantvalue.value = row.assistantvalue
      roomrightvalue.value = row.roomrightvalue
      roomrightypeuvr.value = row.roomrightypeuvr
      uvrinitialrango.value = row.uvrinitialrango
      matheaser.value = row.matheaser
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            parameterizationqx: parameterizationqx.value,
            assistantvalue: assistantvalue.value,
            roomrightvalue: roomrightvalue.value,
            roomrightypeuvr: roomrightypeuvr.value,
            uvrinitialrango: uvrinitialrango.value,
            matheaser: matheaser.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail3s()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la parqxdetail3: ' + row.id + '?',
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
          getParqxdetail3s()
        })
      })
    }
    return {
      dialog,
      dataParqxdetail3s,
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
      parameterizationqx,
      assistantvalue,
      roomrightvalue,
      roomrightypeuvr,
      uvrinitialrango,
      matheaser,
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
