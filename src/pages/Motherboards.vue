<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-expansion-item
          class="bg-white shadow-1"
          style="border-radius: 4px"
          icon="search"
          label="Filtros"
          header-class="text-h6 text-primary text-weight-light"
        >
          <q-card>
            <q-card-section class="q-pt-sm">
              <q-form @submit.prevent="getIndex">
                <div class="row q-col-gutter-md">
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-input
                      label="Fabricante"
                      v-model="filters.manufacturer" 
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-input
                      label="Modelo"
                      v-model="filters.model" 
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-select
                      label="Emprestado"
                      v-model="filters.borrowed"
                      :options="[{label: 'Sim', value: true}, {label: 'Não', value: false}]"
                      emit-value
                      map-options
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <computer-input
                      label="Identificador do Computador"
                      v-model="filters.computer_id" 
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-input
                      label="Identificador"
                      v-model="filters.id"
                      outlined
                      dense
                    />
                  </div>
                </div>
                <div class="col-12 q-mt-sm text-right">
                  <q-btn
                    @click="clearFilters"
                    class="q-ma-xs"
                    label="Limpar"
                    color="primary"
                    flat
                  />
                  <q-btn
                    class="q-ma-xs"
                    type="submit"
                    label="Filtrar"
                    color="secondary"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div :class="$q.screen.xs || $q.screen.sm ? 'col-12 q-pt-none' : 'col-12'">
        <responsive-table
          @request="getIndex"
          :columns="columns"
          :pagination.sync="pagination"
          :data="motherboards"
          :loading="loading"
          breakpoint="md"
        >
          <template #name-actions="{ props }">
            <div class="col-12 q-gutter-xs row no-wrap justify-center">
              <q-item
                @click="showMotherboardDialog(props.row)"
                :disable="loading || props.row.borrowed"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="create" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Editar
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                @click="showTransferHistoryDialog(props.row)"
                :disable="loading"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <!-- <q-inner-loading
                  :showing="historyLoading.includes(props.row.id)"
                /> -->
                <q-item-section>
                  <q-item-label>
                    <q-icon name="history" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Histórico
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                @click="showCommentsDialog(props.row)"
                :disable="loading"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <!-- <q-inner-loading
                  :showing="messagesLoading.includes(props.row.id)"
                /> -->
                <q-item-section>
                  <q-item-label>
                    <q-icon name="message" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Comentários
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template>
          <template #name-functional="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row">
              <q-chip
                size="sm"
                class="text-white"
                :color="props.row.functional ? 'secondary' : 'negative'"
              >
                {{ props.row.functional ? 'Funcional' : 'Não Funcional'}}
              </q-chip>
            </div>
          </template>
          <template #name-borrowed="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row">
              <q-chip
                size="sm"
                class="text-white"
                :color="props.row.borrowed ? 'red-4' : 'secondary'"
              >
                {{ props.row.borrowed ? 'Emprestado' : 'Liberado'}}
              </q-chip>
            </div>
          </template>
        </responsive-table>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showMotherboardDialog(null)" fab icon="add" color="primary">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ResponsiveTable from 'components/ResponsiveTable'
import ComputerInput from 'components/ComputerInput'
import MotherboardDialog from 'components/dialogs/MotherboardDialog'
import TransferHistoryDialog from 'components/dialogs/TransferHistoryDialog'
import CommentsDialog from 'components/dialogs/CommentsDialog'

import { date } from 'quasar'

export default {
  name: 'Motherboards',
  components: {
    ResponsiveTable,
    ComputerInput
  },
  data: () => ({
    loading: false,
    motherboards: [],
    filters: {
      manufacturer: '',
      model: '',
      computer_id: '',
      id: '',
      borrowed: ''
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    },
    columns: [
      { name: 'id', label: 'Identificador', field: 'id', align: 'center', classes: 'text-center text-weight-bold', format: v => '#' + v },
      { name: 'manufacturer', label: 'Fabricante', field: 'manufacturer', align: 'left', tooltip: true, style: 'max-width: 200px', classes: 'ellipsis' },
      { name: 'model', label: 'Modelo', field: 'model', align: 'left', tooltip: true, style: 'max-width: 200px', classes: 'ellipsis' },
      { name: 'functional', label: 'Funcional', field: 'functional', align: 'center' },
      { name: 'borrowed', label: 'Emprestado', field: 'borrowed', align: 'left'},
      { name: 'computer_id', label: 'Computador', field: 'computer_id', align: 'center', classes: 'text-center text-weight-bold', format: v => v ? '#' + v : '-'  },
      { name: 'updated_at', label: 'Atualizado em', field: 'updated_at', align: 'left', format: v => date.formatDate(v, 'DD/MM/YYYY - HH:mm') },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
    ],
  }),
  methods: {
    async getIndex (props) {
      this.loading = true

      const page = props?.pagination?.page ? props.pagination.page : 1

      const { data } = await this.$axios.get('motherboards', { 
        params: { 
          page,
          ...this.filters
        }
      });
      
      this.motherboards = data.data
      this.pagination.page = page
      this.pagination.rowsNumber = data.total
      this.loading = false
    },
    clearFilters () {
      this.filters = {
        manufacturer: '',
        model: '',
        computer_id: '',
        id: '',
        borrowed: ''
      }

      this.getIndex()
    },
    showMotherboardDialog (motherboard) {
      this.$q.dialog({
        component: MotherboardDialog,
        motherboard
      }).onOk(() => {
        this.getIndex()
      })
    },
    showTransferHistoryDialog ({ transfer_histories }) {
      this.$q.dialog({
        component: TransferHistoryDialog,
        transferHistories: transfer_histories
      })
    },
    showCommentsDialog (commentable) {
      this.$q.dialog({
        component: CommentsDialog,
        commentableType: "App\\Models\\Motherboard",
        commentable
      }).onOk((comments) => {
        commentable.comments = comments
      })
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style>

</style>