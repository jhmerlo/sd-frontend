<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="extension" class="q-mr-sm" />
        Pesquisar GPU
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div v-if="!loanable" class="col-12">
          <q-form ref="cForm" @submit="searchGpu">
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
        
        <template v-if="gpu">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="gpu.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  gpu.computer_id }}
            </div>
            <div class="col-12">
              <b>Fabricante:</b> {{  gpu.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  gpu.model }}
            </div>
            <div class="col-12">
              <b>Clock:</b> {{  gpu.clock + ' MHz' }}
            </div>
            <div class="col-12">
              <b>Capacidade:</b> {{  gpu.size + ' GB' }}
            </div>
            <div class="col-12">
              <q-icon
                :name="gpu.integrated ? 'group_work' : 'offline_bolt'" 
                color="primary" 
                size="xs"  
              />
              {{ gpu.integrated ? 'Integrada' : 'Dedicada' }}
            </div>
            <div class="col-12">
              <q-icon
                :name="gpu.functional ? 'check_circle' : 'cancel'" 
                :color="gpu.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ gpu.functional ? 'Funcional' : 'Não Funcional' }}
            </div>
          </div>

          <q-card-actions align="right">
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
  name: 'GpuSearchDialog',
  props: ['computer_id', 'loanable'],
  data: () => ({
    search: '',
    gpu: null,
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
      await this.$axios.put('gpu/' + this.gpu.id, { 
        ...this.gpu,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchGpu () {
      try {
        this.loading = true
        const { data } = await this.$axios.get('gpu/' + this.search)
  
        this.gpu = data.gpu
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    if (this.loanable) {
      this.gpu = { ...this.loanable }
    }
  }
}
</script>