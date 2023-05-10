<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="list_alt" class="q-mr-sm" />
        Lista de Transferências
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-timeline v-if="transferHistories.length > 0" class="q-ml-sm" color="primary">
          <q-timeline-entry
            v-for="transferHistory in transferHistories"
            color="primary"
            icon="move_up"
            :key="transferHistory.id"
          >
            <template v-slot:title>
              <div class="text-body1">
                {{ getTransferTitle(transferHistory) }}
              </div>
            </template>
            <template v-slot:subtitle>
              {{ getLocaleDateString(transferHistory.created_at) }}
            </template>
            
            <div class="text-caption row q-col-gutter-sm">
              <div class="col-12">
                <b>Responsável:</b> {{ transferHistory.responsible.name }}
              </div>
            </div>
          </q-timeline-entry>
        </q-timeline>
        <div v-else class="text-body2">
          Não existe nenhuma transferência para este componente.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TransferHistoryDialog',
  props: ['transferHistories'],
  data: () => ({
    loading: false
  }),
  methods: {
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
    onCancelClick () {
      this.hide()
    },
    getLocaleDateString (date) {
      const dt = new Date(date)

      return dt.toLocaleDateString('pt-br') + ' ' + dt.toLocaleTimeString('pt-br')
    },
    getTransferTitle ({ source_id, target_id }) {
      const source = source_id ? '#' + source_id : 'Avulso'
      const target = target_id ? '#' + target_id : 'Avulso'

      return 'Transferência de ' + source + ' para ' + target
    }
  }
}
</script>