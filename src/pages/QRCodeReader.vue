<template>
  <q-page class="bg-grey-2">
    <div>
      <qrcode-stream class="fit" style="height: 100vh !important" @decode="onDecode" @init="onInit" />
    </div>
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader' 
export default {
  name: "QRCodeReader",
  components: {
    QrcodeStream
  },
  data() {
    return {
      result: "",
      error: ""
    }
  },
  methods: {
    //Creating onCode method to change result state to data receiving through scanner
    onDecode(result) {
      if (isNaN(result)) {
        this.$q.notify({
          type: 'warning',
          message: 'O valor escaneado (' + result + ') não é válido.'
        })
        return this.$router.push({ name: "Home" })
      }


      return this.$router.push({ name: "Maintenance", params: { id: result} })
    },
    // cretaing onInit method to check for error or permission or browser not supported
    async onInit(promise) {
      try {
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
      }
    }
  }
}
</script>