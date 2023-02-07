<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Acccongen" :rows="dataAcccongens" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="validity" :props="props">
                  {{ props.row.validity.year }}
                </q-td>
                <!--The next column is ENUM, please complete the code necessary
<q-td key="month" :props="props">
{{ props.row.month }}</q-td>-->
                <q-td key="month" :props="props">
                  {{ MESES[props.row.month - 1 ].description }}</q-td>
                <!--The next column is ENUM, please complete the code necessary
<q-td key="rounding" :props="props">
{{ props.row.rounding }}</q-td>-->
                <q-td key="rounding" :props="props">
                  {{ redondeo[props.row.rounding - 1].description }}</q-td>
                <q-td key="seattypeclosure" :props="props">
                  {{ props.row.seattypeclosure }}
                </q-td>
                <q-td key="lostcount" :props="props">
                  {{ props.row.lostcount.description }}
                </q-td>
                <q-td key="profitaccount" :props="props">
                  {{ props.row.lostcount.description }}
                </q-td>
                <q-td key="closingaccount" :props="props">
                  {{ props.row.lostcount.description }}
                </q-td>
                <!--The next column is ENUM, please complete the code necessary
<q-td key="inuse" :props="props">
{{ props.row.inuse }}</q-td>-->

                <q-td key="inuse" :props="props">
                  {{ uso[props.row.inuse - 1].description }}
                </q-td>

                <!--The next column is ENUM, please complete the code necessary
<q-td key="status" :props="props">
{{ props.row.status }}</q-td>-->

                <q-td key="status" :props="props">
                  {{ states[props.row.status - 1].description }}
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
              <!--<div class="col-md-4">
                <q-input white color="blue" v-model="validity" label="Vigencia *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="month"
//label="month *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
<div class="col-md-4">
<q-select
white
color="blue"
v-model="validity"
label="Vigencia *"
@filter="filterFnValidity"
:options="filterOptionsValidity"
option-value="id"
option-label="year"
emit-value
map-options
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>

              <div class="col-md-4">
                <q-select white color="blue" v-model="month" label="Mes *" option-label="description" option-value="id"
                  :options="MESES" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="rounding"
//label="rounding *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
              <div class="col-md-4">
                <q-select white color="blue" v-model="rounding" label="Redondeo *" option-label="description"
                  option-value="id" :options="redondeo" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
                <q-input white color="blue" v-model="seattypeclosure" label="Tipo asiento *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>

              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="lostcount"
                label="Cuenta perdida *"
                @filter="filterFnAccountCatalog"
                :options="filterOptionsAccountCatalog"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>

              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="profitaccount"
                label="Cuenta utilidad *"
                @filter="filterFnAccountCatalog"
                :options="filterOptionsAccountCatalog"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>

              <div class="col-md-4">
                <q-select
                white
                color="blue"
                v-model="closingaccount"
                label="Cuenta cierre "
                @filter="filterFnAccountCatalog"
                :options="filterOptionsAccountCatalog"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>

              <!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="inuse"
//label="inuse *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>-->
              <div class="col-md-4">
                <q-select white color="blue" v-model="inuse" label="En uso *" option-label="description"
                  option-value="id" :options="uso" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <!--The next column is ENUM, please complete the code necessary
//<div class="col-md-4">
//<q-input
//white
//color="blue"
//v-model="status"
//label="status *"
//lazy-rules
//:rules="[ val => !!val || 'El campo es obligatorio']"
///>
//</div>
              <div class="col-md-4">
                <q-select white color="blue" v-model="status" label="Estado *" option-label="description"
                  option-value="id" :options="states" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>-->
              <div class="col-md-3">
<q-toggle v-model="active" label="Estado"/>
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
import { MES, LISTREDONDING, LISINUSOCOUNTING, LISTSTATUSCOUNTING, ACTIVE, INACTIVE } from '../../constants/Constants'
export default defineComponent({
  name: 'AcccongensPage',
  setup () {
    const path = '/accounting/acccongens'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAcccongens = ref([])
    const code = ref(null)
    const validity = ref(null)
    const seattypeclosure = ref(null)
    const lostcount = ref(null)
    const profitaccount = ref(null)
    const closingaccount = ref(null)
    const role = ref(null)
    const active = ref(false)
    const dataMonth = ref([])
    const month = ref(null)
    const MESES = ref(MES)
    const dataStatus = ref([])
    const status = ref(null)
    const states = ref(LISTSTATUSCOUNTING)
    const dataInuso = ref([])
    const inuse = ref(null)
    const uso = ref(LISINUSOCOUNTING)
    const dataRouding = ref([])
    const rounding = ref(null)
    const redondeo = ref(LISTREDONDING)
    const dataAccountCatalog = ref([])
    const filterOptionsAccountCatalog = ref(dataAccountCatalog)
    const dataValidity = ref([])
    const filterOptionsValidity = ref(dataValidity)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'code', align: 'center', label: 'Código', field: 'code', sortable: true },
      { name: 'validity', align: 'center', label: 'Vigencia', field: 'validity', sortable: true },
      { name: 'month', align: 'center', label: 'Mes', field: 'month', sortable: true },
      { name: 'rounding', align: 'center', label: 'Redondeo', field: 'rounding', sortable: true },
      { name: 'seattypeclosure', align: 'center', label: 'Tipo asiento', field: 'seattypeclosure', sortable: true },
      { name: 'lostcount', align: 'center', label: 'Cuenta pedida', field: 'lostcount', sortable: true },
      { name: 'profitaccount', align: 'center', label: 'Cuenta utilidad', field: 'profitaccount', sortable: true },
      { name: 'closingaccount', align: 'center', label: 'Cuenta cierre', field: 'closingaccount', sortable: true },
      { name: 'inuse', align: 'center', label: 'En uso', field: 'inuse', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAcccongens()
      getMonth()
      getStatus()
      getInusos()
      getRounding()
      getAccountCatalog()
      getValidity()
    })
    const getAcccongens = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAcccongens.value = data
      visible.value = false
    }
    const getMonth = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataMonth.value = data
      visible.value = false
    }
    const getStatus = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataStatus.value = data
      visible.value = false
    }
    const getInusos = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataInuso.value = data
      visible.value = false
    }
    const getRounding = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataRouding.value = data
      visible.value = false
    }
    const getAccountCatalog = async () => {
      visible.value = true
      const { data } = await api.get('/account-catalog')
      dataAccountCatalog.value = data.filter(catalogo => catalogo.level === 5)
      visible.value = false
    }
    const getValidity = async () => {
      visible.value = true
      const { data } = await api.get('/configuration/validity')
      dataValidity.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      validity.value = null
      seattypeclosure.value = null
      lostcount.value = null
      profitaccount.value = null
      closingaccount.value = null
      isEditing.value = false
      active.value = false
      month.value = null
      inuse.value = null
      rounding.value = null
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            validity: validity.value,
            seattypeclosure: seattypeclosure.value,
            lostcount: lostcount.value,
            profitaccount: profitaccount.value,
            month: month.value,
            status: active.value ? ACTIVE : INACTIVE,
            inuse: inuse.value,
            rounding: rounding.value
          }).then(() => {
            dialog.value = false
            getAcccongens()
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
      validity.value = row.validity
      seattypeclosure.value = row.seattypeclosure
      lostcount.value = row.lostcount
      profitaccount.value = row.profitaccount
      closingaccount.value = row.closingaccount
      month.value = row.month
      inuse.value = row.inuse
      rounding.value = row.rounding
      if (row.status === ACTIVE) {
        active.value = true
      }
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            code: code.value,
            validity: validity.value,
            seattypeclosure: seattypeclosure.value,
            lostcount: lostcount.value,
            profitaccount: profitaccount.value,
            closingaccount: closingaccount.value,
            month: month.value,
            inuse: inuse.value,
            rounding: rounding.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getAcccongens()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Esté seguro que desea eliminar la acccongen: ' + row.id + '?',
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
          getAcccongens()
        })
      })
    }

    const filterFnAccountCatalog = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsAccountCatalog.value = dataAccountCatalog.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsAccountCatalog.value = dataAccountCatalog.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterFnValidity = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsValidity.value = dataValidity.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filterOptionsValidity.value = dataValidity.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      dialog,
      dataAcccongens,
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
      validity,
      seattypeclosure,
      lostcount,
      profitaccount,
      closingaccount,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      MESES,
      month,
      states,
      status,
      inuse,
      uso,
      rounding,
      redondeo,
      filterFnAccountCatalog,
      filterOptionsAccountCatalog,
      dataAccountCatalog,
      filterOptionsValidity,
      dataValidity,
      filterFnValidity
    }
  }
})
</script>
