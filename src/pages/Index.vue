<template>
  <q-page class="bg-grey-2">
    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col-12">
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-h4 text-primary">
              Programa Solidariedade Digital  
            </div>
          </q-card-section>
          <q-card-section>
            Juntos por um importante objetivo: promover a <b>inclusão digital</b> dos estudantes que fazem parte do programa de assistência estudantil da Universidade Federal do Espírito Santo.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6" v-if="computersBySteps">
        <q-card class="fit">
          <q-card-section class="text-h6 row justify-between items-center text-weight-light text-primary q-pb-none">
            <div>
              <q-icon name="insights" class="q-mr-sm" />
              Computadores por Etapa
            </div>
           <q-chip icon="insights" color="secondary" text-color="white">
            {{ computersBySteps.step_data.reduce((a, c) => a + c, 0) + ' Computadores' }}
           </q-chip>
          </q-card-section>
          <q-card-section>
            <line-chart 
              :data="computersBySteps.step_data" 
              :labels="computersBySteps.step_labels" 
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6" v-if="components">
        <q-card class="fit">
          <q-card-section class="text-h6 row justify-between items-center text-weight-light text-primary q-pb-none">
            <div>
              <q-icon name="insights" class="q-mr-sm" />
              Distribuição de Componentes
            </div>
           <q-chip icon="insights" color="secondary" text-color="white">
            {{ components.components_data.reduce((a, c) => a + c, 0) + ' Componentes' }}
           </q-chip>
          </q-card-section>
          <q-card-section>
            <bar-chart 
              :data="components.components_data" 
              :labels="components.components_labels" 
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6" v-if="borrowedComputers">
        <q-card>
          <q-card-section class="text-h6 text-weight-light text-primary q-pb-none">
            <q-icon name="insights" class="q-mr-sm" />
           Computadores em Empréstimo
          </q-card-section>
          <q-card-section>
            <doughnut-chart 
              :data="borrowedComputers.borrowed_data" 
              :labels="borrowedComputers.borrowed_labels" 
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6" v-if="responsibleComputers">
        <q-card class="fit">
          <q-card-section class="text-h6 text-weight-light text-primary q-pb-none">
            <q-icon name="insights" class="q-mr-sm" />
           Computadores sob Responsabilidade
          </q-card-section>
          <q-card-section>
            <div v-if="responsibleComputers.length == 0">
              Não existe nenhum computador sob sua responsabilidade até o momento.
            </div>
            <q-list v-else bordered>
              <q-item
                @click="handleComputerClick(computer.id)"
                v-for="computer in responsibleComputers" 
                :key="computer.id" 
                clickable
                >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="computer"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ computer.description }} <b>{{ ' #' + computer.id }}</b>
                  </q-item-label>
                  <q-item-label caption>
                    {{ maintenanceSteps[computer.current_step] }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="arrow_right" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import LineChart from 'components/charts/LineChart'
import DoughnutChart from 'components/charts/DoughnutChart'
import BarChart from 'components/charts/BarChart'
import { maintenanceSteps } from 'src/utils/constants'

export default {
  name: 'PageIndex',
  components: {
    LineChart,
    BarChart,
    DoughnutChart
  },
  data: () => ({
    maintenanceSteps,
    computersBySteps: null,
    borrowedComputers: null,
    components: null,
    responsibleComputers: null
  }),
  methods: {
    async getDashboardData () {
      try {
        this.$q.loading.show()
        const { data } = await this.$axios.get('dashboard')
        this.computersBySteps = data.computers_by_steps
        this.borrowedComputers = data.borrowed_computers
        this.components = data.components
        this.responsibleComputers = data.responsible_computers
        
      } finally {
        this.$q.loading.hide()
      }
    },
    handleComputerClick (id) {
      return this.$router.push({ name: 'Maintenance', params: { id }})
    }
  },
  created () {
    this.getDashboardData()
  }
}
</script>
