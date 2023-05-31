<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="hub" class="q-mr-sm" />
        Pesquisar Placa-Mãe
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div v-if="!loanable" class="col-12">
          <q-form ref="cForm" @submit="searchMotherboard">
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
        
        <template v-if="motherboard">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="motherboard.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  motherboard.computer_id }}
            </div>
            <div class="col-12">
             <b>Fabricante:</b> {{  motherboard.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  motherboard.model }}
            </div>
            <div class="col-12">
              <q-icon 
                :name="motherboard.functional ? 'check_circle' : 'cancel'" 
                :color="motherboard.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ motherboard.functional ? 'Funcional' : 'Não Funcional' }}
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
  name: 'MotherboardSearchDialog',
  props: ['computer_id', 'loanable'],
  data: () => ({
    search: '',
    motherboard: null,
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
      await this.$axios.put('motherboard/' + this.motherboard.id, { 
        ...this.motherboard,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchMotherboard () {
      this.loading = true
      const { data } = await this.$axios.get('motherboard/' + this.search)

      this.motherboard = data.motherboard

      this.loading = false
    }
  },
  created () {
    if (this.loanable) {
      this.motherboard = { ...this.loanable }
    }
  }
}
</script>