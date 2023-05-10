<template>
  <q-page class="bg-grey-2">
    <div class="row justify-center q-pa-sm q-col-gutter-sm">
      
      <div class="col-12">
        <div class="text-h5 text-primary text-weight-bold q-mx-sm q-my-md">
          <q-icon name="account_tree" size="lg" class="q-mr-sm" /> Processo de Manutenção
        </div>
      </div>

      <div v-if="computer.responsible" class="col-12 text-body2 text-grey-9">
        <q-card class="row items-center justify-between">
          <q-card-section class="col-xs-12 col-md-6">
            <q-icon
              color="primary"
              class="q-mr-lg q-mb-xs"
              name="computer"
              size="md"
            />
            {{  description }}
            <b>{{ ' #' +  computer.id  }}</b>
          </q-card-section>
          <q-card-section :class="$q.screen.gt.sm ? 'text-right' : 'q-pt-none'" class="col-xs-12 col-md-6">
            <b>Responsável:</b> {{  computer.responsible.name }}
            <q-btn
              @click="showResponsibleDialog"
              icon="change_circle"
              color="secondary"
              class="q-mb-xs"
              round
              dense
              flat
            >
              <q-tooltip>
                Alterar Responsável
              </q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>

      </div>

      
      <div v-if="computer" class="col-12">
        <q-stepper  
          v-model="step"
          :vertical="$q.screen.lt.md"
          ref="stepper"
          color="primary"
          header-nav
          animated
        >
          <q-step
            v-for="step in stepOptions"
            :key="step.value"
            :name="step.value"
            :title="step.label"
            :icon="maintenanceIcons[step.value]"
            :done-icon="maintenanceIcons[step.value]"
            :active-icon="maintenanceIcons[step.value]"
            :done="computer.current_step > step.value || computer.current_step == 6"
            :header-nav="computer.current_step >= step.value"
            done-color="secondary"
          >
            <q-form ref="stepForm" @submit="handleSubmit">
              <component @refresh="showComputer" v-model="computer" :is="currentComponent" />
            </q-form>
          </q-step>
  
          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-end">
              <q-btn v-if="computer.current_step > 1 && !computer.borrowed" flat color="primary" @click="resetSteps" label="Retornar para Triagem" class="q-ml-sm" />
              <q-btn
                v-if="step != 6"
                @click="() => computer.current_step == step ? $refs.stepForm[0].submit() : $refs.stepper.next()" 
                label="Continuar"
                color="primary" 
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>

      <div class="col-12">
        <q-expansion-item
          class="bg-white shadow-1"
          style="border-radius: 4px"
          icon="comment"
          label="Comentários"
          header-class="text-body2 text-primary"
        >
          <q-card>
            <q-card-section class="q-pt-sm">
              <div class="row q-col-gutter-sm">
              <q-form class="q-mt-sm col-12" @submit="handleComment">
                <q-editor placeholder="Escreva um novo comentário"  max-height="100px" dense toolbar-bg="primary" toolbar-color="white" toolbar-toggle-color="warning" v-model="commentBody" />
                <q-card-actions align="right">
                  <q-btn
                    :loading="commentLoading"
                    type="submit"
                    label="Enviar"
                    color="primary"
                    icon="send"
                    flat
                  />
                </q-card-actions>
              </q-form>
                <div class="text-body2 col-12 text-grey-9" v-for="comment in computer.comments" :key="comment.id">
                  <q-card class="my-card" flat bordered>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                      </q-item-section>
  
                      <q-item-section>
                        <q-item-label>{{ comment.user.name }}</q-item-label>
                        <q-item-label caption>
                          {{  getLocaleDateString(comment.created_at) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-card-section v-html="comment.body" />
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { stepOptions, maintenanceIcons } from 'src/utils/constants'
import { required } from 'src/utils/rules'
import ResponsibleDialog from 'components/dialogs/ResponsibleDialog'
import Step1 from 'components/maintenanceSteps/Step1'
import Step2 from 'components/maintenanceSteps/Step2'
import Step3 from 'components/maintenanceSteps/Step3'
import Step4 from 'components/maintenanceSteps/Step4'
import Step5 from 'components/maintenanceSteps/Step5'
import Step6 from 'components/maintenanceSteps/Step6'

export default {
  name: 'Maintenance',
  props: ['id'],
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
  },
  data: () => ({
    step: null,
    computer: {},
    description: null,
    stepOptions: [ ...stepOptions ],
    maintenanceIcons: { ...maintenanceIcons },
    profilePic: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    commentBody: '',
    commentLoading: false
  }),
  methods: {
    required,
    async showComputer () {
      this.$q.loading.show()
      try {
        const { data } = await this.$axios.get('computer/' + this.id)
        this.computer = data.computer
        this.description = this.computer.description
        this.step = this.computer.current_step

        this.computer.comments.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        this.computer.user_test_histories.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        this.computer.maintenance_histories.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))

        console.log(this.computer)
      } catch {
        this.$router.push({ name: 'Computers' })
      } finally {
        this.$q.loading.hide()
      }
    },
    async handleSubmit () {
      if (this.computer.current_step == 2) {
        const functionalMotherboard = this.computer.motherboard?.functional
        const functionalProcessor = this.computer.processor?.functional
        const functionalPowerSupply = this.computer.power_supply?.functional
        const functionalRamMemory = this.computer.ram_memories?.filter(itm => itm.functional == true).length > 0
        const functionalStorageDevice = this.computer.storage_devices?.filter(itm => itm.functional == true).length > 0
        const functionalGpu = this.computer.gpus?.filter(itm => itm.functional == true).length > 0
        const functionalMonitor = this.computer.monitors?.filter(itm => itm.functional == true).length > 0

        if (!(functionalMotherboard && functionalProcessor && functionalPowerSupply && 
            functionalRamMemory && functionalStorageDevice && functionalGpu && functionalMonitor)
        ) {

          return this.$q.notify({
            message: 'O computador não possui os componentes funcionais mínimos para a próxima etapa.',
            type: 'warning'
          })
        }
      }

      try {
        this.$q.loading.show()

        const { data } = await this.$axios.put('computer/' + this.computer.id + '/' + this.currentApiPath, {
          ...this.computer
        })
  
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })
  
        this.showComputer()
      } finally {
        this.$q.loading.hide()
      }
    },
    showResponsibleDialog () {
      this.$q.dialog({
        component: ResponsibleDialog,
        computer_id: this.computer.id
      }).onOk(() => {
        this.showComputer()
        this.$q.notify({
          message: 'Responsável alterado com sucesso.',
          type: 'positive'
        })
      })
    },
    async resetSteps () {
      this.$q.dialog({
        title: 'Retornar para Triagem',
        message: 'Você tem certeza que deseja retornar este computador para a etapa de triagem?',
        cancel: {
          flat: true
        },
        ok: {
          label: 'Continuar'
        }
      }).onOk(async () => {
        try {
          this.$q.loading.show()
          const { data } = await this.$axios.put('computer/'+ this.computer.id + '/reset-steps')
  
          this.$q.notify({
            type: 'positive',
            message: data.message
          })
  
          this.computer.current_step = 1
          this.step = 1
        } finally {
          this.$q.loading.hide()
        }
      })
    },
    async handleComment () {
      try {
        this.commentLoading = true

        const { data } = await this.$axios.post('comment', {
          body: this.commentBody,
          commentable_id: this.computer.id,
          commentable_type: 'App\\Models\\Computer'
        })
  
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })
  
        this.commentBody = ''

        this.showComputer()
      } finally {
        this.commentLoading = false
      }
    },
    getLocaleDateString (date) {
      const dt = new Date(date)

      return dt.toLocaleDateString('pt-br') + ' ' + dt.toLocaleTimeString('pt-br')
    }
  },
  computed: {
    currentComponent () {
      return 'Step' + this.step
    },
    currentApiPath () {
      switch (this.computer.current_step) {
        case 1:
          return 'sorting-step'
        case 2:
          return 'hardware-tests-step'
        case 3:
          return 'maintenance-step'
        case 4:
          return 'network-and-peripherals-step'
        case 5:
          return 'user-tests-step'
        default:
          return null
      }
    }
  },
  created () {
    this.showComputer()
  }
}
</script>