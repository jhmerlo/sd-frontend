<template>
  <q-page class="flex flex-center">
    <q-card flat>
      <q-card-section class="text-center">
        <template v-if="loading">
        <q-spinner color="primary" size="100px" />
        </template>
        <template v-else-if="verificationStatus = 'error'">
          <q-img style="width: 300px; max-width: 80vw" src="~assets/verification_email_error.svg" />
          <div class="text-h6 q-mt-sm text-primary">
            Ocorreu um erro ao verificar o seu e-mail.
          </div>
          <div class="text-caption q-pb-sm col-12 text-weight-regular text-center text-grey-8">
            Verifique o link de confirmação ou se o e-mail já foi verificado.
          </div>
          <q-btn :to="{ name: 'Login' }" label="Voltar ao Início" class="full-width q-mt-md" color="primary" />
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'VerifyEmail',
  props: ['id', 'hash'],
  data: () => ({
    verificationStatus: '',
    loading: false
  }),
  methods: {
    async handleEmailVerification () {
      try {
        this.loading = true
        await this.$axios.get('verify-email/' + this.id + '/' + this.hash)
        this.$q.notify({
          type: 'positive',
          message: 'E-mail verificado com sucesso.'
        })
        this.verificationStatus = 'success'
      } catch {
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao tentar verificar o seu e-mail.'
        })
        this.verificationStatus = 'error'
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    this.handleEmailVerification()
  }
}
</script>