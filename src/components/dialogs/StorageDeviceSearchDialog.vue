<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="developer_board" class="q-mr-sm" />
        Pesquisar Dispositivo de Armazenamento
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div class="col-12">
          <q-form ref="cForm" @submit="searchStorageDevice">
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
        
        <template v-if="storageDevice">
          <div class="row col-12 text-body2 q-col-gutter-y-sm">
            <div v-if="storageDevice.computer_id" class="col-12">
             <b>Identificador do Computador:</b> {{  storageDevice.computer_id }}
            </div>
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
  name: 'StorageDsearchStorageDeviceSearchDialog',
  props: ['computer_id'],
  data: () => ({
    search: '',
    storageDevice: null,
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
      await this.$axios.put('storage-device/' + this.storageDevice.id, { 
        ...this.storageDevice,
        computer_id: this.computer_id
      })

      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async searchStorageDevice () {
      try {
        this.loading = true
        const { data } = await this.$axios.get('storage-device/' + this.search)
  
        this.storageDevice = data.storage_device
      } finally {
        this.loading = false
      }
    }
  }
}
</script>