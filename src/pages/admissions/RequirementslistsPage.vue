<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Requirementslist" :rows="dataRequirementslists" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="detail" :props="props">
                  <q-btn round size="xs" color="info" icon="slideshow" v-on:click="detail(props.row)" />
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
              <div class="col-md-6">
                <q-input white color="blue" :readonly="readonlyState" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 text-center">
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
<!--***************************DETALLES*****************************-->
    <q-dialog v-model="dialogDetail" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
        <q-linear-progress :value="10" color="blue" />

        <q-card-section class="row items-center">
          <div class="text-h6"> </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row justify-around">
            <div class="col-md-4">
              <q-field label="Código" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ code }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Descripción" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ description }}</div>
                </template>
              </q-field>
            </div>
            <div class="col-md-4">
              <q-field label="Estado" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusDetail] }}</div>
                </template>
              </q-field>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Detalle" :rows="rowsDetail" :filter="filterDetail" :columns="columnsDetail" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creatingDetail" label="Agregar"/>
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="filterDetail" placeholder="Buscar">
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
                <q-td key="procedure" :props="props">
                  {{ props.row.procedure }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editingDetail(props.row)" />
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDeleteDetail(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
<!--***********************DIALOG CREATING DETAIL******************************-->
    <q-dialog v-model="dialogFormDetail" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
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
          <q-form ref="myFormDetail" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  :readonly="readonlyStateDetail"
                  v-model="codeDetail"
                  label="Código *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="descriptionDetail"
                  label="Descripción *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-input
                  white
                  color="blue"
                  v-model="procedure"
                  label="Procedimiento *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div class="col-md-4 text-center">
                <q-toggle v-model="activeDetail" label="Estado"/>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmitDetail" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditingDetail" color="primary"/>
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
import { ACTIVE, INACTIVE, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'RequirementslistsPage',
  setup () {
    const path = '/admissions/requirementslists'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const readonlyState = ref(false)
    const states = ref(STATUS)
    const dataRequirementslists = ref([])
    const code = ref(null)
    const description = ref(null)
    const active = ref(false)
    //
    const readonlyStateDetail = ref(null)
    const dialogDetail = ref(false)
    const idDetalle = ref(null)
    const myFormDetail = ref(null)
    const filterDetail = ref(null)
    const idCopay = ref(null)
    const rowsDetail = ref([])
    const codeDetail = ref(null)
    const descriptionDetail = ref(null)
    const procedure = ref(null)
    const statusDetail = ref(null)
    const dialogFormDetail = ref(false)
    const activeDetail = ref(false)
    const role = ref(null)
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
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    const columnsDetail = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'procedure', align: 'center', label: 'Procedimiento', field: 'procedure', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getRequirementslists()
    })
    const getRequirementslists = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataRequirementslists.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
      readonlyState.value = false
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
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getRequirementslists()
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
      readonlyState.value = true
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
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getRequirementslists()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '!Está seguro que desea eliminar el listado de requisito: ' + row.description + '?',
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
          getRequirementslists()
        })
      })
    }
    const getAllDetail = async () => {
      visible.value = true
      const { data } = await api.get('/admissions/requirementslistdets/head/' + idCopay.value)
      // const { data } = await api.get(pathDetail + '/head/' + row.id)
      rowsDetail.value = data
      console.log(rowsDetail)
      visible.value = false
    }
    const detail = (row) => {
      idCopay.value = row.id
      code.value = row.code
      description.value = row.description
      statusDetail.value = row.status
      getAllDetail()
      dialogDetail.value = true
    }
    const creatingDetail = () => {
      onResetDetail()
      dialogFormDetail.value = true
      readonlyStateDetail.value = false
    }
    const onResetDetail = () => {
      codeDetail.value = null
      descriptionDetail.value = null
      procedure.value = null
      activeDetail.value = false
      isEditing.value = false
    }
    const onSubmitDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.post('/admissions/requirementslistdets', {
            listrequirements: idCopay.value,
            code: codeDetail.value,
            description: descriptionDetail.value,
            procedure: procedure.value,
            status: activeDetail.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }
    const editingDetail = (row) => {
      onResetDetail()
      idDetalle.value = row.id
      dialogFormDetail.value = true
      isEditing.value = true
      codeDetail.value = row.code
      descriptionDetail.value = row.description
      procedure.value = row.procedure
      readonlyStateDetail.value = true
      if (row.status === ACTIVE) {
        activeDetail.value = true
      }
    }
    const onEditingDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.patch('/admissions/requirementslistdets/' + idDetalle.value, {
            listrequirements: idCopay.value,
            code: codeDetail.value,
            description: descriptionDetail.value,
            procedure: procedure.value,
            status: activeDetail.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialogFormDetail.value = false
            getAllDetail()
          })
        }
      })
    }
    const onDeleteDetail = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el detalle del listado de requisitos: ' + row.description + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete('/admissions/requirementslists/' + row.id).then(response => {
          dialogFormDetail.value = false
          getAllDetail()
        })
      })
    }
    return {
      dialog,
      dataRequirementslists,
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
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      readonlyState,
      states,
      columnsDetail,
      dialogDetail,
      myFormDetail,
      filterDetail,
      rowsDetail,
      codeDetail,
      descriptionDetail,
      procedure,
      statusDetail,
      dialogFormDetail,
      activeDetail,
      detail,
      creatingDetail,
      onResetDetail,
      onSubmitDetail,
      editingDetail,
      onEditingDetail,
      onDeleteDetail,
      readonlyStateDetail
    }
  }
})
</script>
