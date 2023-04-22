<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-12 text-h6">
      Testes de Hardware
    </div>
    <div class="col-12 text-caption q-mb-sm text-grey-9">
      Verificação dos principais componentes do computador.
    </div>

    <div class="col-12">
      <q-list bordered>
        <!-- Motherboard -->
        <q-expansion-item
          expand-separator
          icon="developer_board"
          label="Placa-Mãe"
          :header-class="
            functionalMotherboard.includes('Não') ? 
            'text-negative text-weight-medium' : 
            'text-secondary text-weight-medium'
          "
          :caption="functionalMotherboard"
        >
          <q-card>
            <q-card-actions align="center" v-if="!val.motherboard">
              <q-btn
                @click="showMotherboardSearchDialog"
                class="q-pa-xs"
                label="Pesquisar"
                icon="search"
                color="primary"
                stack
                outline
              />
              <q-btn
                @click="showMotherboardDialog('create')"
                class="q-pa-xs"
                label="Adicionar"
                icon="add"
                color="primary"
                stack
              />
            </q-card-actions>
            <q-card-section v-else>
              <div class="row col-12 text-body2 q-col-gutter-y-sm text-grey-9">
                <div class="col-12">
                  <b>Fabricante:</b> {{  val.motherboard.manufacturer }}
                </div>
                <div class="col-12">
                  <b>Modelo:</b> {{  val.motherboard.model }}
                </div>
                <div class="col-12">
                  <q-icon
                    :name="val.motherboard.functional ? 'check_circle' : 'cancel'" 
                    :color="val.motherboard.functional ? 'positive' : 'negative'" 
                    size="xs"  
                  />
                  {{ val.motherboard.functional ? 'Funcional' : 'Não Funcional' }}
                </div>
              </div>

              <q-card-actions align="right">
                <q-btn
                  @click="showMotherboardDialog('edit')"
                  label="Editar"
                  icon="edit"
                  color="primary"
                  flat
                />

                <q-btn
                  @click="removeMotherboard"
                  label="Remover"
                  icon="delete"
                  color="negative"
                  flat
                />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- Processor -->
        <q-expansion-item
          expand-separator
          icon="smart_toy"
          label="Processador"
          :header-class="
            functionalProcessor.includes('Não') ? 
            'text-negative text-weight-medium' : 
            'text-secondary text-weight-medium'
          "
          :caption="functionalProcessor"
        >
          <q-card>
            <q-card-actions align="center" v-if="!val.processor">
              <q-btn
                @click="showProcessorSearchDialog"
                class="q-pa-xs"
                label="Pesquisar"
                icon="search"
                color="primary"
                stack
                outline
              />
              <q-btn
                @click="showProcessorDialog('create')"
                class="q-pa-xs"
                label="Adicionar"
                icon="add"
                color="primary"
                stack
              />
            </q-card-actions>
            <q-card-section v-else>
              <div class="row col-12 text-body2 q-col-gutter-y-sm text-grey-9">
                <div class="col-12">
                  <b>Fabricante:</b> {{  val.processor.manufacturer }}
                </div>
                <div class="col-12">
                  <b>Modelo:</b> {{  val.processor.model }}
                </div>
                <div class="col-12">
                  <q-icon
                    :name="val.processor.functional ? 'check_circle' : 'cancel'" 
                    :color="val.processor.functional ? 'positive' : 'negative'" 
                    size="xs"  
                  />
                  {{ val.processor.functional ? 'Funcional' : 'Não Funcional' }}
                </div>
              </div>

              <q-card-actions align="right">
                <q-btn
                  @click="showProcessorDialog('edit')"
                  label="Editar"
                  icon="edit"
                  color="primary"
                  flat
                />

                <q-btn
                  @click="removeProcessor"
                  label="Remover"
                  icon="delete"
                  color="negative"
                  flat
                />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import MotherboardSearchDialog from 'components/dialogs/MotherboardSearchDialog'
import MotherboardDialog from 'components/dialogs/MotherboardDialog'
import { required } from 'src/utils/rules'

export default {
  name: 'Step2',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    components: {
      motherboard: {
        search: '',
        toggle: 1
      },
      processor: {
        search: '',
        toggle: 1
      }
    }
  }),
  methods: {
    required,
    showMotherboardSearchDialog () {
      this.$q.dialog({
        component: MotherboardSearchDialog,
        computer_id: this.val.id
      }).onOk(() => {
        this.$emit('refresh')
      })
    },
    showMotherboardDialog (mode) {
      if (mode == 'edit') {
        this.$q.dialog({
          component: MotherboardDialog,
          motherboard: this.val.motherboard 
        }).onOk(() => {
          this.$emit('refresh')
        })
      } else {
        this.$q.dialog({
          component: MotherboardDialog,
          computer_id: this.val.id
        }).onOk(() => {
          this.$emit('refresh')
        })
      }
    },
    removeMotherboard () {
      this.$q.dialog({
        title: 'Remover Placa-Mãe',
        message: 'Você tem certeza que deseja remover esta placa mãe deste computador?',
        ok: {
          label: 'Remover',
          color: 'primary'
        },
        cancel: {
          flat: true,
          label: 'Cancelar'
        }
      }).onOk(async () => {
        const { data } = await this.$axios.put('motherboard/' + this.val.motherboard.id, { ...this.val.motherboard, computer_id: null })
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })

        this.val.motherboard = null
      })
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
    },
    functionalMotherboard () {
      if (!this.val.motherboard) return 'Não disponível'

      return this.val.motherboard.functional ? 'Funcional' : 'Não funcional'
    },
    functionalProcessor () {
      if (!this.val.processor) return 'Não disponível'

      return this.val.processor.functional ? 'Funcional' : 'Não funcional'
    }
  }
}
</script>

<style lang="scss">
.toggle-button {
  border: 1px solid $primary;
}
</style>
