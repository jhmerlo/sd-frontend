<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="handshake" class="q-mr-sm" />
        Novo Tomador de Empréstimo
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-form @submit="handleSubmit" class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              label="Matrícula *"
              v-model="borrower.institutional_id"
              :rules="[required]"
              lazy-rules
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input
              label="Nome *"
              v-model="borrower.name"
              :rules="[required]"
              lazy-rules
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="col-12">
            <q-input 
              v-model="borrower.email" 
              :rules="[required, validEmail]"
              label="E-mail Institucional *"
              lazy-rules
              outlined
              dense
              hide-bottom-space
            />
          </div>
          <div class="col-12">
            <q-input 
              v-model="borrower.telephone"
              :rules="[required, validPhone]"
              :mask="phoneMask(borrower.telephone)"
              label="Telefone de Contato *"
              lazy-rules
              outlined
              dense
              hide-bottom-space
              unmasked-value
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
import { required, validEmail, validPhone, minLength } from 'src/utils/rules'
import { phoneMask } from 'src/utils/masks'

export default {
  name: 'CreateBorrowerDialog',
  data: () => ({
    borrower: {
      institutional_id: '',
      name: '',
      email: '',
      telephone: '',
    },
    validEmail,
    validPhone,
    minLength,
    phoneMask
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
        const { data } = await this.$axios.post('borrower', this.borrower)

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