<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="email" class="q-mr-sm" />
        E-mail não verificado
      </q-card-section>
      <q-card-section class="text-grey-8 q-mb-sm">
        Parece que o seu e-mail <strong>{{ email }}</strong> ainda não foi
        confirmado. Se necessário, verifique a entrada e a sua caixa de spans
        para acessar a conta.
        <div class="text-right">
          <div class="text-subtitle2 q-mt-md">
            Não recebeu o e-mail de verificação?
          </div>
          <div style="text-decoration: underline">
            <span @click="resendVerificationEmail" class="cursor-pointer"
              >Clique aqui para enviar novamente</span
            >
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'VerifyEmailDialog',
  props: {
    email: String
  },
  methods: {
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
    async resendVerificationEmail () {
      const { email } = this
      await this.$axios.post(
        'resend-email-verification',
        { email },
        { enableLoading: true }
      )
      this.$q.notify({
        type: 'positive',
        message:
          'E-mail de verificação reenviado com sucesso, verifique sua caixa de e-mails.'
      })
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>