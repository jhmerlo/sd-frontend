<template>
  <q-card class="fit">
    <div class="absolute-top-right q-pa-sm text-caption text-grey-9 text-weight-bold">
      #{{ computer.id }}
    </div>
    <div class="absolute-top-left q-pa-sm text-caption text-grey-9 text-weight-bold">
      <q-chip class="q-ma-none text-caption" size="sm" :color="maintenanceColors[computer.current_step]" text-color="white" :icon="maintenanceIcons[computer.current_step]">
        {{ maintenanceSteps[computer.current_step] }}
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

    <div v-if="$q.screen.gt.xs" style="height: 40px"/>

    <q-card-actions align="center" class="q-pt-xl absolute-bottom">
      <q-btn
        color="primary"
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
        color="primary"
        icon="qr_code"
        round
        flat
      >
        <q-tooltip>
          Gerar QR Code
        </q-tooltip>
      </q-btn>
      <q-btn
        color="primary"
        icon="build"
        round
        flat
        >
        <q-tooltip>
          Manutenção
        </q-tooltip>
      </q-btn>
      <q-btn
        @click="resetSteps(computer.id)"
        :disable="computer.current_step == 1"
        color="primary"
        icon="undo"
        round
        flat
      >
        <q-tooltip>
          Retornar para Triagem
        </q-tooltip>
      </q-btn>
    </q-card-actions>

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
  </q-card>
</template>

<script>
import QRious from 'qrious'
import { maintenanceSteps, maintenanceColors, maintenanceIcons } from 'src/utils/constants'

export default {
  name: 'ComputerCard',
  props: {
    computer: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialogTest: false,
    maintenanceSteps: { ...maintenanceSteps },
    maintenanceColors: { ...maintenanceColors },
    maintenanceIcons: { ... maintenanceIcons }
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
    async resetSteps (id) {
      this.$q.dialog({
        title: 'Retornar para Triagem',
        message: 'Você tem certeza que deseja retornar este computador para a etapa de triagem?',
        cancel: {
          color: 'negative',
          flat: true
        },
        ok: {
          label: 'Continuar',
          flat: true
        }
      }).onOk(async () => {
        const { data } = await this.$axios.put('computer/'+ id + '/reset-steps')

        this.$q.notify({
          type: 'positive',
          message: data.message
        })

        this.$emit('refresh')
      })
    }
  }
}
</script>
