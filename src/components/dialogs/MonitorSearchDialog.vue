<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="desktop_windows" class="q-mr-sm" />
        Pesquisar Monitor
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div v-if="!loanable" class="col-12">
          <q-form ref="cForm" @submit="searchMonitor">
            <q-input
              v-model="search"
              label="Identificador"
              :rules="[required]"
              :loading="loading"
            >
              <template v-slot:append>
                <q-btn @click="$refs.cForm.submit()" icon="search" round flat color="primary">
                  <q-tooltip>
                    Pesquisar
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </q-form>
        </div>
        
        <template v-if="monitor">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="monitor.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  monitor.computer_id }}
            </div>
            <div class="col-12">
              <b>Fabricante:</b> {{  monitor.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  monitor.model }}
            </div>
            <div class="col-12">
              <b>Tamanho:</b> {{  monitor.size + '"' }}
            </div>
            <div class="col-12">
              <b>Conexões:</b> {{  monitor.connections }}
            </div>
            <div class="col-12">
              <b>Painel:</b> {{  monitor.panel }}
            </div>
            <div class="col-12">
              <q-icon
                :name="monitor.functional ? 'check_circle' : 'cancel'" 
                :color="monitor.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ monitor.functional ? 'Funcional' : 'Não Funcional' }}
            </div>
          </div>

          <q-card-actions v-if="!loanable" align="right">
            <q-btn
              @click="onCancelClick"
              label="Cancelar"
              color="primary"
              outline
            /> 
            <q-btn
              @click="confirm"
              label="Adicionar"
              color="primary"
            /> 
          </q-card-actions>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'MonitorSearchDialog',
  props: ['computer_id', 'loanable'],
  data: () => ({
    search: '',
    monitor: null,
    loading: false
  }),
  methods: {
    required,
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    async confirm () {
      await this.$axios.put('monitor/' + this.monitor.id, { 
        ...this.monitor,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchMonitor () {
      try {
        this.loading = true
        const { data } = await this.$axios.get('monitor/' + this.search)
  
        this.monitor = data.monitor
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    if (this.loanable) {
      this.monitor = { ...this.loanable }
    }
  }
}
</script>