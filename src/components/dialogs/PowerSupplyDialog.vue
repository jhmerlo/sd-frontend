<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="power" class="q-mr-sm" />
        {{ this.mode == 'edit' ? 'Editar ' : 'Criar ' }} Fonte de Alimentação
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-form @submit="handleSubmit" class="row q-col-gutter-md">
          <div class="col-12">
            <computer-input
              v-model="obj.computer_id"
              label="ID do Computador"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="obj.manufacturer"
              label="Fabricante *"
              :rules="[required]"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="obj.model"
              label="Modelo *"
              :rules="[required]"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="obj.electric_power"
              label="Potência (W)"
              mask="#.#"
              reverse-fill-mask
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              v-model.number="obj.voltage"
              label="Tensão (V)"
              mask="#.#"
              reverse-fill-mask
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-toggle
              v-model="obj.functional"
              class="text-grey-9 text-body2"
              icon="power_settings_new"
              size="lg"
              color="secondary"
              :label="obj.functional ? 'Funcional' : 'Não Funcional'"
            />
          </div>
          <div class="col-12">
            <q-card-actions align="right">
              <q-btn
                @click="onCancelClick"
                color="primary"
                label="Cancelar"
                flat
              />
              <q-btn
                type="submit"
                color="primary"
                :label="mode == 'edit' ? 'Editar' : 'Criar'"
              />
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ComputerInput from 'components/ComputerInput'
import { required } from 'src/utils/rules'

export default {
  name: 'PowerSupplyDialog',
  props: ['powerSupply', 'computer_id'],
  components: {
    ComputerInput
  },
  data: () => ({
    mode: '',
    obj: {
      computer_id: '',
      manufacturer: '',
      model: '',
      electric_power: '',
      voltage: '',
      functional: false
    },
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
    onCancelClick () {
      this.hide()
    },
    async handleSubmit () {
      if (this.mode == 'edit') {
        const { data } = await this.$axios.put('power-supply/' + this.obj.id, { ...this.obj })
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })
      } else {
        const { data } = await this.$axios.post('power-supply', { ...this.obj })
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })
      }
      this.onOKClick()
    }
  },
  mounted () {
    if (this.powerSupply) {
      this.obj = { ...this.powerSupply }
      this.mode = 'edit'
    } else {
      this.mode = 'create'
      if (this.computer_id) {
        this.obj.computer_id = this.computer_id
      }
    }
  }
}
</script>