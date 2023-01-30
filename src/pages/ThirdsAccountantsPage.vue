<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Terceros contables" :rows="dataAccountsThirds" :filter="filter" :columns="columns" row-key="name" >
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
                  <q-td key="third" :props="props">
                    <template v-if="props.row.third">
                      {{ props.row.third.socialreason }}
                      {{ props.row.third.firstname }}
                      {{ props.row.third.secondname }}
                      {{ props.row.third.firstsurname }}
                      {{ props.row.third.secondsurname }}
                    </template>
                  </q-td>
                <q-td key="taxpayer_type" :props="props">
                  {{ listTaxPayers[props.row.taxpayer_type] }}
                </q-td>
                <q-td key="withholding_type" :props="props">
                  {{ listWithHolding[props.row.withholding_type] }}
                </q-td>
                <q-td key="affect_ICA" :props="props">
                  {{ listAffectICA[props.row.affect_ICA] }}
                </q-td>
                <q-td key="percentage_ICA" :props="props">
                  {{ props.row.percentage_ICA }}
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
        <q-spinner-pie color="primary" size="70px"/>
      </q-inner-loading>
    </div>
    <q-dialog v-model="dialog" persistent>
    <q-card style="width: 800px; max-width: 80vw;">
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
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                :readonly="isEditing"
                v-model="third"
                label="Tercero *"
                option-label="fullname"
                option-value="id"
                @filter="filterFnThird"
                :options="filterOptionsThird"
                stack-label
                use-input
                input-debounce="0"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-3">
            </div>
          </div>

          <!--
          <div class="row justify-around">
            <div v-if="document" class="col-md-3">
              <q-input
                white
                color="blue"
                readonly
                v-model="documenttype"
                label="Tipo documento *"
                stack-label
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>

            <div v-if="document" class="col-md-7">
              <label style="color: gray" class="q-mr-xs q-mb-md">Nombre completo:</label>
              <br>
              <div style="display: inline-block;">
                {{firstname ? firstname + ' ' : socialreason}}{{secondname ? secondname + ' ' : ''}}
                {{firstsurname ? firstsurname + ' ' : ''}}{{secondsurname ? secondsurname : ''}}
              </div>
            </div>
          </div>
          -->
          <br>

          <div class="row justify-around">
            <div class="col-md-3">
              <div class="col-md-3">
              <q-select
                white
                color="blue"
                v-model="taxPayerType"
                label="Tipo contribuyente *"
                lazy-rules
                option-label="description"
                option-value="id"
                :options="taxPayers"
                use-input
                input-debounce="0"
                emit-value
                stack-label
                map-options
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            </div>
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                v-model="withHoldingType"
                label="Tipo retención *"
                lazy-rules
                option-label="description"
                option-value="id"
                :options="withHoldings"
                use-input
                input-debounce="0"
                emit-value
                stack-label
                map-options
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
            <div class="col-md-3">
              <q-select
                white
                color="blue"
                stack-label
                v-model="affectICA"
                label="Afecta ICA *"
                :options="selectionCatalog"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
              />
            </div>
          </div>

          <div v-if="affectICA === 1" class="row justify-around">
            <div class="col-md-3">
              <q-input
                white
                color="blue"
                v-model="percentageICA"
                label="Porcentaje ICA *"
                stack-label
                value="0"
              />
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-3">
            </div>
          </div>

          <div class="row justify-around">
            <div class="col-md-3">
            </div>
            <div class="col-md-6">
              <q-toggle v-model="active" label="Estado tercero contable"/>
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
import {
  ACTIVE, INACTIVE, DOCUMENTTYPE, TAXPAYERTYPECATALOG, STATUS, WITHHOLDINGTYPECATALOG,
  SELECTIONCATALOG, LISTTAXPAYERTYPECATALOG, LISTWITHHOLDINGTYPECATALOG, LISTSELECTIONCATALOG
} from '../constants/Constants'

export default defineComponent({
  name: 'AccountThirdsPage',
  setup () {
    const path = '/third-party-accountants'
    const socialreason = ref(null)
    const document = ref(null)
    const third = ref(null)
    const documenttype = ref(null)
    const taxPayers = ref(TAXPAYERTYPECATALOG)
    const listTaxPayers = ref(LISTTAXPAYERTYPECATALOG)
    const listWithHolding = ref(LISTWITHHOLDINGTYPECATALOG)
    const withHoldingType = ref(null)
    const withHoldings = ref(WITHHOLDINGTYPECATALOG)
    const affectICA = ref(null)
    const listAffectICA = ref(LISTSELECTIONCATALOG)
    const percentageICA = ref(null)
    const selectionCatalog = ref(SELECTIONCATALOG)
    const taxPayerType = ref(null)
    const status = ref(null)
    const states = ref(STATUS)
    const firstname = ref(null)
    const secondname = ref(null)
    const firstsurname = ref(null)
    const secondsurname = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const active = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataThird = ref([])
    const filterOptionsThird = ref(dataThird)
    const documentsTypes = ref(DOCUMENTTYPE)
    const filterOptionsThirds = ref([])
    const dataAccountsThirds = ref([])
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'third', align: 'center', label: 'Tercero', field: 'third', sortable: true },
      { name: 'taxpayer_type', align: 'center', label: 'Tipo Contribuyente', field: 'taxpayer_type', sortable: true },
      { name: 'withholding_type', align: 'center', label: 'Tipo Retención', field: 'withholding_type', sortable: true },
      { name: 'affect_ICA', align: 'center', label: 'Afecta ICA', field: 'affect_ICA', sortable: true },
      { name: 'percentage_ICA', align: 'center', label: 'Porcentaje ICA', field: 'percentage_ICA', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getThirds()
      getAccountsThirds()
    })

    const getAccountsThirds = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccountsThirds.value = data
      visible.value = false
    }

    const getThirds = async () => {
      visible.value = true
      const { data } = await api.get('thirdperson')
      dataThird.value = data
      /*
      const loadListThirds = []
      data.forEach(function (value, key) {
        loadListThirds.push({
          id: value.id,
          document: value.document,
          documenttype: value.documenttype === documentsTypes.value[0].id ? documentsTypes.value[0].description
            : value.documenttype === documentsTypes.value[1].id ? documentsTypes.value[1].description
              : value.documenttype === documentsTypes.value[2].id ? documentsTypes.value[2].description
                : value.documenttype === documentsTypes.value[3].id ? documentsTypes.value[3].description
                  : value.documenttype === documentsTypes.value[4].id ? documentsTypes.value[4].description : documentsTypes.value[5].description,
          firstname: value.firstname,
          secondname: value.secondname,
          firstsurname: value.firstsurname,
          secondsurname: value.secondsurname,
          socialreason: value.socialreason,
          description: value.firstname ? value.document + ' ' + value.firstname + ' ' + value.firstsurname : value.document + ' ' + value.socialreason
        })
      })
      dataThird.value = loadListThirds
      */
      visible.value = false
    }

    const creating = () => {
      onReset()
      dialog.value = true
    }

    const onReset = () => {
      active.value = false
      isEditing.value = false
      documenttype.value = null
      document.value = null
      third.value = null
      firstname.value = null
      secondname.value = null
      firstsurname.value = null
      secondsurname.value = null
      taxPayerType.value = null
      socialreason.value = null
      status.value = null
      filterOptionsThirds.value = []
      percentageICA.value = 0
      withHoldingType.value = null
      affectICA.value = null
      percentageICA.value = null
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            taxpayer_type: taxPayerType.value,
            document: document.value,
            third: third.value,
            withholding_type: withHoldingType.value,
            affect_ICA: affectICA.value,
            percentage_ICA: affectICA.value === 1 ? percentageICA.value : 0,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountsThirds()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      documenttype.value = row.third.documenttype
      document.value = row.third.document
      third.value = row.third.id
      firstname.value = row.third.firstname
      secondname.value = row.third.secondname
      firstsurname.value = row.third.firstsurname
      secondsurname.value = row.third.secondsurname
      socialreason.value = row.third.socialreason
      taxPayerType.value = row.taxpayer_type
      withHoldingType.value = row.withholding_type
      affectICA.value = row.affect_ICA
      percentageICA.value = row.percentage_ICA

      if (row.status === ACTIVE) {
        active.value = true
      }
    }

    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            taxpayer_type: taxPayerType.value,
            document: document.value,
            withholding_type: withHoldingType.value,
            affect_ICA: affectICA.value,
            percentage_ICA: affectICA.value === 1 ? percentageICA.value : 0,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountsThirds()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el tercero con documento: ' + row.third.document + '?',
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
          getAccountsThirds()
        })
      })
    }

    const filterFNThird = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThirds.value = dataThird.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThirds.value = dataThird.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnThird = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThird.value = dataThird.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThird.value = dataThird.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    /*
    const loadThirdFields = () => {
      if (filterOptionsThirds.value[0] && document.value) {
        documenttype.value = filterOptionsThirds.value[0].documenttype
        firstname.value = filterOptionsThirds.value[0].firstname
        secondname.value = filterOptionsThirds.value[0].secondname
        firstsurname.value = filterOptionsThirds.value[0].firstsurname
        secondsurname.value = filterOptionsThirds.value[0].secondsurname
        socialreason.value = filterOptionsThirds.value[0].socialreason
      }
    }
    */
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
      taxPayerType,
      status,
      firstname,
      secondname,
      firstsurname,
      secondsurname,
      active,
      taxPayers,
      documentsTypes,
      filterFNThird,
      filterOptionsThirds,
      /*
      loadThirdFields,
      */
      states,
      listWithHolding,
      withHoldingType,
      withHoldings,
      affectICA,
      selectionCatalog,
      percentageICA,
      dataAccountsThirds,
      listTaxPayers,
      listAffectICA,
      filterFnThird,
      filterOptionsThird,
      third
    }
  }
})
</script>
