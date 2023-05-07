<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="list_alt" class="q-mr-sm" />
        Lista de Empréstimos
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <q-timeline v-if="loans.length > 0" class="q-ml-sm" color="primary">
          <q-timeline-entry
            v-for="loan in loans"
            :color="loan.return_date ? 'primary' : 'secondary'"
            icon="list_alt"
            :key="loan.id"
          >
            <template v-slot:title>
              <div class="text-body1">
                {{ loan.borrower.name }}
              </div>
            </template>
            <template v-slot:subtitle>
              {{ getLocaleDateString(loan.created_at) }}
            </template>
            
            <div class="text-caption row q-col-gutter-sm">
              <div class="col-12">
                <b>Data de Início:</b> {{ getLocaleDateString(loan.start_date) }}
              </div>
              <div class="col-12">
                <b>Data de Término Prevista:</b> {{ getLocaleDateString(loan.end_date) }}
              </div>
              <div v-if="loan.return_date" class="col-12">
                <b>Data de Devolução Efetiva:</b> {{ getLocaleDateString(loan.return_date) }}
              </div>
              <div class="col-12">
                <b>Cadastrado por:</b> {{ loan.responsible.name }}
              </div>
              <div class="col-12">
                <b>Ativo:</b> {{ loan.return_date ? 'Não' : 'Sim' }}
              </div>
            </div>
          </q-timeline-entry>
        </q-timeline>
        <div v-else class="text-body2">
          Não existe nenhum empréstimo para este dispositivo.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'LoansListDialog',
  props: ['loans'],
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
    }
  }
}
</script>