<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Accbalmov" :rows="dataAccbalmovs" :filter="filter" :columns="columns" row-key="name" >
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

<!--The next column is ENUM, please complete the code necessary
<q-td key="month" :props="props">
{{ props.row.month }}</q-td>-->
                <q-td key="month" :props="props">
                  {{ MESES[props.row.month - 1 ].description }}
                </q-td>
<q-td key="idledgeraccount" :props="props">
{{ props.row.idledgeraccount.description }}
</q-td>
<q-td key="idthird" :props="props">
{{ props.row.idthird.fullname }}
</q-td>
<q-td key="idcostcenter" :props="props">
{{ props.row.idcostcenter.description }}
</q-td>
<q-td key="debit" :props="props">
{{ props.row.debit }}
</q-td>
<q-td key="credit" :props="props">
{{ props.row.credit }}
</q-td>
<!--The next column is ENUM, please complete the code necessary
<q-td key="status" :props="props">
{{ props.row.status }}</q-td>-->
<q-td key="status" :props="props">
                  {{ states[props.row.status - 1].description }}
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
                <q-select white color="blue" v-model="month" label="Mes *" option-label="description" option-value="id"
                  :options="MESES" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
<!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="month"
//label="month *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="idledgeraccount"
                label="Cuenta *"
                @filter="filterFnAccountCatalog"
                :options="filterOptionsAccountCatalog"
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
                v-model="idthird"
                label="Tercero *"
                @filter="filterFnAccountCenter"
                :options="filterOptionsAccountThirPerson"
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
                v-model="idcostcenter"
                label="Centro de costo *"
                @filter="filterFnAccountCenter"
                :options="filterOptionsAccountCenter"
                option-value="id"
                option-label="description"
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
v-model="debit"
label="debit *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="credit"
label="credit *"
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
              <div class="col-md-3">
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
import { LISTSTATUSCOUNTING, ACTIVE, INACTIVE, MES } from '../../constants/Constants'
export default defineComponent({
  name: 'AccbalmovsPage',
  setup () {
    const path = '/accbalmovs'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAccbalmovs = ref([])
    const idledgeraccount = ref(null)
    const idthird = ref(null)
    const idcostcenter = ref(null)
    const debit = ref(null)
    const credit = ref(null)
    const role = ref(null)
    const active = ref(false)
    const dataStatus = ref([])
    const status = ref(null)
    const states = ref(LISTSTATUSCOUNTING)
    const dataMonth = ref([])
    const month = ref(null)
    const MESES = ref(MES)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const dataAccountCenter = ref([])
    const filterOptionsAccountCenter = ref(dataAccountCenter)
    const dataAccountThirPerson = ref([])
    const filterOptionsAccountThirPerson = ref(dataAccountThirPerson)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'month', align: 'center', label: 'Mes', field: 'month', sortable: true },
      { name: 'idledgeraccount', align: 'center', label: 'Cuenta', field: 'idledgeraccount', sortable: true },
      { name: 'idthird', align: 'center', label: 'Tercero', field: 'idthird', sortable: true },
      { name: 'idcostcenter', align: 'center', label: 'Centro de costo', field: 'idcostcenter', sortable: true },
      { name: 'debit', align: 'center', label: 'Débito', field: 'debit', sortable: true },
      { name: 'credit', align: 'center', label: 'Crédito', field: 'credit', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAccbalmovs()
      getStatus()
      getMonth()
      getAccountCatalog()
      getAccountCenter()
      getAccountThirPerson()
    })
    const getAccbalmovs = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccbalmovs.value = data
      visible.value = false
    }
    const getStatus = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataStatus.value = data
      visible.value = false
    }
    const getMonth = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataMonth.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 5)
      visible.value = false
    }
    const getAccountCenter = async () => {
      visible.value = true
      const { data } = await api.get('/acccostcenterss')
      dataAccountCenter.value = data
      visible.value = false
    }
    const getAccountThirPerson = async () => {
      visible.value = true
      const { data } = await api.get('/thirdperson')
      dataAccountThirPerson.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      idledgeraccount.value = null
      idthird.value = null
      idcostcenter.value = null
      debit.value = null
      credit.value = null
      isEditing.value = false
      active.value = false
      month.value = null
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            idledgeraccount: idledgeraccount.value,
            idthird: idthird.value,
            idcostcenter: idcostcenter.value,
            debit: debit.value,
            credit: credit.value,
            month: month.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbalmovs()
          })
        }
      })
    }
    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      idledgeraccount.value = row.idledgeraccount
      idthird.value = row.idthird
      idcostcenter.value = row.idcostcenter
      debit.value = row.debit
      credit.value = row.credit
      month.value = row.month
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            idledgeraccount: idledgeraccount.value,
            idthird: idthird.value,
            idcostcenter: idcostcenter.value,
            debit: debit.value,
            credit: credit.value,
            month: month.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccbalmovs()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar saldos de la cuenta ' + row.idledgeraccount.description + ' del tercero ' + row.idthird.fullname + '?',
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
          getAccbalmovs()
        })
      })
    }

    const filterFnAccountCatalog = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountCatalog.value = dataAccountCatalog.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountCatalog.value = dataAccountCatalog.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFnAccountCenter = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountCenter.value = dataAccountCenter.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountCenter.value = dataAccountCenter.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFnAccountThirPerson = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountThirPerson.value = dataAccountThirPerson.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountThirPerson.value = dataAccountThirPerson.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      dialog,
      dataAccbalmovs,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      idledgeraccount,
      idthird,
      idcostcenter,
      debit,
      credit,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      status,
      states,
      MESES,
      month,
      filterFnAccountCatalog,
      filterOptionsAccountCatalog,
      dataAccountCatalog,
      dataAccountCenter,
      filterFnAccountCenter,
      filterOptionsAccountCenter,
      dataAccountThirPerson,
      filterFnAccountThirPerson,
      filterOptionsAccountThirPerson
    }
  }
})
</script>
