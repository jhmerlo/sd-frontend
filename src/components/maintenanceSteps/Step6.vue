<template>
  <div class="row justify-center">
    <q-img style="width: 300px; max-width: 80vw" src="~assets/computer_done.svg" />
    <div class="text-h6 col-12 text-center q-mt-md text-secondary">
      Computador liberado para empréstimo!
    </div>
    <div class="text-caption col-12 text-center q-mt-sm text-grey-9">
      Nesta etapa, caso deseje alterar qualquer informação do computador, é necessário retornar o computador para a triagem e realizar todos os passos novamente.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step6',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
