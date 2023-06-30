<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div class="col-12 text-center" v-if="logoCompny">
      <br><br>
      <q-img
        :src="logoCompny"
        width="200px"
      />
    </div>
    <div class="col-12 text-center" v-else>
      <br><br>
      <q-icon
        name="fa-solid fa-stethoscope"
        size="90px"
        style="color: #12506A"
        class="q-mb-lg"
      />
    </div>
    <div class="row">
      <div class="col-5"></div>
      <div class="col-2 text-center">
        <q-file
          filled
          bottom-slots
          v-model="logoCompny"
          label="Cambiar imagen"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="logoCompny = null" class="cursor-pointer" />
          </template>
          <template v-slot:hint>
            Tamaño de archivo
          </template>
        </q-file>
        <br><br>
      </div>
      <div class="col-5"></div>
      <div class="col-12">
        <q-toggle
          v-model="edit"
          label="Editar"
          @click="editElements = !editElements"
        />
      </div>
    </div>
    <q-card style="width: 100%;">
        <q-banner class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="warning" color="warning" />
          </template>
          Los campos marcados con (*) son obligatorios
        </q-banner>
        <q-card-section>
          <q-form ref="myForm" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-4">
                <q-input white color="blue" v-model="company.name" label="Nombre *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" :disable="editElements"/>
              </div>
              <div class="col-4">
                <q-input white color="blue" v-model="company.legal_representative" label="Representante legal *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" :disable="editElements"/>
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="company.company_type"
                  :options="companyTypes"
                  option-label="name"
                  option-value="id"
                  map-options
                  emit-value
                  label="Tipo"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                  :disable="editElements"
                />
              </div>
              <div class="col-4">
                <q-input white color="blue" v-model="company.email" label="Correo electrónico *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" :disable="editElements"/>
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="company.third"
                  :options="thirds"
                  option-label="fullname"
                  option-value="id"
                  map-options
                  emit-value
                  label="Tercero"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                  :disable="editElements"
                />
              </div>
              <div class="col-4">
                <q-input white color="blue" v-model="company.license" label="Licencia *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']" :disable="editElements"/>
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="company.neighborhood"
                  :options="neighborhoods"
                  option-label="description"
                  option-value="id"
                  map-options
                  emit-value
                  label="Barrios"
                  lazy-rules
                  :rules="[ val => val && val > 0 || 'El campo es obligatorio']"
                  :disable="editElements"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div class="col-md-6">
                <div class="row justify-around">
                  <div class="col-md-3">
                  </div>
                  <div class="col-md-3">
                    <q-toggle v-model="active" label="Estado" :disable="editElements"/>
                  </div>
                  <div class="col-md-3">
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-teal">
          <div v-if="!isEditing">
            <q-btn round icon="save" @click.prevent="onCreate" color="primary"/>
            <q-tooltip>Guardar datos</q-tooltip>
          </div>

          <div v-else-if="!editElements">
            <q-btn round icon="save" @click.prevent="onEdit" color="primary"/>
            <q-tooltip>Editar datos</q-tooltip>
          </div>
        </q-card-actions>
      </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { ACTIVE, INACTIVE } from 'src/constants/Constants'

export default defineComponent({
  name: 'companyPage',
  setup () {
    const $q = useQuasar()
    const path = 'configuration/companies'
    const companyName = ref(null)
    const logo = ref(null)
    const id = ref()
    const myForm = ref(null)
    const logoCompny = ref(null)
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
    const companyData = ref([])
    const filter = ref('')
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
    const edit = ref(false)
    const editElements = ref(true)
    const disableSave = ref(false)
    const active = ref(false)

    const getAll = async () => {
      loading.value = true
      api.get(path).then(response => {
        rows.value = response.data
        companyData.value = response.data ? response.data[0] : null
        if (companyData.value) {
          logoCompny.value = companyData.value.logo
          id.value = companyData.value.id
          company.name = companyData.value.name
          company.legal_representative = companyData.value.legal_representative
          company.company_type = companyData.value.company_type
          company.email = companyData.value.email
          company.third = companyData.value.third.id
          company.license = companyData.value.license
          company.neighborhood = companyData.value.neighborhood.id
          if (companyData.value.status === ACTIVE) {
            active.value = true
          }
          isEditing.value = true
        }
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      }).finally(() => {
        loading.value = false
      })
    }

    const getCompany = async () => {
      api.get('/company').then(response => {
        rows.value = response.data
        $q.cookies.set('companyName', rows.value[0].name)
        companyName.value = rows.value[0].name
        $q.cookies.set('logo', rows.value[0].logo)
        logo.value = rows.value[0].logo
      }).catch(e => {
        if (e) {
          console.log(e)
        }
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
      api.get('configuration/neighborhoods').then(response => {
        neighborhoods.value = response.data
      }).catch(e => {
        if (e) {
          console.log(e)
        }
      }).finally(() => {
        loading.value = false
      })
    }
    const onCreate = () => {
      company.status = active.value ? ACTIVE : INACTIVE
      myForm.value.validate().then(success => {
        if (success) {
          api.post(path, company).then(response => {
            getAll()
          }).then(getCompany()).catch(e => {
            if (e) {
              console.log(e)
            }
          })
        }
      })
    }
    const onEdit = () => {
      company.status = active.value ? ACTIVE : INACTIVE
      myForm.value.validate().then(success => {
        if (success) {
          api.patch(`${path}/${id.value}`, company).then(response => {
            if (response) {
              getAll()
            }
          }).then(getCompany()).catch(e => {
            if (e) {
              console.log(e)
            }
          })
        }
      })
    }

    onMounted(async () => {
      getAll()
      getThirds()
      getNeihborhoods()
      getCompany()
    })

    return {
      company,
      myForm,
      rows,
      companyTypes,
      statuses,
      thirds,
      neighborhoods,
      filter,
      loading,
      dialog,
      isEditing,
      edit,
      editElements,
      disableSave,
      onCreate,
      onEdit,
      active,
      logoCompny,
      companyData,
      companyName,
      logo
    }
  }
})
</script>
