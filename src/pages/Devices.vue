<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm q-col-gutter-sm">
      
      <div class="col-12">
        <div class="text-h5 text-primary text-weight-bold q-my-md">
          <q-icon name="computer" size="lg" class="q-mr-sm" /> Computadores
          <div class="text-caption">
            Lista de todos os computadores por etapa de manutenção.
          </div>
        </div>
        <q-expansion-item
          v-model="expanded"
          class="bg-white shadow-1"
          style="border-radius: 4px"
          icon="search"
          label="Filtros"
          caption="John Doe"
        >
          <q-card>
            <q-card-section class="q-pt-sm">
              <q-form @submit.prevent="getComputers">
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      @filter="filterFn"
                      v-model="filters.current_step" 
                      :options="stepOptions" 
                      label="Etapa"
                      emit-value
                      map-options
                      outlined
                      dense
                      use-input
                    />
                  </div>
                </div>
                
                <div class="col-12 text-right">
                  <q-btn
                    class="q-ma-xs"
                    type="submit"
                    label="Limpar"
                    color="primary"
                    flat
                  />
                  <q-btn
                    class="q-ma-xs"
                    type="submit"
                    label="Filtrar"
                    color="primary"
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
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { stepOptions } from 'src/utils/constants'
import ComputerCard from 'components/ComputerCard.vue'
import ComputerCardSkeleton from 'components/skeletons/ComputerCardSkeleton'

export default {
  name: 'Devices',
  components: {
    ComputerCard,
    ComputerCardSkeleton
  },
  data: () => ({
    page: 1,
    lastPage: 1,
    computers: [],
    loading: false,
    stepOptions: [...stepOptions],
    filters: {
      current_step: ''
    },
    expanded: false
  }),
  methods: {
    async getComputers () {
      this.loading = true
      const { data } = await this.$axios.get('computers', { 
        params: { 
          page: this.page,
          current_step: this.filters.current_step
        
        }
      });
      this.computers = data.data
      this.lastPage = data.last_page
      this.loading = false
    },
    refresh () {
      this.page = 1
      this.getComputers()
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.stepOptions = [...stepOptions]
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.stepOptions = stepOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    clearFilters () {
      this.filters = {
        current_step: ''
      }
    }
  },
  created () {
    this.getComputers()
  }
}
</script>

<style>

</style>