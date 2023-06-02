<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="keyboard_return" class="q-mr-sm" />
        Devolução
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-form @submit="handleSubmit" class="row q-col-gutter-md">
          <div class="col-12">
            <date-picker
              label="Data de Devolução"
              v-model="returnDate"
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
                label="Continuar"
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
import DatePicker from 'components/DatePicker'

export default {
  name: 'ReturnLoanDialog',
  props: ['loan'],
  components: {
    DatePicker
  },
  data: () => ({
    returnDate: ''
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

        
        const { data } = await this.$axios.put('loan/' + this.loan.id, { 
          ...this.loan,
          return_date: this.returnDate + " 23:59:59"
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
  }
}
</script>