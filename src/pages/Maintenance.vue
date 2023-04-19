<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm q-col-gutter-sm">
      
      <div class="col-12">
        <div class="text-h5 text-primary text-weight-bold q-mx-sm q-my-md">
          <q-icon name="account_tree" size="lg" class="q-mr-sm" /> Processo de Manutenção
        </div>
      </div>

      <div class="col-12">
        <q-stepper
          v-model="computer.current_step"
          :vertical="$q.screen.lt.md"
          ref="stepper"
          color="primary"
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
            :done="computer.current_step > step.value"
            done-color="secondary"
          >
            <q-form ref="stepForm" @submit="test">
              <component v-model="computer" :is="currentComponent" />
            </q-form>
          </q-step>
  
          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-end">
              <q-btn @click="() => $refs.stepForm[0].submit()" color="primary" :label="computer.current_step === 4 ? 'Finish' : 'Continuar'" />
              <q-btn v-if="computer.current_step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
import { stepOptions, maintenanceIcons } from 'src/utils/constants'
import Step1 from 'components/maintenanceSteps/Step1'

export default {
  name: 'Maintenance',
  props: ['id'],
  components: {
    Step1
  },
  data: () => ({
    computer: {},
    stepOptions: [ ...stepOptions ],
    maintenanceIcons: { ...maintenanceIcons }
  }),
  methods: {
    async showComputer () {
      this.$q.loading.show()
      try {
        const { data } = await this.$axios.get('computer/' + this.id)
        this.computer = data.computer
      } catch {
        this.$router.push({ name: 'Computers' })
      } finally {
        this.$q.loading.hide()
      }
    },
    async test () {
      const { data } = await this.$axios.put('computer/' + this.computer.id + '/' + this.currentApiPath, {
        ...this.computer
      })
      this.$q.notify({
        message: data.message,
        type: 'positive'
      })
      console.log(this.computer)
    }
  },
  computed: {
    currentComponent () {
      return 'Step' + this.computer.current_step
    },
    currentApiPath () {
      switch (this.computer.current_step) {
        case 1:
          return 'sorting-step'
        default:
          return null
      }
    }
  },
  mounted () {
    this.showComputer()
  }
}
</script>