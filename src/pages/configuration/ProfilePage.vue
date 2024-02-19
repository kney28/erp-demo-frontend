<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table
            dense
            :rows-per-page-options="[10, 15, 20, 25, 50, 0]"
            v-model:pagination="pagination"
            title="Perfiles"
            :rows="dataProfiles"
            :filter="filter"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top-left v-if="can('CONFIGURACION-MAESTRAS-PERFIL', 'add')">
              <q-btn
                unelevated
                rounded
                icon="add"
                color="primary"
                @click="creating"
                label="Agregar"
              />
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input
                dense
                debounce="300"
                v-model="filter"
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    :color="props.expand ? 'accent' : 'positive'"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'expand_less' : 'expand_more'"
                  />
                </q-td>
                <q-td key="code" :props="props">
                  {{ props.row.code }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="status" :props="props">
                    {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editing(props.row)" v-if="can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')" />
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDelete(props.row)" v-if="can('CONFIGURACION-MAESTRAS-PERFIL', 'remove')"/>
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <!--<div class="text-left">This is expand slot for row above: {{ props.row.code }}.</div>-->
                  <q-table
                    dense
                    :rows-per-page-options="[10, 15, 20, 25, 50, 0]"
                    title="Permissions"
                    :rows="dataPermissionss.filter(v => v.profile.code == props.row.code)"
                    :filter="filter"
                    :columns="subColumns"
                    row-key="name"
                  >
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
                        <q-td key="code" :props="props">
                          {{ props.row.code }}
                        </q-td>
                        <q-td key="option" :props="props">
                          {{ props.row.option.option }}
                        </q-td>
                        <q-td key="add" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.add"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.add ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="modify" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.modify"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.modify ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="record" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.record"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.record ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="query" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.query"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.query ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="remove" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.remove"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.remove ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="print" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.print"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.print ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="confirm" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.confirm"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.confirm ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="process" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.process"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.process ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="run" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.run"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.run ? 'SI' : 'NO' }}
                        </q-td>
                        <q-td key="override" :props="props">
                          <q-checkbox
                            v-model:model-value="props.row.override"
                            @click="onEditingPermission(props.row, props.row.id)"
                            :disable="!can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')"
                          />
                          {{ props.row.override ? 'SI' : 'NO' }}
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
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
      <q-linear-progress :value="10" color="primary" />

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
            <div class="col-md-4" v-if="!isEditing">
              <q-input
                white
                color="blue"
                v-model="code"
                label="Perfil *"
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-4" v-else>
              <q-input
                white
                color="blue"
                v-model="code"
                label="Perfil"
                :disable="true"
              />
            </div>
            <div class="col-md-4">
              <q-input
                white
                color="blue"
                v-model="description"
                label="Descripción *"
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div class="row justify-around">
            <div class="col-md-3">
            </div>
            <div class="col-md-3">
              <q-toggle v-model="active" label="Estado"/>
            </div>
            <div class="col-md-3">
          </div>

          </div>
        </q-form>
      </q-card-section>

      <div class="row justify-between">
        <q-card-actions align="left" class="bg-white text-teal">
        </q-card-actions>
        <q-card-actions align="right" class="bg-white text-teal">
          <div v-if="!isEditing">
            <q-btn round icon="save" @click.prevent="onSubmit" color="positive"/>
            <q-tooltip>Guardar datos</q-tooltip>
          </div>

          <div v-else>
            <q-btn round icon="save" @click.prevent="onEditing" color="positive"/>
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
import { ACTIVE, INACTIVE, STATUS } from 'src/constants/Constants'
import { can } from 'src/boot/globalFunction'
export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const path = 'configuration/profiles'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const states = ref(STATUS)
    const filter = ref(null)
    const dataProfiles = ref([])
    const dataPermissionss = ref([])
    const description = ref(null)
    const code = ref(null)
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
      // { name: 'expancion', align: 'center', label: '', field: 'expancion', sortable: true },
      {
        name: 'id',
        required: true,
        label: 'Permisos',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'code', align: 'center', label: 'Perfil', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true }
      // { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      // { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    if (can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')) { columns.value.push({ name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true }) }
    if (can('CONFIGURACION-MAESTRAS-PERFIL', 'remove')) { columns.value.push({ name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }) }
    const subColumns = ref([
      { name: 'code', align: 'center', label: 'Permiso', field: 'code', sortable: true },
      { name: 'option', align: 'center', label: 'Opción', field: 'option', sortable: true },
      { name: 'add', align: 'center', label: 'Agregar', field: 'add', sortable: true },
      { name: 'modify', align: 'center', label: 'Modificar', field: 'modify', sortable: true },
      { name: 'record', align: 'center', label: 'Guardar', field: 'record', sortable: true },
      { name: 'query', align: 'center', label: 'Consultar', field: 'query', sortable: true },
      { name: 'remove', align: 'center', label: 'Eliminar', field: 'remove', sortable: true },
      { name: 'print', align: 'center', label: 'Imprimir', field: 'print', sortable: true },
      { name: 'confirm', align: 'center', label: 'Confirmar', field: 'confirm', sortable: true },
      { name: 'process', align: 'center', label: 'Procesar', field: 'process', sortable: true },
      { name: 'run', align: 'center', label: 'Ejecutar', field: 'run', sortable: true },
      { name: 'override', align: 'center', label: 'Anular', field: 'override', sortable: true }
    ])

    onMounted(() => {
      getProfiles()
    })

    const getProfiles = async () => {
      visible.value = true
      await api.get(path).then((resp) => {
        if (resp.data && !resp.data.error) {
          dataProfiles.value = resp.data
          getPermissionss()
        }
      }).catch((e) => {
        // console.log(e)
        $q.dialog({
          title: 'Error',
          message: e,
          ok: {
            label: 'Aceptar',
            color: 'positive'
          }
        })
      })
      visible.value = false
    }

    const getPermissionss = async () => {
      visible.value = true
      const { data } = await api.get('configuration/permissionss')
      dataPermissionss.value = data
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
    }

    const onReset = () => {
      description.value = null
      code.value = null
      isEditing.value = false
      active.value = false
    }

    const onSubmit = () => {
      if (can('CONFIGURACION-MAESTRAS-PERFIL', 'add')) {
        myForm.value.validate().then(async success => {
          if (success) {
            api.post(path, {
              code: code.value,
              description: description.value,
              status: active.value ? ACTIVE : INACTIVE
            }).then(() => {
              dialog.value = false
              getProfiles()
            })
          }
        })
      }
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      code.value = row.code
      description.value = row.description
      if (row.status === ACTIVE) {
        active.value = true
      }
    }

    const onEditing = () => {
      if (can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')) {
        myForm.value.validate().then(async success => {
          if (success) {
            api.patch(path + '/' + id.value, {
              code: code.value,
              description: description.value,
              status: active.value ? ACTIVE : INACTIVE
            }).then(() => {
              dialog.value = false
              getProfiles()
            })
          }
        })
      }
    }

    const onEditingPermission = async (permission, idElement) => {
      if (can('CONFIGURACION-MAESTRAS-PERFIL', 'modify')) {
        await api.patch('configuration/permissionss/' + idElement, {
          // code: permission.code,
          // profile: permission.profile,
          // option: permission.option,
          add: permission.add,
          modify: permission.modify,
          record: permission.record,
          query: permission.query,
          remove: permission.remove,
          print: permission.print,
          confirm: permission.confirm,
          process: permission.process,
          run: permission.run,
          override: permission.override
        }).then(() => {
          getPermissionss()
        })
      }
      dialog.value = false
    }

    const onDelete = (row) => {
      if (can('CONFIGURACION-MAESTRAS-PERFIL', 'remove')) {
        $q.dialog({
          title: 'Confirmación',
          message: '¿Está seguro que desea eliminar el perfil: ' + row.code + '?',
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
            getProfiles()
          })
        })
      }
    }

    return {
      dialog,
      dataProfiles,
      dataPermissionss,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      subColumns,
      visible,
      filter,
      code,
      onReset,
      onSubmit,
      editing,
      onEditing,
      onEditingPermission,
      id,
      onDelete,
      description,
      states,
      can
    }
  }
})
</script>
