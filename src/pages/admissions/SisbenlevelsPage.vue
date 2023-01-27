<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Sisbenlevel" :rows="dataSisbenlevels" :filter="filter" :columns="columns" row-key="name">
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar" />
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
                <q-td key="sisbenlevel" :props="props">
                  {{ sisbenLevelType[props.row.sisbenlevel] }}
                </q-td>
                <q-td key="sisbengroup" :props="props">
                  {{ sisbenLevelGroup[props.row.sisbengroup] }}
                </q-td>
                <q-td key="sisbensubgroup" :props="props">
                  {{ sisbenLevelSubgroup[props.row.sisbensubgroup] }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
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
        <q-spinner-pie color="primary" size="70px" />
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
                <q-input white color="blue" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="sisbenlevel"
                  label="Nivel del Sisbén *"
                  :options="listSisbenLevelType"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  white
                  color="blue"
                  v-model="sisbengroup"
                  label="Grupo del Sisbén *"
                  :options="listSisbenLevelGroup"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6">
                <q-select
                  white
                  color="blue"
                  v-model="sisbensubgroup"
                  label="Subgrupo del Sisbén *"
                  :options="listSisbenLevelSubgroup"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-12">
                <q-toggle
                  v-model="active"
                  label="Estado"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmit" color="primary" />
              <q-tooltip>Guardar datos</q-tooltip>
            </div>
            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditing" color="primary" />
              <q-tooltip>Editar datos</q-tooltip>
            </div> &nbsp;
            <div>
              <q-btn round icon="cancel" v-close-popup color="negative" />
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
import {
  ACTIVE,
  INACTIVE,
  STATUS,
  SISBENLEVELTYPE,
  LISTSISBENLEVELTYPE,
  SISBENLEVELGROUP,
  LISTSISBENLEVELGROUP,
  SISBENLEVELSUBGROUP,
  LISTSISBENLEVELSUBGROUP
} from '../../constants/Constants'
export default defineComponent({
  name: 'SisbenlevelsPage',
  setup () {
    const path = '/admissions/sisbenlevels'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const sisbenLevelType = ref(SISBENLEVELTYPE)
    const listSisbenLevelType = ref(LISTSISBENLEVELTYPE)
    const sisbenLevelGroup = ref(SISBENLEVELGROUP)
    const listSisbenLevelGroup = ref(LISTSISBENLEVELGROUP)
    const sisbenLevelSubgroup = ref(SISBENLEVELSUBGROUP)
    const listSisbenLevelSubgroup = ref(LISTSISBENLEVELSUBGROUP)
    const states = ref(STATUS)
    const filter = ref(null)
    const dataSisbenlevels = ref([])
    const code = ref(null)
    const description = ref(null)
    const sisbenlevel = ref(null)
    const sisbengroup = ref(null)
    const sisbensubgroup = ref(null)
    const status = ref(null)
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
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'sisbenlevel', align: 'center', label: 'Nivel del Sisbén', field: 'sisbenlevel', sortable: true },
      { name: 'sisbengroup', align: 'center', label: 'Grupo del Sisbén', field: 'sisbengroup', sortable: true },
      { name: 'sisbensubgroup', align: 'center', label: 'Subgrupo del Sisbén', field: 'sisbensubgroup', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getSisbenlevels()
    })
    const getSisbenlevels = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataSisbenlevels.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            sisbenlevel: sisbenlevel.value,
            sisbengroup: sisbengroup.value,
            sisbensubgroup: sisbensubgroup.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getSisbenlevels()
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
      sisbenlevel.value = row.sisbenlevel
      sisbengroup.value = row.sisbengroup
      sisbensubgroup.value = row.sisbensubgroup
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            description: description.value,
            sisbenlevel: sisbenlevel.value,
            sisbengroup: sisbengroup.value,
            sisbensubgroup: sisbensubgroup.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getSisbenlevels()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Está seguro que desea eliminar el nivel de Sisbén: ' + row.description + '?',
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
          getSisbenlevels()
        })
      })
    }
    return {
      dialog,
      dataSisbenlevels,
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
      sisbenlevel,
      sisbengroup,
      sisbensubgroup,
      status,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      sisbenLevelType,
      listSisbenLevelType,
      sisbenLevelGroup,
      listSisbenLevelGroup,
      sisbenLevelSubgroup,
      listSisbenLevelSubgroup
    }
  }
})
</script>
