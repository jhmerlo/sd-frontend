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
                <div v-if="val.processor.clock" class="col-12">
                  <b>Clock:</b> {{  val.processor.clock + ' GHz' }}
                </div>
                <div v-if="val.processor.threads" class="col-12">
                  <b>Threads:</b> {{  val.processor.threads }}
                </div>
                <div v-if="val.processor.cache" class="col-12">
                  <b>Cache:</b> {{  val.processor.cache + ' MB' }}
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

        <!-- Ram Memory -->
        <q-expansion-item
          expand-separator
          icon="memory"
          label="Memória RAM"
          :header-class="
            functionalMemoryRam.includes('Não') ? 
            'text-negative text-weight-medium' : 
            'text-secondary text-weight-medium'
          "
          :caption="functionalMemoryRam"
        >
          <q-card>
            <q-card-section class="q-pb-none">
              <div v-for="ramMemory in val.ram_memories" :key="ramMemory.id" >
                <div class="row col-12 text-body2 q-col-gutter-y-sm text-grey-9">
                  <div class="col-12">
                    <b>Fabricante:</b> {{  ramMemory.manufacturer }}
                  </div>
                  <div class="col-12">
                    <b>Modelo:</b> {{  ramMemory.model }}
                  </div>
                  <div class="col-12">
                    <b>Clock:</b> {{  ramMemory.clock + ' MHz' }}
                  </div>
                  <div class="col-12">
                    <b>Capacidade:</b> {{  ramMemory.size + 'GB' }}
                  </div>
                  <div class="col-12">
                    <b>Tecnologia:</b> {{  ramMemory.technology }}
                  </div>
                  <div class="col-12">
                    <q-icon
                      :name="ramMemory.functional ? 'check_circle' : 'cancel'" 
                      :color="ramMemory.functional ? 'positive' : 'negative'" 
                      size="xs"  
                    />
                    {{ ramMemory.functional ? 'Funcional' : 'Não Funcional' }}
                  </div>
                </div>

                <q-card-actions align="right">
                  <q-btn
                    @click="showRamMemoryDialog('edit', ramMemory)"
                    label="Editar"
                    icon="edit"
                    color="primary"
                    flat
                  />

                  <q-btn
                    @click="removeRamMemory(ramMemory)"
                    label="Remover"
                    icon="delete"
                    color="negative"
                    flat
                  />
                </q-card-actions>

                <q-separator class="q-my-lg" />
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                @click="showRamMemorySearchDialog"
                class="q-pa-xs"
                label="Pesquisar"
                icon="search"
                color="primary"
                stack
                outline
              />
              <q-btn
                @click="showRamMemoryDialog('create')"
                class="q-pa-xs"
                label="Adicionar"
                icon="add"
                color="primary"
                stack
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>

        <!-- Storage Device -->
        <q-expansion-item
          expand-separator
          icon="storage"
          label="Dispositivo de Armazenamento"
          :header-class="
            functionalStorageDevice.includes('Não') ? 
            'text-negative text-weight-medium' : 
            'text-secondary text-weight-medium'
          "
          :caption="functionalStorageDevice"
        >
          <q-card>
            <q-card-section class="q-pb-none">
              <div v-for="storageDevice in val.storage_devices" :key="storageDevice.id" >
                <div class="row col-12 text-body2 q-col-gutter-y-sm text-grey-9">
                  <div class="col-12">
                    <b>Fabricante:</b> {{  storageDevice.manufacturer }}
                  </div>
                  <div class="col-12">
                    <b>Modelo:</b> {{  storageDevice.model }}
                  </div>
                  <div class="col-12">
                    <b>Tipo:</b> {{  storageDevice.type }}
                  </div>
                  <div class="col-12">
                    <b>Capacidade:</b> {{  storageDevice.size + 'GB' }}
                  </div>
                  <div class="col-12">
                    <b>Tecnologia:</b> {{  storageDevice.connection_technology }}
                  </div>
                  <div class="col-12">
                    <q-icon
                      :name="storageDevice.functional ? 'check_circle' : 'cancel'" 
                      :color="storageDevice.functional ? 'positive' : 'negative'" 
                      size="xs"  
                    />
                    {{ storageDevice.functional ? 'Funcional' : 'Não Funcional' }}
                  </div>
                </div>

                <q-card-actions align="right">
                  <q-btn
                    @click="showStorageDeviceDialog('edit', storageDevice)"
                    label="Editar"
                    icon="edit"
                    color="primary"
                    flat
                  />

                  <q-btn
                    @click="removeStorageDevice(storageDevice)"
                    label="Remover"
                    icon="delete"
                    color="negative"
                    flat
                  />
                </q-card-actions>

                <q-separator class="q-my-lg" />
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                @click="showStorageDeviceSearchDialog"
                class="q-pa-xs"
                label="Pesquisar"
                icon="search"
                color="primary"
                stack
                outline
              />
              <q-btn
                @click="showStorageDeviceDialog('create')"
                class="q-pa-xs"
                label="Adicionar"
                icon="add"
                color="primary"
                stack
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import MotherboardSearchDialog from 'components/dialogs/MotherboardSearchDialog'
import MotherboardDialog from 'components/dialogs/MotherboardDialog'
import ProcessorSearchDialog from 'components/dialogs/ProcessorSearchDialog'
import ProcessorDialog from 'components/dialogs/ProcessorDialog'
import RamMemorySearchDialog from 'components/dialogs/RamMemorySearchDialog'
import RamMemoryDialog from 'components/dialogs/RamMemoryDialog'
import StorageDeviceSearchDialog from 'components/dialogs/StorageDeviceSearchDialog'
import StorageDeviceDialog from 'components/dialogs/StorageDeviceDialog'

export default {
  name: 'Step2',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
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
    },
    showProcessorSearchDialog () {
      this.$q.dialog({
        component: ProcessorSearchDialog,
        computer_id: this.val.id
      }).onOk(() => {
        this.$emit('refresh')
      })
    },
    showProcessorDialog (mode) {
      if (mode == 'edit') {
        this.$q.dialog({
          component: ProcessorDialog,
          processor: this.val.processor 
        }).onOk(() => {
          this.$emit('refresh')
        })
      } else {
        this.$q.dialog({
          component: ProcessorDialog,
          computer_id: this.val.id
        }).onOk(() => {
          this.$emit('refresh')
        })
      }
    },
    removeProcessor () {
      this.$q.dialog({
        title: 'Remover Processador',
        message: 'Você tem certeza que deseja remover este processador deste computador?',
        ok: {
          label: 'Remover',
          color: 'primary'
        },
        cancel: {
          flat: true,
          label: 'Cancelar'
        }
      }).onOk(async () => {
        const { data } = await this.$axios.put('processor/' + this.val.processor.id, { ...this.val.processor, computer_id: null })
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })

        this.val.processor = null
      })
    },
    showRamMemorySearchDialog () {
      this.$q.dialog({
        component: RamMemorySearchDialog,
        computer_id: this.val.id
      }).onOk(() => {
        this.$emit('refresh')
      })
    },
    showRamMemoryDialog (mode, ramMemory) {
      if (mode == 'edit') {
        this.$q.dialog({
          component: RamMemoryDialog,
          ramMemory
        }).onOk(() => {
          this.$emit('refresh')
        })
      } else {
        this.$q.dialog({
          component: RamMemoryDialog,
          computer_id: this.val.id
        }).onOk(() => {
          this.$emit('refresh')
        })
      }
    },
    removeRamMemory (ramMemory) {
      this.$q.dialog({
        title: 'Remover Memória RAM',
        message: 'Você tem certeza que deseja remover esta memória RAM deste computador?',
        ok: {
          label: 'Remover',
          color: 'primary'
        },
        cancel: {
          flat: true,
          label: 'Cancelar'
        }
      }).onOk(async () => {
        const { data } = await this.$axios.put('ram-memory/' + ramMemory.id, { ...ramMemory, computer_id: null })
        
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })

        const index = this.val.ram_memories.indexOf(ramMemory)
        if (index > -1) this.val.ram_memories.splice(index, 1)
      })
    },
    showStorageDeviceSearchDialog () {
      this.$q.dialog({
        component: StorageDeviceSearchDialog,
        computer_id: this.val.id
      }).onOk(() => {
        this.$emit('refresh')
      })
    },
    showStorageDeviceDialog (mode, storageDevice) {
      if (mode == 'edit') {
        this.$q.dialog({
          component: StorageDeviceDialog,
          storageDevice
        }).onOk(() => {
          this.$emit('refresh')
        })
      } else {
        this.$q.dialog({
          component: StorageDeviceDialog,
          computer_id: this.val.id
        }).onOk(() => {
          this.$emit('refresh')
        })
      }
    },
    removeStorageDevice (storageDevice) {
      this.$q.dialog({
        title: 'Remover Dispositivo de Armazenamento',
        message: 'Você tem certeza que deseja remover este dispositivo de armazenamento deste computador?',
        ok: {
          label: 'Remover',
          color: 'primary'
        },
        cancel: {
          flat: true,
          label: 'Cancelar'
        }
      }).onOk(async () => {
        const { data } = await this.$axios.put('storage-device/' + storageDevice.id, { ...storageDevice, computer_id: null })
        
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })

        const index = this.val.storage_devices.indexOf(storageDevice)
        if (index > -1) this.val.storage_devices.splice(index, 1)
      })
    },
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
    },
    functionalMemoryRam () {
      if (this.val.ram_memories.length == 0) return 'Não disponível'

      const arr = this.val.ram_memories.filter(itm => itm.functional == true)
      return arr.length > 0 ? 'Funcional' : 'Não funcional'
    },
    functionalStorageDevice () {
      if (this.val.storage_devices.length == 0) return 'Não disponível'

      const arr = this.val.storage_devices.filter(itm => itm.functional == true)
      return arr.length > 0 ? 'Funcional' : 'Não funcional'
    }
  }
}
</script>
