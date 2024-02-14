<!--
  Este componente se encarga de registrar los consecutivos sin vigencia.
  Para usarlo es muy sencillo, solo se debe importar el componente y luego
  usarlo donde se desee. Ejemplo:

    <ConsecutivoSinVigencia entity="nombre de la entidad" @locked="(e) => lock = e"/>

  Solo recuerda pasarle al parametro entity el nombre de la
  entidad o tabla a la cual deseas configurar los consecutivos sin vigencia.

  El evento locked se activa si el numero final es igual al numero actual.

  Puede ser empleado para deshabilitar el boton de Agregar.

    <q-btn icon="add" @click="creating" label="Agregar" :disable="lock"/>

  entity = types_seat
-->
<template>
  <q-page class="q-pa-md q-gutter-sm">
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
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <q-input white type="number" color="blue" v-model="numeracionInicial" label="Numeracion inicial *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <q-input white type="number" color="blue" v-model="numeracionFinal" label="Numeracion final *" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-input white color="blue" v-model="numeracionActual" label="Numeracion actual" lazy-rules readonly />
              </div>
              <div class="col-md-12 col-xs-12 text-center">
                <q-toggle v-model="active" label="Estado" />
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
    <q-btn rounded label="Configurar consecutivos sin vigencia" color="primary" @click.prevent="() => dialog = true" />
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { ACTIVE, INACTIVE } from 'src/constants/Constants'

export default defineComponent({
  name: 'ConsecutivosSinVigencia',
  props: ['entity'],
  emits: ['locked'],
  setup (props, { emit }) {
    const path = '/configuration/consecutivosinvigencias'
    const id = ref(null)
    const dialog = ref(false)
    const dataConsecutivosinvigencias = ref([])
    const numeracionInicial = ref(null)
    const numeracionFinal = ref(null)
    const numeracionActual = ref(null)
    const estado = ref(null)
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const isEditing = ref(false)
    onMounted(() => {
      getConsecutivosinvigencias()
    })
    const getConsecutivosinvigencias = async () => {
      const { data } = await api.get(`${path}/${props.entity}`)
      id.value = data.id
      numeracionInicial.value = data.numeracionInicial
      numeracionFinal.value = data.numeracionFinal
      numeracionActual.value = data.maxId
      if (data.estado === ACTIVE) {
        active.value = true
      }
      if (data !== null) {
        isEditing.value = true
      } else {
        isEditing.value = false
      }
      const disponiblesConsecutives = data.numeracionFinal - data.maxId
      if (disponiblesConsecutives === 0) {
        emit('locked', true)
        $q.dialog({
          title: 'Alerta',
          message: 'No hay consecutivos disponibles'
        })
      } else {
        emit('locked', false)
      }
    }

    function autoClose () {
      let seconds = 1

      const dialog = $q.dialog({
        title: 'Confirmación',
        message: 'Datos actualizados'
      })

      const timer = setInterval(() => {
        seconds--

        if (seconds === 0) {
          clearInterval(timer)
          dialog.hide()
        }
      }, 1000)
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            numeracionInicial: numeracionInicial.value,
            numeracionFinal: numeracionFinal.value,
            numeracionActual: numeracionActual.value,
            entity: props.entity,
            estado: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getConsecutivosinvigencias()
          })
        }
      })
    }

    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            numeracionInicial: numeracionInicial.value,
            numeracionFinal: numeracionFinal.value,
            numeracionActual: numeracionActual.value,
            entity: props.entity,
            estado: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            autoClose()
            dialog.value = false
            getConsecutivosinvigencias()
          }).catch((e) => {
            $q.dialog({
              title: 'Error',
              message: e
            })
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
          getConsecutivosinvigencias()
        })
      })
    }
    return {
      dialog,
      dataConsecutivosinvigencias,
      isEditing,
      role,
      active,
      myForm,
      numeracionInicial,
      numeracionFinal,
      numeracionActual,
      estado,
      onSubmit,
      onEditing,
      id,
      onDelete
    }
  }
})
</script>
