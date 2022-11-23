<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataThird" :filter="filter" :columns="columns" row-key="name" >
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
                <q-td key="documenttype" :props="props">
                  {{ props.row.documenttype }}
                </q-td>
                <q-td key="document" :props="props">
                  {{ props.row.document }}
                </q-td>
                <q-td key="fullname" :props="props">
                  {{ props.row.firstname }}
                  {{ props.row.secondname }}
                  {{ props.row.firstsurname }}
                  {{ props.row.secondsurname }}
                </q-td>
                <q-td key="socialreason" :props="props">
                  {{ props.row.socialreason }}
                </q-td>
                <q-td key="legalnature" :props="props">
                  {{ props.row.legalnature }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ (props.row.status) ? 'Activo' : 'Inactivo' }}
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
            <div class="col-md-5">
              <q-input
                white
                color="blue"
                v-model="username"
                label="Usuario *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-5">
              <q-input
                white
                color="blue"
                v-model="role"
                label="Rol *"
                stack-label
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div class="row justify-around">
            <div class="col-md-11">
              <q-input
                white
                color="blue"
                v-model="name"
                label="Nombre completo *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div v-if="!isEditing" class="row justify-around">
            <div class="col-md-5">
              <q-input
                white
                color="blue"
                type="password"
                v-model="password"
                label="Contraseña *"
                stack-label
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-5">
              <q-input
                white
                color="blue"
                type="password"
                v-model="confirmationPassword"
                label="Repetir contraseña *"
                stack-label
                v-on:change="validatePassword()"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div v-if="changePassword" class="row justify-around">
            <div class="col-md-5">
              <q-input
                white
                type="password"
                color="blue"
                v-model="newPassword"
                label="Contraseña *"
                stack-label
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-5">
              <q-input
                white
                type="password"
                color="blue"
                v-model="confirmationPassword"
                label="Repetir contraseña *"
                stack-label
                v-on:change="validatePassword()"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div class="row justify-around">
            <div class="col-md-5">
              <q-toggle v-model="active" label="Estado usuario"/>
            </div>
            <div v-if="isEditing" class="col-md-5">
              <q-toggle v-model="changePassword" label="Cambiar Contraseña"/>
            </div>
            <div v-else class="col-md-5">
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

export default defineComponent({
  name: 'ThirdsPage',
  setup () {
    const path = '/thirdpersons'
    const socialreason = ref(null)
    const document = ref(null)
    const documenttype = ref(null)
    const legalnature = ref(null)
    const status = ref(null)
    const firstname = ref(null)
    const secondname = ref(null)
    const firstsurname = ref(null)
    const secondsurname = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataThird = ref([])
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'documenttype', align: 'center', label: 'Tipo documento', field: 'documenttype', sortable: true },
      { name: 'document', align: 'center', label: 'Documento', field: 'document', sortable: true },
      { name: 'fullname', align: 'center', label: 'Nombre completo', field: 'fullname', sortable: true },
      { name: 'socialreason', align: 'center', label: 'Razón social', field: 'socialreason', sortable: true },
      { name: 'legalnature', align: 'center', label: 'Naturaleza', field: 'legalnature', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getThirds()
    })

    const getThirds = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataThird.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
    }

    const onReset = () => {
      // active.value = false
      isEditing.value = false
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            // password: password.value,
            // active: active.value
          }).then(() => {
            dialog.value = false
            getThirds()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
    }

    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            // active: active.value
          }).then(() => {
            dialog.value = false
            getThirds()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar al usuario: ' + row.username + '?',
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
          getThirds()
        })
      })
    }

    return {
      dialog,
      dataThird,
      isEditing,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      socialreason,
      document,
      documenttype,
      legalnature,
      status,
      firstname,
      secondname,
      firstsurname,
      secondsurname
    }
  }
})
</script>
