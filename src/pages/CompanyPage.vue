<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-table
      dense
      title="Empresas"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="legal_representative" :props="props">
            {{ props.row.legal_representative }}
          </q-td>
          <q-td key="company_type" :props="props">
            {{ companyTypes.find((company_type) => company_type.id === props.row.company_type).name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="third" :props="props">
            {{ props.row.third.fullname }}
          </q-td>
          <q-td key="license" :props="props">
            {{ props.row.license }}
          </q-td>
          <q-td key="status" :props="props">
            {{ statuses.find((status) => status.id === props.row.status).name }}
          </q-td>
          <q-td key="neighborhood" :props="props">
            {{ props.row.neighborhood.description }}
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
          <div class="text-h6">Empresas</div>
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
                <q-input filled v-model="company.name" label="Nombre *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-6">
                <q-input filled v-model="company.legal_representative" label="Representante legal *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="company.company_type"
                  :options="companyTypes"
                  option-label="name"
                  option-value="id"
                  map-options
                  emit-value
                  label="Tipo"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-6">
                <q-input filled v-model="company.email" label="Correo electrónico *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="company.third"
                  :options="thirds"
                  option-label="fullname"
                  option-value="id"
                  map-options
                  emit-value
                  label="Tercero"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-6">
                <q-input filled v-model="company.license" label="Licencia *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"/>
              </div>
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="company.status"
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
              <div class="col-md-6">
                <q-select
                  filled
                  v-model="company.neighborhood"
                  :options="neighborhoods"
                  option-label="description"
                  option-value="code"
                  map-options
                  emit-value
                  label="Barrios"
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
  name: 'companyPage',
  setup () {
    const $q = useQuasar()

    const path = 'companies'
    const id = ref()
    const myForm = ref(null)
    const company = reactive({
      name: null,
      legal_representative: null,
      company_type: null,
      email: null,
      third: null,
      license: null,
      status: null,
      neighborhood: null
    })
    const thirds = ref([])
    const neighborhoods = ref([])
    const rows = ref([])
    const filter = ref('')
    const columns = [
      { name: 'name', align: 'center', label: 'Nombre', field: 'name', sortable: true },
      { name: 'legal_representative', align: 'center', label: 'Representante legal', field: 'legal_representative', sortable: true },
      { name: 'company_type', align: 'center', label: 'Tipo', field: 'company_type', sortable: true },
      { name: 'email', align: 'center', label: 'Correo electrónico', field: 'email', sortable: true },
      { name: 'third', align: 'center', label: 'Tercero', field: 'third', sortable: true },
      { name: 'license', align: 'center', label: 'Licencia', field: 'license', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'neighborhood', align: 'center', label: 'Barrio', field: 'neighborhood', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: false },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: false }
    ]
    const companyTypes = [
      { id: 0, name: 'Ninguno' },
      { id: 1, name: 'Público' },
      { id: 2, name: 'Privado' }
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
    const getThirds = async () => {
      api.get('thirdperson').then(response => {
        thirds.value = response.data
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      }).finally(() => {
        loading.value = false
      })
    }
    const getNeihborhoods = async () => {
      api.get('neighborhoods').then(response => {
        neighborhoods.value = response.data
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
          api.post(path, company).then(response => {
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
      company.name = row.name
      company.legal_representative = row.legal_representative
      company.company_type = row.company_type
      company.email = row.email
      company.third = row.third.id
      company.license = row.license
      company.neighborhood = row.neighborhood.code
      company.status = row.status
      isEditing.value = true
      dialog.value = true
    }
    const onEdit = () => {
      myForm.value.validate().then(success => {
        if (success) {
          api.patch(`${path}/${id.value}`, company).then(response => {
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
    const onReset = () => Object.keys(company).forEach((i) => (company[i] = null))

    onMounted(async () => {
      getAll()
      getThirds()
      getNeihborhoods()
    })

    return {
      company,
      myForm,
      rows,
      columns,
      companyTypes,
      statuses,
      thirds,
      neighborhoods,
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
