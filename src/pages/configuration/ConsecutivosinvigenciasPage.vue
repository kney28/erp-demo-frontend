<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Consecutivosinvigencia" :rows="dataConsecutivosinvigencias" :filter="filter" :columns="columns"
            row-key="name">
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar" :disable="lock"/>
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
                <q-td key="proceso" :props="props">
                  {{ props.row.proceso }}
                </q-td>
                <q-td key="opcion" :props="props">
                  {{ props.row.opcion }}
                </q-td>
                <q-td key="numeracionInicial" :props="props">
                  {{ props.row.numeracionInicial }}
                </q-td>
                <q-td key="numeracionFinal" :props="props">
                  {{ props.row.numeracionFinal }}
                </q-td>
                <q-td key="numeracionActual" :props="props">
                  {{ props.row.numeracionActual }}
                </q-td>
                <q-td key="estado" :props="props">
                  {{ props.row.estado }}
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
                <q-input white color="blue" v-model="code" label="code *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="proceso" label="proceso *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="opcion" label="opcion *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="numeracionInicial" label="numeracionInicial *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="numeracionFinal" label="numeracionFinal *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="numeracionActual" label="numeracionActual *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="estado" label="estado *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
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
    <ConsecutivoSinVigencia entity="types_seat" @locked="(e) => lock = e" />
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import ConsecutivoSinVigencia from '../../components/ConsecutivoSinVigencia.vue'

export default defineComponent({
  name: 'ConsecutivosinvigenciasPage',
  components: {
    ConsecutivoSinVigencia
  },
  setup () {
    const path = '/consecutivosinvigencias'
    const dialog = ref(false)
    const lock = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataConsecutivosinvigencias = ref([])
    const code = ref('probando esto')
    const proceso = ref(null)
    const opcion = ref(null)
    const numeracionInicial = ref(null)
    const numeracionFinal = ref(null)
    const numeracionActual = ref(null)
    const estado = ref(null)
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
      { name: 'code', align: 'center', label: 'code', field: 'code', sortable: true },
      { name: 'proceso', align: 'center', label: 'proceso', field: 'proceso', sortable: true },
      { name: 'opcion', align: 'center', label: 'opcion', field: 'opcion', sortable: true },
      { name: 'numeracionInicial', align: 'center', label: 'numeracionInicial', field: 'numeracionInicial', sortable: true },
      { name: 'numeracionFinal', align: 'center', label: 'numeracionFinal', field: 'numeracionFinal', sortable: true },
      { name: 'numeracionActual', align: 'center', label: 'numeracionActual', field: 'numeracionActual', sortable: true },
      { name: 'estado', align: 'center', label: 'estado', field: 'estado', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      // getConsecutivosinvigencias()
    })
    const getConsecutivosinvigencias = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataConsecutivosinvigencias.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      proceso.value = null
      opcion.value = null
      numeracionInicial.value = null
      numeracionFinal.value = null
      numeracionActual.value = null
      estado.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            proceso: proceso.value,
            opcion: opcion.value,
            numeracionInicial: numeracionInicial.value,
            numeracionFinal: numeracionFinal.value,
            numeracionActual: numeracionActual.value,
            estado: estado.value
          }).then(() => {
            dialog.value = false
            getConsecutivosinvigencias()
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
      proceso.value = row.proceso
      opcion.value = row.opcion
      numeracionInicial.value = row.numeracionInicial
      numeracionFinal.value = row.numeracionFinal
      numeracionActual.value = row.numeracionActual
      estado.value = row.estado
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            proceso: proceso.value,
            opcion: opcion.value,
            numeracionInicial: numeracionInicial.value,
            numeracionFinal: numeracionFinal.value,
            numeracionActual: numeracionActual.value,
            estado: estado.value
          }).then(() => {
            dialog.value = false
            getConsecutivosinvigencias()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la consecutivosinvigencia: ' + row.id + '?',
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
          getConsecutivosinvigencias()
        })
      })
    }
    return {
      dialog,
      lock,
      dataConsecutivosinvigencias,
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
      proceso,
      opcion,
      numeracionInicial,
      numeracionFinal,
      numeracionActual,
      estado,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete
    }
  }
})
</script>
