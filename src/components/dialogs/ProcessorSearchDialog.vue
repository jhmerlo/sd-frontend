<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="developer_board" class="q-mr-sm" />
        Pesquisar Processador
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div class="col-12">
          <q-form ref="cForm" @submit="searchProcessor">
            <q-input
              v-model="search"
              label="Identificador"
              :rules="[required]"
              :loading="loading"
            >
              <template v-slot:append>
                <q-btn @click="$refs.cForm.submit()" icon="search" round flat color="primary">
                  <q-tooltip>
                    Pesquisar
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </q-form>
        </div>
        
        <template v-if="processor">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="processor.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  processor.computer_id }}
            </div>
            <div class="col-12">
             <b>Fabricante:</b> {{  processor.manufacturer }}
            </div>
            <div class="col-12">
              <b>Modelo:</b> {{  processor.model }}
            </div>
            <div v-if="processor.clock" class="col-12">
              <b>Clock:</b> {{  processor.clock + ' GHz' }}
            </div>
            <div v-if="processor.threads" class="col-12">
              <b>Threads:</b> {{  processor.threads }}
            </div>
            <div v-if="processor.cache" class="col-12">
              <b>Cache:</b> {{  processor.cache + ' MB' }}
            </div>
            <div class="col-12">
              <q-icon 
                :name="processor.functional ? 'check_circle' : 'cancel'" 
                :color="processor.functional ? 'positive' : 'negative'" 
                size="xs"  
              />
              {{ processor.functional ? 'Funcional' : 'Não Funcional' }}
            </div>
          </div>

          <q-card-actions align="right">
            <q-btn
              @click="onCancelClick"
              label="Cancelar"
              color="primary"
              outline
            /> 
            <q-btn
              @click="confirm"
              label="Adicionar"
              color="primary"
            /> 
          </q-card-actions>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'ProcessorSearchDialog',
  props: ['computer_id'],
  data: () => ({
    search: '',
    processor: null,
    loading: false
  }),
  methods: {
    required,
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
    async confirm () {
      await this.$axios.put('processor/' + this.processor.id, { 
        ...this.processor,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchProcessor () {
      try {
        this.loading = true
        const { data } = await this.$axios.get('processor/' + this.search)
  
        this.processor = data.processor
      } finally {
        this.loading = false
      }
    }
  }
}
</script>