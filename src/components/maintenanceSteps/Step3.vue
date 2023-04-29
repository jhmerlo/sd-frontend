<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-12 text-h6">
      Manutenção
    </div>
    <div class="col-12 text-caption q-mb-sm text-grey-9">
      Atividades realizadas para manter a operação do computador em boas condições.
    </div>
    <div class="col-12">
      Foi necessário realizar manutenção no computador? 
      <q-toggle
        v-model="maintenanceToggle"
        color="secondary"
      />
    </div>
    <template v-if="maintenanceToggle">
      <q-form @submit="handleSubmit" class="row col-12 q-col-gutter-md">
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Instalação de Softwares"
            v-model="maintenance.software_installation"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Instalação de Sistema Operacional"
            v-model="maintenance.operational_system_installation"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Formatação"
            v-model="maintenance.formatting"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Troca de Bateria"
            v-model="maintenance.battery_change"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Aspiração"
            v-model="maintenance.suction"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Outros"
            v-model="maintenance.other"
            outlined
            dense
          />
        </div>
        <div class="col-12 text-right">
          <q-btn
            type="submit"
            color="primary"
            label="Adicionar Manutenção"
          />
        </div>
      </q-form>
    </template>
    <div class="col-12">
      <q-list bordered>
        <q-expansion-item
          style="border-radius: 4px"        
          icon="construction"
          label="Histórico de Manutenção"
          header-class="text-body2 text-primary"
        >
          <q-card>
            <q-card-section>
              <q-timeline color="primary">
  
                <q-timeline-entry
                  v-for="history in val.maintenance_histories"
                  icon="construction"
                  :key="history.id"
                >
                <template v-slot:title>
                  <div class="text-body1">
                    {{ history.responsible.name }}
                  </div>
                </template>
                <template v-slot:subtitle>
                  {{ getLocaleDateString(history.created_at) }}
                </template>
                
                <q-list bordered>
                  <q-item clickable v-if="history.software_installation">
                    <q-item-section avatar>
                      <q-icon name="code" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Instalação de Software
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.software_installation }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="history.operational_system_installation">
                    <q-item-section avatar>
                      <q-icon name="terminal" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Instalação de Sistema Operacional
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.operational_system_installation }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="history.formatting">
                    <q-item-section avatar>
                      <q-icon name="repartition" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Formatação
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.formatting }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="history.battery_change">
                    <q-item-section avatar>
                      <q-icon name="battery_charging_full" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Troca de Bateria
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.battery_change }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="history.suction">
                    <q-item-section avatar>
                      <q-icon name="cleaning_services" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Aspiração
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.suction }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="history.other">
                    <q-item-section avatar>
                      <q-icon name="more_horiz" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Outros
                      </q-item-label>
                      <q-item-label caption>
                        {{ history.other }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'Step3',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    maintenance: {
      software_installation: '',
      operational_system_installation: '',
      formatting: '',
      battery_change: '',
      suction: '',
      other: ''
    },
    maintenanceToggle: true
  }),
  methods: {
    required,
    async handleSubmit () {
      try {
        this.$q.loading.show()
        let count = 0
        for (const key of Object.keys(this.maintenance)) {
          if (this.maintenance[key] == '') {
            count++
          }
        }
  
        if (count == Object.keys(this.maintenance).length) {
          return this.$q.notify({
            type: 'warning',
            message: 'Preencha ao menos um campo para prosseguir.'
          })
        }
  
        await this.$axios.post('computer/' + this.val.id + '/maintenance-history', {
          ...this.maintenance
        })
  
        this.$q.notify({
          type: 'positive',
          message: 'Manutenção adicionada com sucesso.'
        })
        
        this.maintenance = {
          software_installation: '',
          operational_system_installation: '',
          formatting: '',
          battery_change: '',
          suction: '',
          other: ''
        }

        this.$emit('refresh')
      } finally {
        this.$q.loading.hide()
      }
    },
    getLocaleDateString (date) {
      const dt = new Date(date)

      return dt.toLocaleDateString('pt-br') + ' ' + dt.toLocaleTimeString('pt-br')
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
