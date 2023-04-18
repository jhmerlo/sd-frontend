<template>
  <q-input
    v-model="val"
    :label="label"
    outlined
    dense
  >
  <template v-slot:append>
    <q-btn @click="showQrCodeReaderDialog" icon="qr_code" round flat color="primary" />
  </template>
  </q-input>
</template>

<script>
import QrCodeReaderDialog from 'components/dialogs/QrCodeReaderDialog'

export default {
  name: 'ComputerInput',
  props: {
    value: {
      type: [Number, String]
    },
    label: {
      type: String,
      default: ''
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
  },
  methods: {
    showQrCodeReaderDialog () {
      this.$q.dialog({
        component: QrCodeReaderDialog
      }).onOk((result) => {
        this.val = result
      })
    }
  }
}
</script>

<style>

</style>