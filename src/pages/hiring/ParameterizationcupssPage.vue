<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Parameterizationcups" :rows="dataParameterizationcupss" :filter="filter" :columns="columns"
            row-key="name">
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
                <q-td key="group" :props="props">
                  {{ props.row.group.description }}
                </q-td>
                <q-td key="subgroup" :props="props">
                  {{ props.row.subgroup.description }}
                </q-td>
                <q-td key="category" :props="props">
                  {{ props.row.category.description }}
                </q-td>
                <q-td key="subcategory" :props="props">
                  {{ props.row.subcategory.description }}
                </q-td>
                <q-td key="codhomsoat" :props="props">
                  {{ props.row.codhomsoat }}
                </q-td>
                <q-td key="deshomsoat" :props="props">
                  {{ props.row.deshomsoat }}
                </q-td>
                <q-td key="codhomiss" :props="props">
                  {{ props.row.codhomiss }}
                </q-td>
                <q-td key="deshomiss" :props="props">
                  {{ props.row.deshomiss }}
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
                  v-model="group"
                  label="Grupo *"
                  @filter="filterFnGroup"
                  :options="filterOptionsGroup"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="subgroup"
                  label="Subgrupo *"
                  @filter="filterFnSubgroup"
                  :options="filterOptionsSubgroup"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="category"
                  label="Categoría *"
                  @filter="filterFnCategory"
                  :options="filterOptionsCategory"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-4">
                <q-select
                  white
                  color="blue"
                  v-model="subcategory"
                  label="Subcategoría *"
                  @filter="filterFnSubcategory"
                  :options="filterOptionsSubcategory"
                  option-value="id"
                  option-label="description"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-6">
                <q-input white color="blue" v-model="codhomsoat" label="Código Homologo SOAT *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input white color="blue" v-model="deshomsoat" label="Descripción Homologo SOAT *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input white color="blue" v-model="codhomiss" label="Código Homologo ISS *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-6">
                <q-input white color="blue" v-model="deshomiss" label="Descripción Homologo ISS *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4">
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
import { ACTIVE, INACTIVE, STATUS } from '../../constants/Constants'
export default defineComponent({
  name: 'ParameterizationcupssPage',
  setup () {
    const path = '/hiring/parameterizationcupss'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const states = ref(STATUS)
    const filter = ref(null)
    const dataGroup = ref([])
    const filterOptionsGroup = ref(dataGroup)
    const dataSubgroup = ref([])
    const filterOptionsSubgroup = ref(dataSubgroup)
    const dataCategory = ref([])
    const filterOptionsCategory = ref(dataCategory)
    const dataSubcategory = ref([])
    const filterOptionsSubcategory = ref(dataSubcategory)
    const dataParameterizationcupss = ref([])
    const code = ref(null)
    const description = ref(null)
    const group = ref(null)
    const subgroup = ref(null)
    const category = ref(null)
    const subcategory = ref(null)
    const codhomsoat = ref(null)
    const deshomsoat = ref(null)
    const codhomiss = ref(null)
    const deshomiss = ref(null)
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
      { name: 'group', align: 'center', label: 'Grupo', field: 'group', sortable: true },
      { name: 'subgroup', align: 'center', label: 'Subgrupo', field: 'subgroup', sortable: true },
      { name: 'category', align: 'center', label: 'Categoría', field: 'category', sortable: true },
      { name: 'subcategory', align: 'center', label: 'Subcategoría', field: 'subcategory', sortable: true },
      { name: 'codhomsoat', align: 'center', label: 'Código Homologo SOAT', field: 'codhomsoat', sortable: true },
      { name: 'deshomsoat', align: 'center', label: 'Descripción Homologo SOAT', field: 'deshomsoat', sortable: true },
      { name: 'codhomiss', align: 'center', label: 'Código Homologo ISS', field: 'codhomiss', sortable: true },
      { name: 'deshomiss', align: 'center', label: 'Descripción Homologo ISS', field: 'deshomiss', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getParameterizationcupss()
      getGroup()
      getSubgroup()
      getCategory()
      getSubcategory()
    })
    const getGroup = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/groups-cups')
      dataGroup.value = data
      visible.value = false
    }
    const getSubgroup = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/subgruposcupss')
      dataSubgroup.value = data
      visible.value = false
    }
    const getCategory = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/categoriescupss')
      dataCategory.value = data
      visible.value = false
    }
    const getSubcategory = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/subcatcupss')
      dataSubcategory.value = data
      visible.value = false
    }
    const getParameterizationcupss = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataParameterizationcupss.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      code.value = null
      description.value = null
      group.value = null
      subgroup.value = null
      category.value = null
      subcategory.value = null
      codhomsoat.value = null
      deshomsoat.value = null
      codhomiss.value = null
      deshomiss.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            code: code.value,
            description: description.value,
            group: group.value,
            subgroup: subgroup.value,
            category: category.value,
            subcategory: subcategory.value,
            codhomsoat: codhomsoat.value,
            deshomsoat: deshomsoat.value,
            codhomiss: codhomiss.value,
            deshomiss: deshomiss.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getParameterizationcupss()
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
      group.value = row.group
      subgroup.value = row.subgroup
      category.value = row.category
      subcategory.value = row.subcategory
      codhomsoat.value = row.codhomsoat
      deshomsoat.value = row.deshomsoat
      codhomiss.value = row.codhomiss
      deshomiss.value = row.deshomiss
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
            group: group.value,
            subgroup: subgroup.value,
            category: category.value,
            subcategory: subcategory.value,
            codhomsoat: codhomsoat.value,
            deshomsoat: deshomsoat.value,
            codhomiss: codhomiss.value,
            deshomiss: deshomiss.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getParameterizationcupss()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: 'Está seguro que desea eliminar la Parametrización RIPS: ' + row.id + '?',
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
          getParameterizationcupss()
        })
      })
    }
    const filterFnGroup = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsGroup.value = dataGroup.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsGroup.value = dataGroup.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnSubgroup = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsSubgroup.value = dataSubgroup.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsSubgroup.value = dataSubgroup.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnCategory = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsCategory.value = dataCategory.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsCategory.value = dataCategory.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterFnSubcategory = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptionsSubcategory.value = dataSubcategory.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptionsSubcategory.value = dataSubcategory.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    return {
      dialog,
      dataParameterizationcupss,
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
      group,
      subgroup,
      category,
      subcategory,
      codhomsoat,
      deshomsoat,
      codhomiss,
      deshomiss,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      dataGroup,
      filterOptionsGroup,
      dataSubgroup,
      filterOptionsSubgroup,
      dataCategory,
      filterOptionsCategory,
      dataSubcategory,
      filterOptionsSubcategory,
      filterFnGroup,
      filterFnSubgroup,
      filterFnCategory,
      filterFnSubcategory
    }
  }
})
</script>
