<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Parqxdetail2" :rows="dataParqxdetail2s" :filter="filter" :columns="columns" row-key="name" >
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
<!--The next column is ENUM, please complete the code necessary
<q-td key="roomrighttypes" :props="props">
{{ props.row.roomrighttypes }}</q-td>-->
<q-td key="roompercentage" :props="props">
{{ props.row.roompercentage }}
</q-td>
<q-td key="materialvalue" :props="props">
{{ props.row.materialvalue }}
</q-td>
<q-td key="matheaserv" :props="props">
{{ props.row.matheaserv }}
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
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="roomrighttypes"
//label="roomrighttypes *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<div class="col-md-4">
<q-input
white
color="blue"
v-model="roompercentage"
label="roompercentage *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="materialvalue"
label="materialvalue *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="matheaserv"
label="matheaserv *"
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
  name: 'Parqxdetail2sPage',
  setup () {
    const path = '/parqxdetail2s'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataParqxdetail2s = ref([])
    const code = ref(null)
    const parameterizationqx = ref(null)
    const roompercentage = ref(null)
    const materialvalue = ref(null)
    const matheaserv = ref(null)
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
      { name: 'roomrighttypes', align: 'center', label: 'roomrighttypes', field: 'roomrighttypes', sortable: true },
      { name: 'roompercentage', align: 'center', label: 'roompercentage', field: 'roompercentage', sortable: true },
      { name: 'materialvalue', align: 'center', label: 'materialvalue', field: 'materialvalue', sortable: true },
      { name: 'matheaserv', align: 'center', label: 'matheaserv', field: 'matheaserv', sortable: true },
      { name: 'status', align: 'center', label: 'status', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getParqxdetail2s()
    })
    const getParqxdetail2s = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataParqxdetail2s.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      parameterizationqx.value = null
      roompercentage.value = null
      materialvalue.value = null
      matheaserv.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            parameterizationqx: parameterizationqx.value,
            roompercentage: roompercentage.value,
            materialvalue: materialvalue.value,
            matheaserv: matheaserv.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail2s()
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
      roompercentage.value = row.roompercentage
      materialvalue.value = row.materialvalue
      matheaserv.value = row.matheaserv
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            parameterizationqx: parameterizationqx.value,
            roompercentage: roompercentage.value,
            materialvalue: materialvalue.value,
            matheaserv: matheaserv.value,
          }).then(() => {
            dialog.value = false
            getParqxdetail2s()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la parqxdetail2: ' + row.id + '?',
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
          getParqxdetail2s()
        })
      })
    }
    return {
      dialog,
      dataParqxdetail2s,
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
      roompercentage,
      materialvalue,
      matheaserv,
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
