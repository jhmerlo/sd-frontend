<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="qr_code" class="q-mr-sm" />
        Leitor de QR Code
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <qrcode-stream v-show="!loading" @decode="onDecode" @init="onInit" />
        <div v-if="loading" style="height: 400px" class="text-center row items-center justify-center">
          <div class="col-12">
            <q-spinner-cube
              class="q-mb-sm"
              color="primary"
              size="5em"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader' 

export default {
  name: 'QrCodeReaderDialog',
  components: {
   QrcodeStream
  },
  data: () => ({
    result: '',
    error: '',
    loading: false
  }),
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
    onCancelClick () {
      this.hide()
    },
    //Creating onCode method to change result state to data receiving through scanner
    onDecode (result) {
      this.result = result
      this.$emit('ok', result)
      this.hide()
    },
    // cretaing onInit method to check for error or permission or browser not supported
    async onInit(promise) {
      try {
        this.loading = true
        await promise
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>