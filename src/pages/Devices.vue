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
        <div class="col-md-3 col-sm-4 col-xs-12" v-for="computer, id in computers" :key="id">
          <q-card class="fit">
            <div class="absolute-top-right q-pa-sm text-caption text-grey-9 text-weight-bold">
              #{{ computer.id }}
            </div>
            <div class="absolute-top-left q-pa-sm text-caption text-grey-9 text-weight-bold">
              <q-chip class="q-ma-none text-caption" size="sm" color="yellow-9" text-color="white" icon="hardware">
                Testes de Hardware
              </q-chip>
            </div>
            <q-card-section class="q-pb-none">
              <div class="text-primary text-center q-mt-lg">
                <span class="text-weight-bold absolute-center q-pt-lg q-mt-xs">
                  {{ computer.current_step }}
                </span>
                <q-icon size="70px" name="computer" />
              </div>
            </q-card-section>
              <q-card-section class="q-pa-sm">
              <div class="ellipsis text-caption text-center">
                {{computer.description}}
                <q-tooltip>
                  {{ computer.description }}
                </q-tooltip>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none" style="min-height: 160px">
              <div>
                <div v-if="computer.patrimony" class="text-caption text-grey-9">
                  <b>Patrimônio UFES:</b> {{ computer.patrimony }}
                </div>
                <div class="q-mt-xs text-caption text-grey-9">
                  <b>Fabricante:</b> {{ computer.manufacturer }}
                </div>
                <div class="q-mt-xs text-caption text-grey-9">
                  <b>Responsável:</b> {{ computer.responsible.name }}
                </div>
                <div class="q-mt-md text-caption text-grey-9">
                  <q-icon 
                    :name="computer.sanitized ? 'check_circle' : 'warning'" 
                    :color="computer.sanitized ? 'positive' : 'warning'" 
                    size="xs"  
                  />
                  {{ computer.sanitized ? 'Higienizado' : 'Não Higienizado' }}
                </div>
                <div class="q-mt-xs text-caption text-grey-9">
                  <q-icon 
                    :name="computer.functional ? 'check_circle' : 'cancel'" 
                    :color="computer.functional ? 'positive' : 'negative'" 
                    size="xs"  
                  />
                  {{ computer.functional ? 'Funcional' : 'Não Funcional' }}
                </div>
              </div>
            </q-card-section>
            <div style="height: 40px"/>
            <q-card-actions align="right" class="q-pt-xl absolute-bottom">
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
                @click="generateQrCode(computer.id)"
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
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        @input=getComputers
        v-model="page"
        :max="lastPage"
      />
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
import { maintenanceSteps, maintenanceColors } from 'src/utils/constants'

export default {
  name: 'Devices',
  data: () => ({
    dialogTest: false,
    page: 1,
    lastPage: 1,
    computers: [],
    maintenanceSteps: { ...maintenanceSteps },
    maintenanceColors: { ...maintenanceColors }
  }),
  methods: {
    generateQrCode (id) {
      this.dialogTest = true
      setTimeout(() => {
        new QRious({
          level: 'H',
          padding: 5,
          size: 200,
          element: document.getElementById('qr-code-canvas'),
          value: String(id)
        })
      }, 200)
    },
    async getComputers () {
      const { data } = await this.$axios.get('computers', {params: { page: this.page }});

      this.computers = data.data
      this.page = data.current_page
      this.lastPage = data.last_page
      console.log(data)
    }
  },
  created () {
    this.getComputers()
  }
}
</script>

<style>

</style>