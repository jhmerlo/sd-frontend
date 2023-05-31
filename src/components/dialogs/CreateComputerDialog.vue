<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="computer" class="q-mr-sm" />
        {{ loanable ? 'Visualizar Computador' : 'Novo Computador' }}
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-form @submit="handleSubmit" class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              label="Descrição *"
              v-model="computer.description"
              :rules="[required]"
              :disable="typeof loanable == 'object'"
              lazy-rules
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              label="Fabricante *"
              v-model="computer.manufacturer"
              :rules="[required]"
              :disable="typeof loanable == 'object'"
              lazy-rules
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-select
              v-model="computer.type"
              label="Tipo"
              :options="typeOptions"
              :rules=[required]
              :disable="typeof loanable == 'object'"
              hide-bottom-space
              use-input
              map-options
              emit-value
              lazy-rules
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              label="Sistema Operacional"
              v-model="computer.operational_system"
              :disable="typeof loanable == 'object'"
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              label="Patrimônio UFES"
              v-model="computer.patrimony"
              :disable="typeof loanable == 'object'"
              outlined
              dense
            />
          </div>
          <div class="col-md-12 q-mt-xs text-body2">
            <q-toggle
              v-model="computer.sanitized"
              icon="cleaning_services"
              size="lg"
              color="secondary"
              :label="computer.sanitized ? 'Higienizado' : 'Não Higienizado'"
              :disable="typeof loanable == 'object'"
              class="text-grey-9"
            />
          </div>
          <div class="col-12 q-pt-none text-body2">
            <q-toggle
              v-model="computer.functional"
              icon="power_settings_new"
              size="lg"
              color="secondary"
              :label="computer.functional ? 'Funcional' : 'Não Funcional'"
              :disable="typeof loanable == 'object'"
              class="text-grey-9"
            />
          </div>
          <div v-if="!loanable" class="col-12">
            <q-card-actions align="right">
              <q-btn
                @click="onCancelClick"
                color="primary"
                label="Cancelar"
                flat
              />
              <q-btn
                label="Criar"
                type="submit"
                color="primary"
              />
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'CreateComputerDialog',
  props: ['loanable'],
  data: () => ({
    computer: {
      description: '',
      manufacturer: '',
      type: '',
      operational_system: '',
      patrimony: '',
      sanitized: false,
      functional: false
    },
    typeOptions: [
      {
        label: 'Desktop',
        value: 'desktop'
      },
      {
        label: 'Notebook',
        value: 'notebook'
      }
    ]
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
      try {
        this.$q.loading.show()
        const { data } = await this.$axios.post('computer', this.computer)

        this.$q.notify({
          type: 'positive',
          message: data.message
        })

        this.$router.push({ name: 'Maintenance', params: { id: data.computer.id } })
      } finally {
        this.$q.loading.hide()
      }
      this.onOKClick()
    }
  },
  created () {
    if (this.loanable) {
      this.computer = { ...this.loanable }
    }
  }
}
</script>