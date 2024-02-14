<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Usuarios" :rows="dataAccountCatalog" :filter="filter" :columns="columns" row-key="name" >
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
                <!--<q-td key="majorAccount" :props="props">
                  {{ props.row.majorAccount }}
                </q-td>-->
                <q-td key="code" :props="props">
                  {{ props.row.code }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="level" :props="props">
                  {{ listLevel[props.row.level] }}
                </q-td>
                <q-td key="sort" :props="props">
                  {{ listClass[props.row.class] }}
                </q-td>
                <q-td key="availabilityType" :props="props">
                  {{ listAvailabilitiesType[props.row.availabilityType] }}
                </q-td>
                <q-td key="affectsThirdParties" :props="props">
                  {{ listSelectionCatalog[props.row.affectsThirdParties] }}
                </q-td>
                <q-td key="affectsCostCenters" :props="props">
                  {{ listSelectionCatalog[props.row.affectsCostCenters] }}
                </q-td>
                <q-td key="transferThirdParties" :props="props">
                  {{ listSelectionCatalog[props.row.transferThirdParties] }}
                </q-td>
                <q-td key="thirdId" :props="props">
                  {{ props.row.thirdId !== null ? props.row.thirdId.firstname ? `${props.row.thirdId.document} ${props.row.thirdId.firstname} ${props.row.thirdId.secondname} ${props.row.thirdId.firstsurname} ${props.row.thirdId.secondsurname}` : `${props.row.thirdId.document} ${props.row.thirdId.socialreason}` :'' }}
                </q-td>
                <q-td key="affectsRetention" :props="props">
                  {{ selectionRetention[props.row.affectsRetention - 1].description }}
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
        <q-form ref="myForm" @submit.prevent="">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-input
              white
              color="blue"
              type="number"
              v-model="code"
              label="Código *"
              stack-label
              lazy-rules
              :readonly="readonly.code"
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-input
              white
              color="blue"
              v-model="description"
              label="Descripción *"
              stack-label
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="level"
              label="Nivel contable *"
              @filter="filterFNAccountingLevel"
              :options="levels"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              readonly
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div v-if="code ? code.length > 1 ? true : false : false" class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
            white
            color="blue"
            stack-label
            v-model="majorAccount"
            label="Cuenta mayor *"
            @filter="filterFnAccount"
            :options="filterOptionsAccount"
            option-value="code"
            :option-label="e => {return e.code !== undefined ? e.code +' - '+e.description: null}"
            emit-value
            map-options
            readonly
            lazy-rules
            :rules="[ val => !!val || `La cuenta mayor ${code[0]} no existe`]"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="sort"
              label="Clase *"
              @filter="filterFNAccountingSort"
              :options="sorts"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              readonly
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="nature"
              label="Naturaleza *"
              :options="optionsNature"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              readonly
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="availabilityType"
              label="Tipo disponibilidad *"
              @filter="filterFNAccountingTypes"
              :options="availabilitiesTypes"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              :@input="cleanThird()"
              white
              color="blue"
              stack-label
              v-model="affectsThirdParties"
              label="Afecta terceros *"
              :options="selectionCatalog"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div v-if="affectsThirdParties === 1" class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              :@input="cleanThird()"
              white
              color="blue"
              stack-label
              v-model="transferThirdParties"
              label="Transferir terceros *"
              :options="selectionCatalog"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>
            <div v-if="transferThirdParties === 1 && affectsThirdParties === 1" class="col-lg-4 col-md-4 col-sm-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="thirdId"
              label="Seleccionar tercero *"
              @filter="filterFnAccountingThirds"
              :options="filterOptionsThirdsAccount"
              option-value="id"
              :option-label="e => `${e.document} ${e.firstname ?? ''} ${e.secondname ?? ''} ${e.firstsurname ?? ''} ${e.firstname ?? ''} ${e.secondsurname ?? ''}${e.socialreason ?? ''}`"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>
            <div v-else class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="affectsCostCenters"
              label="Afecta centro de costos *"
              :options="selectionCatalog"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              white
              color="blue"
              stack-label
              v-model="affectsRetention"
              label="Afecta retention *"
              :options="selectionRetention"
              option-value="id"
              option-label="description"
              emit-value
              map-options
              lazy-rules
              :rules="[ val => !!val || 'El campo es obligatorio']"
            />
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
            <q-toggle v-model="active" label="Estado cuenta"/>
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
import { defineComponent, ref, onMounted, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import {
  ACTIVE, INACTIVE, LEVELCATALOG, CLASSCATALOG, AVAILABILITYTYPECATALOG, SELECTIONCATALOG, AFFECTSRETENTIONCATALOG, STATUS, LISTLEVELCATALOG,
  LISTCLASSCATALOG, LISTAVAILABILITYTYPECATALOG, LISTSELECTIONCATALOG, NATURECATALOG
} from '../constants/Constants'

export default defineComponent({
  name: 'AccountCatalogPage',
  setup () {
    const path = '/account-catalog'
    const status = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const active = ref(ACTIVE)
    const states = ref(STATUS)
    const readonly = reactive({
      code: false
    })
    const id = ref(null)
    const filter = ref(null)
    const dataAccountCatalog = ref([])
    const filterOptionsAccount = ref(dataAccountCatalog)
    const dataThirdsAccount = ref([])
    const myForm = ref(null)
    const code = ref(null)
    const description = ref(null)
    const level = computed({
      get () {
        let val
        if (code.value !== null) {
          switch (code.value.length) {
            case 1: val = 1
              break
            case 2: val = 2
              break
            case 3: val = null
              break
            case 4: val = 3
              break
            case 5: val = null
              break
            case 6: val = 4
              break
            case 7: val = null
              break
            case 8: val = 5
          }
          if (code.value.length > 8) {
            val = 5
          }
          return val
        } else {
          return null
        }
      },
      set (val) {
        code.value = val
      }
    })
    const majorAccount = computed({
      get () {
        let val
        if (code.value !== null && code.value.length > 1) {
          switch (code.value[0]) {
            case '1': val = 1
              break
            case '2': val = 2
              break
            case '3': val = 3
              break
            case '4': val = 4
              break
            case '5': val = 5
              break
            case '6': val = 6
              break
            case '7': val = 7
              break
            case '8': val = 8
              break
            case '9': val = 9
              break
          }
          return findItem(val) ? val : null
        } else {
          return null
        }
      },
      set (val) {
        code.value = val
      }
    })
    const nature = computed({
      get () {
        let val
        if (code.value !== null) {
          switch (code.value[0]) {
            case '1': val = 1
              break
            case '2': val = 2
              break
            case '3': val = 2
              break
            case '4': val = 2
              break
            case '5': val = 1
              break
            case '6': val = 1
              break
            case '7': val = 1
              break
            case '8': val = 2
              break
            case '9': val = 1
              break
          }
          return val
        } else {
          return null
        }
      },
      set (val) {
        code.value = val
      }
    })
    const listLevel = ref(LISTLEVELCATALOG)
    const levels = ref(LEVELCATALOG)
    const sort = computed({
      get () {
        let val
        if (code.value !== null) {
          switch (code.value[0]) {
            case '1': val = 1
              break
            case '2': val = 2
              break
            case '3': val = 3
              break
            case '4': val = 4
              break
            case '5': val = 5
              break
            case '6': val = 6
              break
            case '7': val = 7
              break
            case '8': val = 8
              break
            case '9': val = 9
          }
          return val
        } else {
          return null
        }
      },
      set (val) {
        code.value = val
      }
    })
    const sorts = ref(CLASSCATALOG)
    const listClass = ref(LISTCLASSCATALOG)
    const availabilityType = ref(null)
    const availabilitiesTypes = ref(AVAILABILITYTYPECATALOG)
    const listAvailabilitiesType = ref(LISTAVAILABILITYTYPECATALOG)
    const affectsThirdParties = ref(null)
    const selectionCatalog = ref(SELECTIONCATALOG)
    const optionsNature = ref(NATURECATALOG)
    const listSelectionCatalog = ref(LISTSELECTIONCATALOG)
    const selectionRetention = ref(AFFECTSRETENTIONCATALOG)
    const filterOptionsThirdsAccount = ref(dataThirdsAccount)
    const affectsCostCenters = ref(null)
    const transferThirdParties = ref(null)
    const thirdId = ref(null)
    const affectsRetention = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      // { name: 'majorAccount', align: 'center', label: 'Cuenta mayor', field: 'majorAccount', sortable: true },
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
      { name: 'level', align: 'center', label: 'Nivel', field: 'level', sortable: true },
      { name: 'sort', align: 'center', label: 'Clase', field: 'sort', sortable: true },
      { name: 'availabilityType', align: 'center', label: 'Tipo disponibilidad', field: 'availabilityType', sortable: true },
      { name: 'affectsThirdParties', align: 'center', label: 'Afecta terceros', field: 'affectsThirdParties', sortable: true },
      { name: 'affectsCostCenters', align: 'center', label: 'Afecta centro de costos', field: 'affectsCostCenters', sortable: true },
      { name: 'transferThirdParties', align: 'center', label: 'Transferir terceros', field: 'transferThirdParties', sortable: true },
      { name: 'thirdId', align: 'center', label: 'Tercero', field: 'thirdId', sortable: true },
      { name: 'affectsRetention', align: 'center', label: 'Afecta retención', field: 'affectsRetention', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])

    onMounted(() => {
      getAccountCatalog()
      getThirdAcount()
    })

    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAccountCatalog.value = data
      visible.value = false
    }

    const getThirdAcount = async () => {
      visible.value = true
      const { data } = await api.get('/thirdperson')
      dataThirdsAccount.value = data
      visible.value = false
    }

    const findItem = (val) => {
      const result = dataAccountCatalog.value.find((item) =>
        item.code === val
      )
      if (result !== undefined) {
        return true
      } else {
        return false
      }
    }

    const creating = () => {
      onReset()
      dialog.value = true
      active.value = true
    }

    const onReset = () => {
      active.value = false
      isEditing.value = false
      readonly.code = false
      code.value = null
      description.value = null
      status.value = null
      level.value = null
      sort.value = null
      availabilityType.value = null
      affectsThirdParties.value = null
      affectsCostCenters.value = null
      transferThirdParties.value = null
      thirdId.value = null
      affectsRetention.value = null
    }

    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            level: level.value,
            majorAccount: majorAccount.value,
            class: sort.value,
            nature: nature.value,
            availabilityType: availabilityType.value,
            affectsThirdParties: affectsThirdParties.value,
            transferThirdParties: transferThirdParties.value,
            thirdId: thirdId.value,
            affectsCostCenters: affectsCostCenters.value,
            affectsRetention: affectsRetention.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountCatalog()
          })
        }
      })
    }

    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      readonly.code = true
      id.value = row.id
      code.value = row.code
      description.value = row.description
      // level.value = row.level
      // sort.value = row.class
      availabilityType.value = row.availabilityType
      affectsThirdParties.value = row.affectsThirdParties
      affectsCostCenters.value = row.affectsCostCenters
      transferThirdParties.value = row.transferThirdParties
      thirdId.value = row.thirdId
      affectsRetention.value = row.affectsRetention
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
            level: level.value,
            class: sort.value,
            availabilityType: availabilityType.value,
            affectsThirdParties: affectsThirdParties.value,
            affectsCostCenters: affectsCostCenters.value,
            transferThirdParties: transferThirdParties.value,
            thirdId: thirdId.value,
            affectsRetention: affectsRetention.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAccountCatalog()
          })
        }
      })
    }

    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el registro con código: ' + row.code + '?',
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
          getAccountCatalog()
        })
      })
    }

    const filterFNAccountingLevel = (val, update) => {
      if (val === '') {
        update(() => {
          levels.value = LEVELCATALOG
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        levels.value = LEVELCATALOG.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFNAccountingSort = (val, update) => {
      if (val === '') {
        update(() => {
          sorts.value = CLASSCATALOG
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        sorts.value = CLASSCATALOG.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFNAccountingTypes = (val, update) => {
      if (val === '') {
        update(() => {
          availabilitiesTypes.value = AVAILABILITYTYPECATALOG
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        availabilitiesTypes.value = AVAILABILITYTYPECATALOG.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFnAccountingThirds = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsThirdsAccount.value = dataThirdsAccount.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsThirdsAccount.value = dataThirdsAccount.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFnAccount = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccount.value = dataAccountCatalog.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccount.value = dataAccountCatalog.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const cleanThird = () => {
      if (transferThirdParties.value === 2) {
        thirdId.value = null
      }
      if (affectsThirdParties.value === 2) {
        thirdId.value = null
        transferThirdParties.value = null
      }
    }

    return {
      dialog,
      dataAccountCatalog,
      dataThirdsAccount,
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
      description,
      code,
      status,
      active,
      filterFNAccountingLevel,
      level,
      majorAccount,
      nature,
      sort,
      availabilityType,
      affectsThirdParties,
      affectsCostCenters,
      transferThirdParties,
      thirdId,
      affectsRetention,
      levels,
      sorts,
      availabilitiesTypes,
      selectionCatalog,
      selectionRetention,
      states,
      listLevel,
      listClass,
      listAvailabilitiesType,
      listSelectionCatalog,
      filterFNAccountingSort,
      filterFNAccountingTypes,
      filterFnAccountingThirds,
      filterFnAccount,
      filterOptionsThirdsAccount,
      filterOptionsAccount,
      cleanThird,
      readonly,
      optionsNature,
      findItem
    }
  }
})
</script>
