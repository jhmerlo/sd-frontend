<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm">
      <div class="col-12">
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-h4 text-primary">
              Dispositivos
            </div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-px-sm">
        <div class="col-md-2 col-sm-4 col-xs-12" v-for="i in 14" :key="i">
          <q-card>
            <q-card-section class="q-pb-none">
              <div class="text-primary text-center">
                <q-icon size="70px" name="computer" />
              </div>
              <div class="text-caption text-grey-8 text-center">
                Pc Gamer Intel Core i7 3770-3.90 GHz, 16GB RAM, NVIDIA 4GB, SSD 512GB
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                color="grey-8"
                icon="visibility"
                round
                flat
              >
                <q-tooltip>
                  Detalhes
                </q-tooltip>
              </q-btn>
              <q-btn
                @click="generateQrCode"
                color="grey-8"
                icon="qr_code"
                round
                flat
              >
                <q-tooltip>
                  Gerar QR Code
                </q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
    </div>
    <q-dialog v-model="dialogTest">
      <q-card class="text-center">
        <div class="text-h6 text-primary">
          QR Code
        </div>
        <div>
          <canvas class="q-pa-md" id="qr-code-canvas" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import QRious from 'qrious'
export default {
  name: 'Devices',
  data: () => ({
    dialogTest: false
  }),
  methods: {
    generateQrCode () {
      this.dialogTest = true
      setTimeout(() => {
        new QRious({
          level: 'H',
          padding: 5,
          size: 300,
          element: document.getElementById('qr-code-canvas'),
          value: 'jhmerlo@outlook.com'
        })
      }, 200)
    }
  }
}
</script>

<style>

</style>