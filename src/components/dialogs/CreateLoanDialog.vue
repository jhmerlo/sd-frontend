<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="list_alt" class="q-mr-sm" />
        Novo Empréstimo
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-form @submit="handleSubmit" class="row q-col-gutter-md">
          <div class="col-12">
            <filterable-select
              label="Tomador de Empréstimo"
              v-model="loan.borrower_id" 
              :options="borrowersOptions"
              :rules="[required]"
              option-label="name"
              option-value="institutional_id"
            />
          </div>
          <div class="col-12">
            <q-select
              label="Tipo"
              v-model="loan.loanable_type"
              :options="loanableTypesOptions"
              emit-value
              map-options
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <computer-input
              label="ID do Item"
              v-model="loan.loanable_id"
              :rules="[required]"
            />
          </div>
          <div class="col-12">
            <date-picker
              label="Data de Início"
              v-model="loan.start_date"
              :rules="[required]"
              default-date
              lazy-rules
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <date-picker
              label="Data de Término"
              v-model="loan.end_date"
              :rules="[required]"
              default-date
              lazy-rules
              hide-bottom-space
              outlined
              dense
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
import ComputerInput from 'components/ComputerInput'
import DatePicker from 'components/DatePicker'
import FilterableSelect from 'components/FilterableSelect'

const loanableTypesOptions = [
  { label: 'Computador', value: 'App\\Models\\Computer' },
  { label: 'Placa-mãe', value: 'App\\Models\\Motherboard' },
  { label: 'Processador', value: 'App\\Models\\Processor' },
  { label: 'Memória RAM', value: 'App\\Models\\RamMemory' },
  { label: 'Dispostivo de Armazenamento', value: 'App\\Models\\StorageDevice' },
  { label: 'Fonte de Alimentação', value: 'App\\Models\\PowerSupply' },
  { label: 'GPU', value: 'App\\Models\\Gpu' },
  { label: 'Monitor', value: 'App\\Models\\Monitor' }
]

export default {
  name: 'CreateLoanDialog',
  props: ['loanable', 'borrowersOptions'],
  components: {
    ComputerInput,
    DatePicker,
    FilterableSelect
  },
  data: () => ({
    loan: {
      loanable_type: '',
      loanable_id: '',
      responsible_id: '',
      borrower_id: '',
      start_date: '',
      end_date: '',
      return_date: null
    },
    loanableTypesOptions
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
    showSearchDialog () {
      const loanableDialogsMapper = {
        'App\\Models\\Computer': CreateComputerDialog,
        'App\\Models\\Motherboard': MotherboardSearchDialog,
        'App\\Models\\Processor': ProcessorSearchDialog,
        'App\\Models\\RamMemory': RamMemorySearchDialog,
        'App\\Models\\StorageDevice': StorageDeviceSearchDialog,
        'App\\Models\\PowerSupply': PowerSupplySearchDialog,
        'App\\Models\\Gpu': GpuSearchDialog,
        'App\\Models\\Monitor': MonitorSearchDialog,
      }

      const dial = loanableDialogsMapper[this.loan.loanable_type]

      this.$q.dialog({
        component: dial
      }).onOk(() => {
        this.loan.loanable_id = id
      })
    },
    async handleSubmit () {
      try {
        this.$q.loading.show()

        const currentUser = this.$store.getters['auth/getUser']

        this.loan.responsible_id = currentUser.institutional_id
        
        const { data } = await this.$axios.post('loan', { 
          ...this.loan,
          responsible_id: currentUser.institutional_id,
          start_date: this.loan.start_date + " 00:00:00",
          end_date: this.loan.end_date + " 23:59:59"
        })

        this.$q.notify({
          type: 'positive',
          message: data.message
        })

      } finally {
        this.$q.loading.hide()
      }
      this.onOKClick()
    }
  },
  created () {
    if (this.loanable) {
      this.loan = { ...this.loanable }
    }
  }
}
</script>