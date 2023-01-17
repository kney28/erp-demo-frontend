<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-table
      dense
      title="Centro de costos"
      :rows="rows"
      :filter="filter"
      :columns="columns"
      row-key="id"
      :loading="loading"
      color="primary"
    >
      <template v-slot:top-left>
        <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar"/>
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
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn round size="xs" color="primary" icon="border_color" @click="editing(props.row)" />
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn round size="xs" color="negative" icon="delete_forever" @click="onDelete(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Centro de costos</div>
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
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input filled v-model="costCenter.code" label="Código *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-6">
                <q-input filled v-model="costCenter.description" label="Descripción *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="costCenter.status"
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
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Cancelar" v-close-popup color="negative"/>
          <q-btn :disable="disableSave" v-if="!isEditing" label="Guardar" @click.prevent="onCreate" color="primary"/>
          <q-btn v-else label="Actualizar" @click.prevent="onEdit" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'userPage',
  setup () {
    const $q = useQuasar()

    const path = 'costcenter'
    const id = ref()
    const myForm = ref(null)
    const costCenter = reactive({
      code: null,
      description: null,
      status: null
    })
    const rows = ref([])
    const filter = ref('')
    const columns = [
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: false },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: false }
    ]
    const statuses = [
      { id: 1, name: 'Activo' },
      { id: 2, name: 'Inactivo' }
    ]
    const loading = ref(false)
    const dialog = ref(false)
    const isEditing = ref(false)
    const disableSave = ref(false)

    const getAll = async () => {
      loading.value = true
      api.get(path).then(response => {
        rows.value = response.data
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      }).finally(() => {
        loading.value = false
      })
    }
    const creating = () => {
      onReset()
      isEditing.value = false
      dialog.value = true
    }
    const onCreate = () => {
      myForm.value.validate().then(success => {
        if (success) {
          api.post(path, costCenter).then(response => {
            getAll()
            dialog.value = false
          }).catch(e => {
            if (e) {
              console.log(e)
            }
          })
        }
      })
    }
    const editing = (row) => {
      onReset()
      id.value = row.id
      costCenter.code = row.code
      costCenter.description = row.description
      costCenter.status = row.status
      isEditing.value = true
      dialog.value = true
    }
    const onEdit = () => {
      myForm.value.validate().then(success => {
        if (success) {
          api.patch(`${path}/${id.value}`, costCenter).then(response => {
            getAll()
            dialog.value = false
          }).catch(e => {
            if (e) {
              console.log(e)
            }
          })
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
        api.delete(`${path}/${row.id}`).then(response => {
          getAll()
        }).catch(e => {
          if (e) {
            console.log(e)
          }
        })
      })
    }
    const onReset = () => Object.keys(costCenter).forEach((i) => (costCenter[i] = null))

    onMounted(async () => {
      getAll()
    })

    return {
      costCenter,
      myForm,
      rows,
      columns,
      statuses,
      filter,
      loading,
      dialog,
      isEditing,
      disableSave,
      creating,
      onCreate,
      editing,
      onEdit,
      onDelete
    }
  }
})
</script>
