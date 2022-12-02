<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataUser" :filter="filter" :columns="columns" row-key="name" >
            <template v-slot:top-left>
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
                <q-td key="username" :props="props">
                  {{ props.row.username }}
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
  name: 'ProfilesPage',
  setup () {
    const path = '/users'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataUser = ref([])
    const username = ref(null)
    const password = ref(null)
    const name = ref(null)
    const confirmationPassword = ref(null)
    const role = ref(null)
    const active = ref(false)
    const changePassword = ref(false)
    const newPassword = ref(null)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'username', align: 'center', label: 'Usuario', field: 'username', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getUsers()
    })

    const getUsers = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataUser.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
    }

    const onReset = () => {
      active.value = false
      username.value = null
      name.value = null
      password.value = null
      newPassword.value = null
      role.value = null
      changePassword.value = false
      confirmationPassword.value = null
      isEditing.value = false
    }

    const onSubmit = () => {
      validatePassword()
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            username: username.value,
            role: role.value,
            name: name.value,
            password: password.value,
            active: active.value
          }).then(() => {
            dialog.value = false
            getUsers()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      username.value = row.username
      name.value = row.name
      role.value = row.role
      password.value = row.password
      active.value = row.active
    }

    const onEditing = () => {
      validatePassword()
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            username: username.value,
            role: role.value,
            name: name.value,
            password: newPassword.value ? newPassword.value : password.value,
            active: active.value
          }).then(() => {
            dialog.value = false
            getUsers()
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
          getUsers()
        })
      })
    }

    const validatePassword = () => {
      if (isEditing.value) {
        if (confirmationPassword.value !== newPassword.value) {
          messagePassword()
          newPassword.value = null
        }
      } else {
        if (confirmationPassword.value !== password.value) {
          messagePassword()
          password.value = null
        }
      }
    }

    const messagePassword = () => {
      $q.dialog({
        title: 'Notificación',
        message: '¡El campo de confirmación de contraseña no coincide!'
      })
      confirmationPassword.value = null
    }

    return {
      username,
      dialog,
      dataUser,
      isEditing,
      name,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      password,
      onReset,
      onSubmit,
      editing,
      changePassword,
      onEditing,
      id,
      newPassword,
      onDelete,
      confirmationPassword,
      validatePassword,
      messagePassword
    }
  }
})
</script>
