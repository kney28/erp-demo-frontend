<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-table dense title="Saldos de cuentas" :rows="rows" :filter="filter" :columns="columns" row-key="id" :loading="loading"
      color="primary">
      <template v-slot:top-left>
        <q-btn unelevated rounded icon="add" color="primary" @click="add" label="Agregar" />
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
          <q-td key="month" :props="props">
            {{ months.find((month) => month.id === props.row.month).name }}
          </q-td>
          <q-td key="third" :props="props">
            {{ props.row.third }}
          </q-td>
          <q-td key="debit" :props="props">
            {{ props.row.debit }}
          </q-td>
          <q-td key="credit" :props="props">
            {{ props.row.credit }}
          </q-td>
          <q-td key="status" :props="props">
            {{ statuses.find((status) => status.id === props.row.status).name }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn round size="xs" color="primary" icon="border_color" @click="onEdit(props.row)" />
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn round size="xs" color="red" icon="delete_forever" @click="onDelete(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="dialog"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">Saldo de cuenta</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form ref="myForm" @submit.prevent="" autocomplete="off">
            <div class="row q-col-gutter-sm">
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="accountBalance.month"
                  :options="months"
                  option-label="name"
                  option-value="id"
                  map-options
                  emit-value
                  label="Mes"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6">
                <q-input filled v-model="accountBalance.third" label="Tercero *" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input filled v-model="accountBalance.debit" label="Débito *" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input filled v-model="accountBalance.credit" label="Crédito *" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="accountBalance.status"
                  :options="statuses"
                  option-label="name"
                  option-value="id"
                  map-options
                  emit-value
                  label="Estado"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions v-if="!loading" align="right" class="bg-white text-teal">
          <q-btn label="Cancelar" v-close-popup color="negative" />
          <q-btn v-if="!isEditing" label="Guardar" @click.prevent="onSubmit" color="primary" />
          <q-btn v-else label="Actualizar" @click.prevent="onUpdate" color="primary" />
        </q-card-actions>
        <q-card-actions v-else align="right" class="bg-white text-teal">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'accountBalancesPage',
  setup () {
    const $q = useQuasar()

    const dialog = ref(false)
    const loading = ref(false)
    const isEditing = ref(false)
    const disableSave = ref(false)
    const search = ref('')
    const myForm = ref(null)
    const rows = ref([])
    const id = ref()
    const accountBalance = reactive({
      month: null,
      third: null,
      debit: null,
      credit: null,
      status: null
    })
    const filter = ref('')
    const columns = [
      { name: 'month', align: 'center', label: 'Mes', field: 'month', sortable: true },
      { name: 'third', align: 'center', label: 'Tercero', field: 'third', sortable: true },
      { name: 'debit', align: 'center', label: 'Débito', field: 'debit', sortable: true },
      { name: 'credit', align: 'center', label: 'Crédito', field: 'credit', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: false },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: false }
    ]
    const months = reactive([
      { id: 1, name: 'Enero' },
      { id: 2, name: 'febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'noviembre' },
      { id: 12, name: 'Diciembre' },
      { id: 13, name: 'Cierre' },
      { id: 14, name: 'Acumulado' }
    ])
    const statuses = [
      { id: 1, name: 'Activo' },
      { id: 2, name: 'Inactivo' }
    ]

    const add = () => {
      isEditing.value = false
      dialog.value = true
      onReset()
    }
    const onReset = () => Object.keys(accountBalance).forEach((i) => (accountBalance[i] = null))
    const onSubmit = () => {
      myForm.value.validate().then(success => {
        if (success) {
          loading.value = true
          api.post('account-balances', accountBalance).then(response => {
            loadList()
            dialog.value = false
          }).catch(e => {
            if (e) {
              console.log(e)
            }
          })
          loading.value = false
        }
      })
    }
    const onUpdate = () => {
      myForm.value.validate().then(success => {
        if (success) {
          loading.value = true
          api.patch('account-balances/' + id.value, accountBalance).then(response => {
            loadList()
            dialog.value = false
          }).catch(e => {
            if (e) {
              console.log(e)
            }
          })
          loading.value = false
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Desea eliminar el registro?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete(`account-balances/${row.id}`).then(response => {
          loadList()
        }).catch(e => {
          if (e) {
            console.log(e)
          }
        })
      })
    }
    const loadList = async () => {
      api.get('account-balances').then(response => {
        rows.value = response.data
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      })
    }

    onMounted(async () => {
      loading.value = true
      await loadList()
      loading.value = false
    })

    return {
      rows,
      accountBalance,
      months,
      statuses,
      search,
      filter,
      dialog,
      loading,
      isEditing,
      disableSave,
      myForm,
      columns,
      add,
      onSubmit,
      onUpdate,
      onDelete
    }
  }
})
</script>
