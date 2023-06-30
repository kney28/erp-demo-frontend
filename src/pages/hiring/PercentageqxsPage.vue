<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Percentageqx" :rows="dataPercentageqxs" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="groupqx" :props="props">
                  {{ groupqxOptions[props.row.groupqx -1].description }}
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
              <div class="col-md-4 col-sm-4 col-xs-12">
                <q-input :readonly="readonly" white color="blue" v-model="code" label="Código *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <q-select
                white
                color="blue"
                v-model="groupqx"
                label="Grupo QX *"
                :options="groupqxOptions"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
            </div>
            <div class="col-md-12 col-sm-4 col-xs-12 text-center">
              <q-toggle
              label="Estado"
              v-model="active"
              />
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
<!--++++++++++++++++++++++++++++DETAIL+++++++++++++++++++++++++++++++-->
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
                <q-td key="typepercentaje" :props="props">
                  {{ percentageqxsDetail.typepercentajeOptions[props.row.typepercentaje - 1].description }}
                </q-td>
                <q-td key="valpercentaje" :props="props">
                  {{ props.row.valpercentaje }}
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
    <q-dialog v-model="dialogForm" persistent>
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
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="percentageqxsDetail.typepercentaje"
                  label="Tipo porcentaje” *"
                  :options="percentageqxsDetail.typepercentajeOptions"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="percentageqxsDetail.valpercentaje"
                  label="Valor de porcentaje *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio', val => val < 0 ? 'Debe ser cero o mayor a cero' : !!val ]"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <q-toggle v-model="percentageqxsDetail.active" label="Estado"/>
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
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { ACTIVE, INACTIVE, STATUS, GROUPQX, PERCENTAGETYPE } from '../../constants/Constants'
export default defineComponent({
  name: 'PercentageqxsPage',
  setup () {
    const path = '/hiring/percentageqxs'
    const percentageqxsDetail = reactive({
      percentajeqxId: null,
      typepercentaje: null,
      typepercentajeOptions: PERCENTAGETYPE,
      valpercentaje: null,
      active: false
    })
    const idDetalle = ref(null)
    const myFormDetail = ref(null)
    const filterDetail = ref(null)
    const idCopay = ref(null)
    const rowsDetail = ref([])
    const statusDetail = ref(null)
    const dialogDetail = ref(false)
    const dialogFormDetail = ref(false)
    const readonly = ref(false)
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataPercentageqxs = ref([])
    const code = ref(null)
    const description = ref(null)
    const groupqx = ref(null)
    const groupqxOptions = ref(GROUPQX)
    const role = ref(null)
    const active = ref(false)
    const states = ref(STATUS)
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
      { name: 'groupqx', align: 'center', label: 'Grupo QX', field: 'groupqx', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'detail', align: 'center', label: 'Detalle', field: 'detail', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columnsDetail = ref([
      { name: 'typepercentaje', align: 'center', label: 'Tipo porcentaje', field: 'typepercentaje', sortable: true },
      { name: 'valpercentaje', align: 'center', label: 'Valor de porcentaje', field: 'valpercentaje', sortable: true },
      { name: 'status', align: 'center', label: 'status', field: 'Estado', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getPercentageqxs()
    })
    const getPercentageqxs = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataPercentageqxs.value = data
      visible.value = false
    }
    const getAllDetail = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/percentajeqxdets/head/' + idCopay.value)
      // const { data } = await api.get(pathDetail + '/head/' + row.id)
      rowsDetail.value = data
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
    }
    const onResetDetail = () => {
      percentageqxsDetail.typepercentaje = null
      percentageqxsDetail.valpercentaje = null
      percentageqxsDetail.active = false
      isEditing.value = false
    }
    const onSubmitDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.post('/hiring/percentajeqxdets', {
            percentajeqxId: idCopay.value,
            typepercentaje: percentageqxsDetail.typepercentaje,
            valpercentaje: percentageqxsDetail.valpercentaje,
            status: percentageqxsDetail.active ? ACTIVE : INACTIVE
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
      percentageqxsDetail.typepercentaje = row.typepercentaje
      percentageqxsDetail.valpercentaje = row.valpercentaje
      if (row.status === ACTIVE) {
        percentageqxsDetail.active = true
      }
    }
    const onEditingDetail = () => {
      myFormDetail.value.validate().then(async success => {
        if (success) {
          api.patch('/hiring/percentajeqxdets/' + idDetalle.value, {
            percentajeqxId: idCopay.value,
            typepercentaje: percentageqxsDetail.typepercentaje,
            valpercentaje: percentageqxsDetail.valpercentaje,
            status: percentageqxsDetail.active ? ACTIVE : INACTIVE
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
        message: '¿Está seguro que desea eliminar el detalle de Porcentaje QX SOAT?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete('/hiring/percentajeqxdets/' + row.id).then(response => {
          dialogFormDetail.value = false
          getAllDetail()
        })
      })
    }
    const creating = () => {
      onReset()
      dialog.value = true
      active.value = true
      readonly.value = false
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
            groupqx: groupqx.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPercentageqxs()
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
      groupqx.value = row.groupqx
      readonly.value = true
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
            groupqx: groupqx.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getPercentageqxs()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el Porcentaje QX SOAT: ' + row.code + ' - ' + row.description + '?',
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
          getPercentageqxs()
        })
      })
    }
    return {
      dialog,
      dataPercentageqxs,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      columnsDetail,
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
      states,
      groupqx,
      groupqxOptions,
      readonly,
      percentageqxsDetail,
      idDetalle,
      myFormDetail,
      filterDetail,
      idCopay,
      rowsDetail,
      statusDetail,
      dialogDetail,
      dialogFormDetail,
      detail,
      creatingDetail,
      onResetDetail,
      onSubmitDetail,
      editingDetail,
      onEditingDetail,
      onDeleteDetail
    }
  }
})
</script>
