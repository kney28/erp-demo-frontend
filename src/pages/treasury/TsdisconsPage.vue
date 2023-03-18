<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Tsdiscon" :rows="dataTsdiscons" :filter="filter" :columns="columns" row-key="name" >
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
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="inttypcxp" :props="props">
{{ optionsInterfaceCxp[props.row.inttypcxp - 1].description }}</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="budint" :props="props">
{{ props.row.budint }}</q-td>-->
<!--The next column is ENUM, please complete the code necessary-->
<q-td key="petcasreccon" :props="props">
{{ lisinUsoCouting[props.row.petcasreccon - 1].description }}</q-td>
<q-td key="idminbox" :props="props">
{{ props.row.idminbox }}
</q-td>
<!--The next column is ENUM, please complete the code necessary -->
<q-td key="retofadv" :props="props">
{{ lisinUsoCouting[props.row.retofadv - 1].description }}</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="petcasref" :props="props">
{{ props.row.petcasref }}</q-td>-->
<!--The next column is ENUM, please complete the code necessary
<q-td key="nature" :props="props">
{{ props.row.nature }}</q-td>-->
<!--The next column is ENUM, please complete the code necessary
<q-td key="idledacc" :props="props">
{{ props.row.idledacc }}</q-td>-->
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
v-model="description"
label="Descripciòn *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary-->
<div class="col-md-4">
 <q-select
   white
   color="blue"
   v-model="inttypcxp"
   label="Tipo de Interfaz *"
   :options="optionsInterfaceCxp"
   option-label="description"
   option-value="id"
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
//v-model="budint"
//label="budint *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<!--The next column is ENUM, please complete the code necessary -->
<div class="col-md-4">
 <q-select
   white
   color="blue"
   v-model="petcasreccon"
   label="Conceptos de Recibo de Caja Menor *"
   :options="lisinUsoCouting"
   option-label="description"
   option-value="id"
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
v-model="idminbox"
label="idminbox *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<!--The next column is ENUM, please complete the code necessary-->
<div class="col-md-4">
  <q-select
   white
   color="blue"
   v-model="retofadv"
   label="Devoluciòn de Anticipo *"
   :options="lisinUsoCouting"
   option-label="description"
   option-value="id"
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
//v-model="petcasref"
//label="petcasref *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="nature"
//label="nature *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="idledacc"
//label="idledacc *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
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
import { OPTIONSINTERFACECXP, LISINUSOCOUNTING } from '../../constants/Constants'
export default defineComponent({
  name: 'TsdisconsPage',
  setup () {
    const path = 'treasury/tsdiscons'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataTsdiscons = ref([])
    const code = ref(null)
    const description = ref(null)
    const idminbox = ref(null)
    const inttypcxp = ref(null)
    const petcasreccon = ref(null)
    const retofadv = ref(null)
    const role = ref(null)
    const active = ref(false)
    const optionsInterfaceCxp = ref(OPTIONSINTERFACECXP)
    const lisinUsoCouting = ref(LISINUSOCOUNTING)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Codigo', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripciòn', field: 'description', sortable: true },
      { name: 'inttypcxp', align: 'center', label: 'Tipo de Interfaz CXP', field: 'inttypcxp', sortable: true },
      { name: 'budint', align: 'center', label: 'Interfaz Presupuestal', field: 'budint', sortable: true },
      { name: 'petcasreccon', align: 'center', label: 'Concepto de Recibo de Caja Menor', field: 'petcasreccon', sortable: true },
      { name: 'idminbox', align: 'center', label: 'Caja Menor', field: 'idminbox', sortable: true },
      { name: 'retofadv', align: 'center', label: 'Devoluciòn de anticipo', field: 'retofadv', sortable: true },
      { name: 'petcasref', align: 'center', label: 'Reembolso de Anticipo', field: 'petcasref', sortable: true },
      { name: 'nature', align: 'center', label: 'Naturaleza', field: 'nature', sortable: true },
      { name: 'idledacc', align: 'center', label: 'Cuenta Contable', field: 'idledacc', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getTsdiscons()
    })
    const getTsdiscons = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataTsdiscons.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      idminbox.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            idminbox: idminbox.value
          }).then(() => {
            dialog.value = false
            getTsdiscons()
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
      idminbox.value = row.idminbox
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            description: description.value,
            idminbox: idminbox.value
          }).then(() => {
            dialog.value = false
            getTsdiscons()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmaci�n',
        message: '�Est� seguro que desea eliminar la tsdiscon: ' + row.id + '?',
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
          getTsdiscons()
        })
      })
    }
    return {
      dialog,
      dataTsdiscons,
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
      idminbox,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      optionsInterfaceCxp,
      onDelete,
      inttypcxp,
      lisinUsoCouting,
      petcasreccon,
      retofadv

    }
  }
})
</script>
