<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Parameterizationqx" :rows="dataParameterizationqxs" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="tariffmanual" :props="props">
                  {{ tariffmanualOptions[props.row.tariffmanual].description }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="detail1" :props="props">
                  <q-btn round size="xs" color="info" icon="slideshow" v-on:click="detail1.show(props.row)" />
                </q-td>
                <q-td key="detail2" :props="props">
                  <q-btn round size="xs" color="info" icon="slideshow" v-on:click="detail2.show(props.row)" />
                </q-td>
                <q-td key="detail3" :props="props">
                  <q-btn v-if="props.row.tariffmanual == 2" round size="xs" color="info" icon="slideshow" v-on:click="detail3.show(props.row)" />
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
                <q-input white color="blue" v-model="code" label="Código *" :readonly="readOnly" lazy-rules
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
                v-model="tariffmanual"
                label="Manual tarifario *"
                :options="tariffmanualOptions"
                option-value="id"
                option-label="description"
                emit-value
                map-options
                lazy-rules
                :rules="[ val => val != null ? val : 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-12 col-sm-4 col-xs-12 text-center">
                <q-toggle
                label="Estado"
                v-model="active"
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
    <!--++++++++++++++++++++++++++++DETAIL 1+++++++++++++++++++++++++++++++-->
    <q-dialog v-model="detail1.dialog" persistent>
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
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusFather] }}</div>
                </template>
              </q-field>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Detalle" :rows="detail1.rows" :filter="detail1.filter" :columns="columnsDetail1" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="detail1.creating" label="Agregar"/>
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="detail1.filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="typesurgery" :props="props">
                  {{ detail1.typesurgeryOptions[props.row.typesurgery].description }}
                </q-td>
                <q-td key="numbersurgeries" :props="props">
                  {{ props.row.numbersurgeries }}
                </q-td>
                <q-td key="surgeon" :props="props">
                  {{ props.row.surgeon }}
                </q-td>
                <q-td key="anesthesiologist" :props="props">
                  {{ props.row.anesthesiologist }}
                </q-td>
                <q-td key="surgicalassistant" :props="props">
                  {{ props.row.surgicalassistant }}
                </q-td>
                <q-td key="operoorig" :props="props">
                  {{ props.row.operoorig }}
                </q-td>
                <q-td key="meterials" :props="props">
                  {{ props.row.meterials }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="detail1.editingDetail(props.row)"/>
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="detail1.onDelete(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detail1.dialogForm" persistent>
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
          <q-form ref="myForm1" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="detail1.typesurgery"
                  label="Tipo de cirugía *"
                  :options="detail1.typesurgeryOptions"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => val != null ? val : 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.numbersurgeries"
                  label="Numero de cirugía *"
                  :disable="detail1.readOnly"
                  lazy-rules
                  :rules="[
                    val => detail1.rows.some(
                      e => e.numbersurgeries == val &&
                      e.typesurgery == detail1.typesurgery) ?
                      'Este número ya se encuentra asociado en otro registro' : !!val
                  ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.surgeon"
                  label="Porcentaje cirujano *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.anesthesiologist"
                  label="Porcentje anestesiologo *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.surgicalassistant"
                  label="Porcentaje ayudante Quirúrgico *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.operoorig"
                  label="Porcentaje derechos de sala de quirófano *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail1.meterials"
                  label="Porcenteje materiales *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <q-toggle v-model="detail1.active" label="Estado"/>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!detail1.isEditing">
              <q-btn round icon="save" @click.prevent="detail1.onSubmit" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="detail1.onEditing" color="primary"/>
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
    <!--++++++++++++++++++++++++++++DETAIL 2+++++++++++++++++++++++++++++++-->
    <q-dialog v-model="detail2.dialog" persistent>
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
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusFather] }}</div>
                </template>
              </q-field>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Detalle" :rows="detail2.rows" :filter="detail2.filter" :columns="columnsDetail2" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="detail2.creating" label="Agregar"/>
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="detail2.filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="roomrighttypes" :props="props">
                  {{ detail2.roomrighttypesOptions[props.row.roomrighttypes].description }}
                </q-td>
                <q-td key="roompercentage" :props="props">
                  {{ props.row.roompercentage }}
                </q-td>
                <q-td key="materialvalue" :props="props">
                  {{ props.row.materialvalue }}
                </q-td>
                <q-td key="healthservice" :props="props">
                  {{ props.row.healthservice.code }} - {{ props.row.healthservice.description }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="detail2.editingDetail(props.row)"/>
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="detail2.onDelete(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detail2.dialogForm" persistent>
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
          <q-form ref="myForm2" @submit.prevent="">
            <div class="row justify-around">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="detail2.roomrighttypes"
                  label="Tipo derechos de sala *"
                  :options="detail2.roomrighttypesOptions"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => val == null ? 'El campo es obligatorio': val ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail2.roompercentage"
                  label="Porcentaje de sala *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail2.materialvalue"
                  label="Valor de materiales *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="detail2.healthservice"
                  label="Servicio de salud de materiales *"
                  @filter="filterHealthservice"
                  :options="filterOptHealthservice"
                  :option-label="e => e.code + ' - ' + e.description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <q-toggle v-model="detail2.active" label="Estado"/>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!detail2.isEditing">
              <q-btn round icon="save" @click.prevent="detail2.onSubmit" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="detail2.onEditing" color="primary"/>
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

    <!--++++++++++++++++++++++++++++DETAIL 3+++++++++++++++++++++++++++++++-->
    <q-dialog v-model="detail3.dialog" persistent>
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
                  <div class="self-center full-width no-outline" tabindex="0">{{ states[statusFather] }}</div>
                </template>
              </q-field>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" title="Detalle" :rows="detail3.rows" :filter="detail3.filter" :columns="columnsDetail3" row-key="name" >
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="detail3.creating" label="Agregar"/>
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="detail3.filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="assistantvalue" :props="props">
                  {{ props.row.assistantvalue }}
                </q-td>
                <q-td key="roomrightvalue" :props="props">
                  {{ props.row.roomrightvalue }}
                </q-td>
                <q-td key="roomrighttypes" :props="props">
                  {{ detail3.roomrighttypesOptions[props.row.roomrighttypes].description }}
                </q-td>
                <q-td key="uvrinitialrango" :props="props">
                  {{ props.row.uvrinitialrango }}
                </q-td>
                <q-td key="uvrfinalrango" :props="props">
                  {{ props.row.uvrfinalrango }}
                </q-td>
                <q-td key="healthservice" :props="props">
                  {{ props.row.healthservice.code }} - {{ props.row.healthservice.description }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ states[props.row.status] }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="detail3.editingDetail(props.row)"/>
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="detail3.onDelete(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detail3.dialogForm" persistent>
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
          <q-form ref="myForm3" @submit.prevent="">

            <q-banner class="bg-grey-3 col-md-12">
              <template v-slot:avatar>
                <q-icon name="info" color="info" />
              </template>
              Los siguientes campos aplican para cirugías mayores a 450 UVR
            </q-banner>

            <div class="row justify-around">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail3.assistantvalue"
                  label="Valor de ayudantía *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail3.roomrightvalue"
                  label="Valor de derecho de sala *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>

              <q-banner class="bg-grey-3 col-md-12">
                <template v-slot:avatar>
                  <q-icon name="info" color="info" />
                </template>
                los siguientes campos ISS - No cruentos por rangos UVR
              </q-banner>

              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="detail3.roomrighttypes"
                  label="Tipo derechos de sala *"
                  :options="detail3.roomrighttypesOptions"
                  option-label="description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => val == null ? 'El campo es obligatorio' : val]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail3.uvrinitialrango"
                  label="Rango de UVR Inicial *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-input
                  white
                  type="number"
                  color="blue"
                  v-model="detail3.uvrfinalrango"
                  label="Rango de UVR Final *"
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio' ]"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <q-select
                  white
                  color="blue"
                  v-model="detail3.healthservice"
                  label="Servicio de salud de materiales *"
                  @filter="filterHealthservice"
                  :options="filterOptHealthservice"
                  :option-label="e => e.code + ' - ' + e.description"
                  option-value="id"
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[ val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <q-toggle v-model="detail3.active" label="Estado"/>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!detail3.isEditing">
              <q-btn round icon="save" @click.prevent="detail3.onSubmit" color="primary"/>
              <q-tooltip>Guardar datos</q-tooltip>
            </div>

            <div v-else>
              <q-btn round icon="save" @click.prevent="detail3.onEditing" color="primary"/>
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
import {
  ACTIVE,
  INACTIVE,
  STATUS,
  TARIFFMANUAL,
  TYPESURGERY,
  ROOMRIGHTTYPES
} from '../../constants/Constants'
export default defineComponent({
  name: 'ParameterizationqxsPage',
  setup () {
    const path = '/hiring/parameterizationqxs'
    const detail1 = reactive({
      parameterizationxp: null,
      typesurgery: null,
      typesurgeryOptions: TYPESURGERY,
      numbersurgeries: null,
      surgeon: null,
      anesthesiologist: null,
      surgicalassistant: null,
      operoorig: null,
      meterials: null,
      active: false,
      rows: [],
      dialog: false,
      filter: null,
      idDetail: null,
      dialogForm: false,
      isEditing: false,
      readOnly: false,
      getAll: async () => {
        visible.value = true
        const { data } = await api.get('/hiring/parqxdetail1s/head/' + idFather.value)
        detail1.rows = data
        visible.value = false
        console.log(detail1.rows)
      },
      show: (row) => {
        idFather.value = row.id
        code.value = row.code
        description.value = row.description
        statusFather.value = row.status
        detail1.getAll()
        detail1.dialog = true
      },
      creating: () => {
        detail1.onReset()
        detail1.dialogForm = true
        detail1.typesurgery = 0
        detail1.readOnly = false
        detail1.active = true
      },
      onReset: () => {
        detail1.typesurgery = null
        detail1.numbersurgeries = null
        detail1.surgeon = null
        detail1.anesthesiologist = null
        detail1.surgicalassistant = null
        detail1.operoorig = null
        detail1.meterials = null
        detail1.active = false
        detail1.isEditing = false
        detail1.active = false
      },
      editingDetail: (row) => {
        detail1.onReset()
        detail1.idDetail = row.id
        detail1.dialogForm = true
        detail1.isEditing = true
        detail1.typesurgery = row.typesurgery
        detail1.numbersurgeries = row.numbersurgeries
        detail1.surgeon = row.surgeon
        detail1.anesthesiologist = row.anesthesiologist
        detail1.surgicalassistant = row.surgicalassistant
        detail1.operoorig = row.operoorig
        detail1.meterials = row.meterials
        detail1.readOnly = true
        if (row.status === ACTIVE) {
          detail1.active = true
        }
      },
      onSubmit: () => {
        myForm1.value.validate().then(async success => {
          if (success) {
            api.post('/hiring/parqxdetail1s', {
              parameterizationqx: idFather.value,
              typesurgery: detail1.typesurgery,
              numbersurgeries: detail1.numbersurgeries,
              surgeon: detail1.surgeon,
              anesthesiologist: detail1.anesthesiologist,
              surgicalassistant: detail1.surgicalassistant,
              operoorig: detail1.operoorig,
              meterials: detail1.meterials,
              status: detail1.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail1.dialogForm = false
              detail1.getAll()
            })
          }
        })
      },
      onEditing: () => {
        myForm1.value.validate().then(async success => {
          if (success) {
            api.patch('/hiring/parqxdetail1s/' + detail1.idDetail, {
              parameterizationqx: idFather.value,
              typesurgery: detail1.typesurgery,
              numbersurgeries: detail1.numbersurgeries,
              surgeon: detail1.surgeon,
              anesthesiologist: detail1.anesthesiologist,
              surgicalassistant: detail1.surgicalassistant,
              operoorig: detail1.operoorig,
              meterials: detail1.meterials,
              status: detail1.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail1.dialogForm = false
              detail1.getAll()
            })
          }
        })
      },
      onDelete: (row) => {
        $q.dialog({
          title: 'Confirmación',
          message: '¿Está seguro que desea eliminar el detalle de Parametrización QX?',
          ok: {
            label: 'Si',
            color: 'positive'
          },
          cancel: {
            label: 'No',
            color: 'negative'
          }
        }).onOk(() => {
          api.delete('/hiring/parqxdetail1s/' + row.id).then(response => {
            detail1.dialogForm = false
            detail1.getAll()
          })
        })
      }
    })
    const detail2 = reactive({
      parameterizationxp: null,
      roomrighttypes: null,
      roomrighttypesOptions: ROOMRIGHTTYPES,
      roompercentage: null,
      materialvalue: null,
      healthservice: null,
      active: false,
      rows: [],
      dialog: false,
      filter: null,
      idDetail: null,
      dialogForm: false,
      isEditing: false,
      getAll: async () => {
        visible.value = true
        const { data } = await api.get('/hiring/parqxdetail2s/head/' + idFather.value)
        detail2.rows = data
        visible.value = false
      },
      show: (row) => {
        idFather.value = row.id
        code.value = row.code
        description.value = row.description
        statusFather.value = row.status
        detail2.getAll()
        detail2.dialog = true
      },
      creating: () => {
        detail2.onReset()
        detail2.dialogForm = true
        detail2.roomrighttypes = 0
        detail2.active = true
      },
      onReset: () => {
        detail2.roomrighttypes = null
        detail2.roompercentage = null
        detail2.materialvalue = null
        detail2.healthservice = null
        detail2.active = false
        detail2.isEditing = false
      },
      editingDetail: (row) => {
        detail2.onReset()
        detail2.idDetail = row.id
        detail2.dialogForm = true
        detail2.isEditing = true
        detail2.roomrighttypes = row.roomrighttypes
        detail2.roompercentage = row.roompercentage
        detail2.materialvalue = row.materialvalue
        detail2.healthservice = row.healthservice
        if (row.status === ACTIVE) {
          detail2.active = true
        }
      },
      onSubmit: () => {
        myForm2.value.validate().then(async success => {
          if (success) {
            api.post('/hiring/parqxdetail2s', {
              parameterizationqx: idFather.value,
              roomrighttypes: detail2.roomrighttypes,
              roompercentage: detail2.roompercentage,
              materialvalue: detail2.materialvalue,
              healthservice: detail2.healthservice,
              status: detail2.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail2.dialogForm = false
              detail2.getAll()
            })
          }
        })
      },
      onEditing: () => {
        myForm2.value.validate().then(async success => {
          if (success) {
            api.patch('/hiring/parqxdetail2s/' + detail2.idDetail, {
              parameterizationqx: idFather.value,
              roomrighttypes: detail2.roomrighttypes,
              roompercentage: detail2.roompercentage,
              materialvalue: detail2.materialvalue,
              healthservice: detail2.healthservice,
              status: detail2.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail2.dialogForm = false
              detail2.getAll()
            })
          }
        })
      },
      onDelete: (row) => {
        $q.dialog({
          title: 'Confirmación',
          message: '¿Está seguro que desea eliminar el detalle de Parametrización QX?',
          ok: {
            label: 'Si',
            color: 'positive'
          },
          cancel: {
            label: 'No',
            color: 'negative'
          }
        }).onOk(() => {
          api.delete('/hiring/parqxdetail2s/' + row.id).then(response => {
            detail2.dialogForm = false
            detail2.getAll()
          })
        })
      }
    })
    const detail3 = reactive({
      parameterizationxp: null,
      assistantvalue: null,
      roomrightvalue: null,
      roomrighttypes: null,
      roomrighttypesOptions: ROOMRIGHTTYPES,
      uvrinitialrango: null,
      uvrfinalrango: null,
      healthservice: null,
      active: false,
      rows: [],
      dialog: false,
      filter: null,
      idDetail: null,
      dialogForm: false,
      isEditing: false,
      getAll: async () => {
        visible.value = true
        const { data } = await api.get('/hiring/parqxdetail3s/head/' + idFather.value)
        detail3.rows = data
        visible.value = false
      },
      show: (row) => {
        idFather.value = row.id
        code.value = row.code
        description.value = row.description
        statusFather.value = row.status
        detail3.getAll()
        detail3.dialog = true
      },
      creating: () => {
        detail3.onReset()
        detail3.dialogForm = true
        detail3.roomrighttypes = 0
        detail3.active = true
      },
      onReset: () => {
        detail3.assistantvalue = null
        detail3.roomrightvalue = null
        detail3.roomrighttypes = null
        detail3.uvrinitialrango = null
        detail3.uvrfinalrango = null
        detail3.healthservice = null
        detail3.active = false
        detail3.isEditing = false
      },
      editingDetail: (row) => {
        detail3.onReset()
        detail3.idDetail = row.id
        detail3.dialogForm = true
        detail3.isEditing = true
        detail3.assistantvalue = row.assistantvalue
        detail3.roomrightvalue = row.roomrightvalue
        detail3.roomrighttypes = row.roomrighttypes
        detail3.uvrinitialrango = row.uvrinitialrango
        detail3.uvrfinalrango = row.uvrfinalrango
        detail3.healthservice = row.healthservice
        if (row.status === ACTIVE) {
          detail3.active = true
        }
      },
      onSubmit: () => {
        myForm3.value.validate().then(async success => {
          if (success) {
            api.post('/hiring/parqxdetail3s', {
              parameterizationqx: idFather.value,
              assistantvalue: detail3.assistantvalue,
              roomrightvalue: detail3.roomrightvalue,
              roomrighttypes: detail3.roomrighttypes,
              uvrinitialrango: detail3.uvrinitialrango,
              uvrfinalrango: detail3.uvrfinalrango,
              healthservice: detail3.healthservice,
              status: detail3.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail3.dialogForm = false
              detail3.getAll()
            })
          }
        })
      },
      onEditing: () => {
        myForm3.value.validate().then(async success => {
          if (success) {
            api.patch('/hiring/parqxdetail3s/' + detail3.idDetail, {
              parameterizationqx: idFather.value,
              assistantvalue: detail3.assistantvalue,
              roomrightvalue: detail3.roomrightvalue,
              roomrighttypes: detail3.roomrighttypes,
              uvrinitialrango: detail3.uvrinitialrango,
              uvrfinalrango: detail3.uvrfinalrango,
              healthservice: detail3.healthservice,
              status: detail3.active ? ACTIVE : INACTIVE
            }).then(() => {
              detail3.dialogForm = false
              detail3.getAll()
            })
          }
        })
      },
      onDelete: (row) => {
        $q.dialog({
          title: 'Confirmación',
          message: '¿Está seguro que desea eliminar el detalle de Parametrización QX?',
          ok: {
            label: 'Si',
            color: 'positive'
          },
          cancel: {
            label: 'No',
            color: 'negative'
          }
        }).onOk(() => {
          api.delete('/hiring/parqxdetail3s/' + row.id).then(response => {
            detail3.dialogForm = false
            detail3.getAll()
          })
        })
      }
    })
    const myForm1 = ref(null)
    const myForm2 = ref(null)
    const myForm3 = ref(null)
    const dialog = ref(false)
    const visible = ref(false)
    const readOnly = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataHealthservice = ref([])
    const filterOptHealthservice = ref(dataHealthservice)
    const dataParameterizationqxs = ref([])
    const code = ref(null)
    const idFather = ref(null)
    const statusFather = ref(null)
    const description = ref(null)
    const role = ref(null)
    const active = ref(false)
    const states = ref(STATUS)
    const tariffmanualOptions = ref(TARIFFMANUAL)
    const tariffmanual = ref(null)
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
      { name: 'tariffmanual', align: 'center', label: 'Manual tarifario', field: 'tariffmanual', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true },
      { name: 'detail1', align: 'center', label: 'Liquidación de cirugías', field: 'detail1', sortable: true },
      { name: 'detail2', align: 'center', label: 'Sala no cruentos', field: 'detail2', sortable: true },
      { name: 'detail3', align: 'center', label: 'Liquidación de cirugías rangos UVR', field: 'detail3', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columnsDetail1 = ref([
      { name: 'typesurgery', align: 'center', label: 'Tipo de Cirugía', field: 'typesurgery', sortable: true },
      { name: 'numbersurgeries', align: 'center', label: 'Numero de cirugías', field: 'numbersurgeries', sortable: true },
      { name: 'surgeon', align: 'center', label: 'Cirujano', field: 'surgeon', sortable: true },
      { name: 'anesthesiologist', align: 'center', label: 'Anestesiologo', field: 'anesthesiologist', sortable: true },
      { name: 'surgicalassistant', align: 'center', label: 'Ayudante Quirúrgico', field: 'surgicalassistant', sortable: true },
      { name: 'operoorig', align: 'center', label: 'Derechos de sala de quirófano', field: 'operoorig', sortable: true },
      { name: 'meterials', align: 'center', label: 'Materiales', field: 'meterials', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'Estado', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columnsDetail2 = ref([
      { name: 'roomrighttypes', align: 'center', label: 'Tipos Derechos de sala', field: 'roomrighttypes', sortable: true },
      { name: 'roompercentage', align: 'center', label: 'Porcentaje de sala', field: 'roompercentage', sortable: true },
      { name: 'materialvalue', align: 'center', label: 'Valor de materiales', field: 'materialvalue', sortable: true },
      { name: 'healthservice', align: 'center', label: 'Servicio de salud de materiales', field: 'healthservice', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'Estado', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columnsDetail3 = ref([
      { name: 'assistantvalue', align: 'center', label: 'Valor de ayudantía', field: 'assistantvalue', sortable: true },
      { name: 'roomrightvalue', align: 'center', label: 'Valor de derecho de sala', field: 'roomrightvalue', sortable: true },
      { name: 'roomrighttypes', align: 'center', label: 'Tipos Derechos de sala', field: 'roomrighttypes', sortable: true },
      { name: 'uvrinitialrango', align: 'center', label: 'Rango de UVR inicial', field: 'uvrinitialrango', sortable: true },
      { name: 'uvrfinalrango', align: 'center', label: 'Rango de UVR final', field: 'uvrfinalrango', sortable: true },
      { name: 'healthservice', align: 'center', label: 'Servicio de salud de materiales', field: 'healthservice', sortable: true },
      { name: 'status', align: 'center', label: 'Estado', field: 'Estado', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getParameterizationqxs()
      getHealthservice()
    })
    const getParameterizationqxs = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataParameterizationqxs.value = data
      visible.value = false
    }
    const getHealthservice = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/healthservices')
      dataHealthservice.value = data
      visible.value = false
    }
    const filterHealthservice = (val, update) => {
      if (val === '') {
        update(() => {
          filterOptHealthservice.value = dataHealthservice.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filterOptHealthservice.value = dataHealthservice.value.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    }
    const creating = () => {
      onReset()
      dialog.value = true
      readOnly.value = false
      tariffmanual.value = 0
      active.value = true
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
            tariffmanual: tariffmanual.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getParameterizationqxs()
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
      tariffmanual.value = row.tariffmanual
      readOnly.value = true
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
            tariffmanual: tariffmanual.value,
            status: active.value ? ACTIVE : INACTIVE
          }).then(() => {
            dialog.value = false
            getParameterizationqxs()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la Parametrización QX: ' + row.code + '?',
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
          getParameterizationqxs()
        })
      })
    }

    // +++++++++++++++++++++Details++++++++++++++++++++++++++++

    /* const getAllDetail1 = async () => {
      visible.value = true
      const { data } = await api.get('/hiring/parqxdetail1s/head/' + idFather.value)
      detail1.rows.value = data
      visible.value = false
    } */

    const showDetail1 = (row) => {
      idFather.value = row.id
      code.value = row.code
      description.value = row.description
      statusFather.value = row.status
      detail1.getAllDetail1()
      detail1.dialog = true
    }

    return {
      dialog,
      dataParameterizationqxs,
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
      tariffmanual,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
      states,
      tariffmanualOptions,
      detail1,
      detail2,
      detail3,
      columnsDetail1,
      columnsDetail2,
      columnsDetail3,
      idFather,
      statusFather,
      showDetail1,
      myForm1,
      myForm2,
      myForm3,
      getHealthservice,
      filterHealthservice,
      dataHealthservice,
      filterOptHealthservice,
      readOnly
    }
  }
})
</script>
