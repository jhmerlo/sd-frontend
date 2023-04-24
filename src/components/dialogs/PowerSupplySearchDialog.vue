<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="power" class="q-mr-sm" />
        Pesquisar Fonte de Alimentação
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div class="col-12">
          <q-form ref="cForm" @submit="searchPowerSupply">
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
        
        <template v-if="powerSupply">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="powerSupply.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  powerSupply.computer_id }}
            </div>
            <div class="col-12">
             <b>Fabricante:</b> {{  powerSupply.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  powerSupply.model }}
            </div>
            <div v-if="powerSupply.electric_power" class="col-12">
              <b>Potência:</b> {{  powerSupply.electric_power + ' W' }}
            </div>
            <div v-if="powerSupply.voltage" class="col-12">
              <b>Tensão:</b> {{  powerSupply.voltage + ' V' }}
            </div>
            <div class="col-12">
              <q-icon 
                :name="powerSupply.functional ? 'check_circle' : 'cancel'" 
                :color="powerSupply.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ powerSupply.functional ? 'Funcional' : 'Não Funcional' }}
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
  name: 'PowerSupplySearchDialog',
  props: ['computer_id'],
  data: () => ({
    search: '',
    powerSupply: null,
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
      await this.$axios.put('power-supply/' + this.powerSupply.id, { 
        ...this.powerSupply,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchPowerSupply () {
      this.loading = true
      const { data } = await this.$axios.get('power-supply/' + this.search)

      this.powerSupply = data.power_supply

      this.loading = false
    }
  }
}
</script>