<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm q-col-gutter-sm">
      
      <div class="col-12">
        <div class="text-h5 text-primary text-weight-bold q-mx-sm q-my-md">
          <q-icon name="computer" size="lg" class="q-mr-sm" /> Computadores
        </div>
        <q-expansion-item
          class="bg-white shadow-1"
          style="border-radius: 4px"
          icon="search"
          label="Filtros"
          header-class="text-h6 text-primary text-weight-light"
        >
          <q-card>
            <q-card-section class="q-pt-sm">
              <q-form @submit.prevent="getComputers">
                <div class="row q-col-gutter-md">
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <filterable-select
                      label="Etapa"
                      v-model="filters.current_step"
                      :options="stepOptions"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <filterable-select
                      label="Tipo"
                      v-model="filters.type" 
                      :options="typeOptions" 
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input
                      label="Fabricante"
                      v-model="filters.manufacturer" 
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input
                      label="Patrimônio"
                      v-model="filters.patrimony" 
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <filterable-select
                      label="Responsável"
                      v-model="filters.current_step_responsible_id" 
                      :options="userOptions" 
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <computer-input
                      label="Identificador"
                      v-model="filters.id"
                    />
                  </div>
                </div>
                <div class="col-12 q-mt-sm text-right">
                  <q-btn
                    @click="clearFilters"
                    class="q-ma-xs"
                    label="Limpar"
                    color="primary"
                    flat
                  />
                  <q-btn
                    class="q-ma-xs"
                    type="submit"
                    label="Filtrar"
                    color="secondary"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-px-sm">
      <template v-if="loading">
        <div class="col-md-3 col-sm-6 col-xs-12" v-for="i in 12" :key="i">
          <computer-card-skeleton  />
        </div>
      </template>
      <template v-else>
      <div class="col-md-3 col-sm-6 col-xs-12" v-for="computer in computers" :key="computer.id">
        <computer-card @refresh="refresh" :computer="computer" />
      </div>
      </template>
    </div>
    
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        @input=getComputers
        v-model="page"
        :max="lastPage"
      />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showCreateComputerDialog" fab icon="add" color="primary">
        <q-tooltip>
          Novo Computador
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { stepOptions } from 'src/utils/constants'
import ComputerCard from 'components/ComputerCard.vue'
import ComputerCardSkeleton from 'components/skeletons/ComputerCardSkeleton'
import FilterableSelect from 'components/FilterableSelect'
import ComputerInput from 'components/ComputerInput'
import CreateComputerDialog from 'components/dialogs/CreateComputerDialog'

export default {
  name: 'Devices',
  components: {
    ComputerCard,
    ComputerCardSkeleton,
    FilterableSelect,
    ComputerInput
  },
  data: () => ({
    page: 1,
    lastPage: 1,
    computers: [],
    loading: false,
    userOptionsLoading: false,
    stepOptions: [...stepOptions],
    typeOptions: [
      {
        label: 'Desktop',
        value: 'desktop'
      },
      {
        label: 'Notebook',
        value: 'notebook'
      }
    ],
    filters: {
      current_step: '',
      type: '',
      manufacturer: '',
      patrimony: '',
      current_step_responsible_id: '',
      id: ''
    },
    userOptions: []
  }),
  methods: {
    async getComputers () {
      this.loading = true
      const { data } = await this.$axios.get('computers', { 
        params: { 
          page: this.page,
          ...this.filters
        }
      });
      this.computers = data.data
      this.lastPage = data.last_page
      this.loading = false
    },
    async getUserOptions () {
      this.userOptionsLoading = true
      const { data } = await this.$axios.get('user-select-options-index')

      this.userOptions = data.users
      this.userOptionsLoading = false
    },
    refresh () {
      this.page = 1
      this.getComputers()
    },
    clearFilters () {
      this.filters = {
        current_step: '',
        type: ''
      }

      this.getComputers()
    },
    showCreateComputerDialog () {
      this.$q.dialog({
        component: CreateComputerDialog
      })
    }
  },
  created () {
    this.getComputers()
    this.getUserOptions()
  }
}
</script>

<style>

</style>