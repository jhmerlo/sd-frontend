<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="developer_board" class="q-mr-sm" />
        Pesquisar Memória RAM
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div v-if="!loanable" class="col-12">
          <q-form ref="cForm" @submit="searchRamMemory">
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
        
        <template v-if="ramMemory">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="ramMemory.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  ramMemory.computer_id }}
            </div>
            <div class="col-12">
             <b>Fabricante:</b> {{  ramMemory.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  ramMemory.model }}
            </div>
            <div class="col-12">
              <b>Clock:</b> {{  ramMemory.clock + ' MHz' }}
            </div>
            <div class="col-12">
              <b>Capacidade:</b> {{  ramMemory.size + 'GB' }}
            </div>
            <div class="col-12">
              <b>Tecnologia:</b> {{  ramMemory.technology }}
            </div>
            <div class="col-12">
              <q-icon 
                :name="ramMemory.functional ? 'check_circle' : 'cancel'" 
                :color="ramMemory.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ ramMemory.functional ? 'Funcional' : 'Não Funcional' }}
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
  name: 'RamMemorySearchDialog',
  props: ['computer_id', 'loanable'],
  data: () => ({
    search: '',
    ramMemory: null,
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
      await this.$axios.put('ram-memory/' + this.ramMemory.id, { 
        ...this.ramMemory,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchRamMemory () {
      try {
        this.loading = true
        const { data } = await this.$axios.get('ram-memory/' + this.search)
  
        this.ramMemory = data.ram_memory
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    if (this.loanable) {
      this.ramMemory = { ...this.loanable }
    }
  }
}
</script>