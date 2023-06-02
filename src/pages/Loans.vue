<template>
  <q-page>
    <div class="row q-pa-sm q-col-gutter-sm">
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
                    <q-select
                      label="Tipo"
                      v-model="filters.loanable_type"
                      :options="loanableTypesOptions"
                      emit-value
                      map-options
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <computer-input
                      label="ID do Item"
                      v-model="filters.loanable_id" 
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <filterable-select
                      label="Responsável"
                      v-model="filters.responsible_id" 
                      :options="userOptions" 
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <filterable-select
                      label="Tomador de Empréstimo"
                      v-model="filters.borrower_id" 
                      :options="borrowersOptions"
                      option-label="name"
                      option-value="institutional_id"
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
          :data="loans"
          :loading="loading"
          breakpoint="md"
        >
          <template #name-actions="{ props }">
            <div class="col-12 q-gutter-xs row no-wrap justify-center">
              <q-item
                @click="showLoanableDialog(props.row)"
                :disable="loading"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="visibility" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Visualizar
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                @click="showReturnLoanDialog(props.row)"
                :disable="loading"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="keyboard_return" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Devolução
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
                :color="getStatus(props.row) == 'Emprestado' ? 'red-4' : getStatus(props.row) == 'Liberado' ? 'secondary' : 'negative'"
              >
                {{ getStatus(props.row) }}
              </q-chip>
            </div>
          </template>
        </responsive-table>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showCreateLoanDialog" fab icon="add" color="primary">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import FilterableSelect from 'components/FilterableSelect'
import ResponsiveTable from 'components/ResponsiveTable'
import ComputerInput from 'components/ComputerInput'
import CreateLoanDialog from 'components/dialogs/CreateLoanDialog'
import CommentsDialog from 'components/dialogs/CommentsDialog'
import ReturnLoanDialog from 'components/dialogs/ReturnLoanDialog'

import MotherboardSearchDialog from 'components/dialogs/MotherboardSearchDialog'
import ProcessorSearchDialog from 'components/dialogs/ProcessorSearchDialog'
import RamMemorySearchDialog from 'components/dialogs/RamMemorySearchDialog'
import StorageDeviceSearchDialog from 'components/dialogs/StorageDeviceSearchDialog'
import PowerSupplySearchDialog from 'components/dialogs/PowerSupplySearchDialog'
import GpuSearchDialog from 'components/dialogs/GpuSearchDialog'
import MonitorSearchDialog from 'components/dialogs/MonitorSearchDialog'
import CreateComputerDialog from 'src/components/dialogs/CreateComputerDialog'

import { date } from 'quasar'

const loanableTypesMapper = {
  'App\\Models\\Computer': 'Computador',
  'App\\Models\\Motherboard': 'Placa-mãe',
  'App\\Models\\Processor': 'Processador',
  'App\\Models\\RamMemory': 'Memória RAM',
  'App\\Models\\StorageDevice': 'Dispositivo de Armazenamento',
  'App\\Models\\PowerSupply': 'Fonte de Alimentação',
  'App\\Models\\Gpu': 'GPU',
  'App\\Models\\Monitor': 'Monitor',
}

const loanableTypesOptions = [
  { label: 'Computador', value: 'App\\Models\\Computer' },
  { label: 'Placa-mãe', value: 'App\\Models\\Motherboard' },
  { label: 'Processador', value: 'App\\Models\\Processor' },
  { label: 'Memória RAM', value: 'App\\Models\\RamMemory' },
  { label: 'Dispostivo de Armazenamento', value: 'App\\Models\\StorageDevice' },
  { label: 'Fonte de Alimentação', value: 'App\\Models\\PowerSupply' },
  { label: 'GPU', value: 'App\\Models\\Gpu' },
  { label: 'Monitor', value: 'App\\Models\\Monitor' }
]

export default {
  name: 'Loans',
  components: {
    ResponsiveTable,
    ComputerInput,
    FilterableSelect
  },
  data: () => ({
    loanableTypesOptions,
    loanableTypesMapper,
    loading: false,
    userOptions: [],
    borrowersOptions: [],
    loans: [],
    filters: {
      id: '',
      loanable_type: '',
      loanable_id: '',
      borrower_id: '',
      responsible_id: ''
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    },
    columns: [
      { name: 'id', label: 'Identificador', field: 'id', align: 'center', classes: 'text-center text-weight-bold', format: v => '#' + v },
      { name: 'loanable_type', label: 'Tipo', field: 'loanable_type', align: 'left', format: v => loanableTypesMapper[v] },
      { name: 'loanable_id', label: 'ID do Item', field: 'loanable_id', align: 'center', classes: 'text-center', format: v => '#' + v },
      { name: 'borrower', label: 'Tomador de Empréstimo', field: 'borrower', align: 'left', tooltip: true, style: 'max-width: 200px', classes: 'ellipsis', format: v => v.name },
      { name: 'responsible', label: 'Responsável', field: 'responsible', align: 'left', tooltip: true, style: 'max-width: 200px', classes: 'ellipsis', format: v => v.name },
      { name: 'start_date', label: 'Data de Início', field: 'start_date', align: 'center', classes: 'text-center', format: v => date.formatDate(v, 'DD/MM/YYYY') },
      { name: 'end_date', label: 'Data de Término', field: 'end_date', align: 'center', classes: 'text-center', format: v => date.formatDate(v, 'DD/MM/YYYY') },
      { name: 'return_date', label: 'Data de Devolução', field: 'return_date', align: 'center', classes: 'text-center', format: v => v ? date.formatDate(v, 'DD/MM/YYYY') : '-' },
      { name: 'borrowed', label: 'Emprestado', field: 'borrowed', align: 'center', classes: 'text-center'},
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center', classes: 'text-center' }
    ],
  }),
  methods: {
    async getIndex (props) {
      this.loading = true

      const page = props?.pagination?.page ? props.pagination.page : 1

      const { data } = await this.$axios.get('loans', { 
        params: { 
          page,
          ...this.filters
        }
      });
      
      this.loans = data.data
      this.pagination.page = page
      this.pagination.rowsNumber = data.total
      this.loading = false
    },
    async getUserOptions () {
      const { data } = await this.$axios.get('user-select-options-index')

      this.userOptions = data.users
      this.$q.loading.hide()
    },
    async getBorrowersOptions () {
      this.$q.loading.show()
      const { data } = await this.$axios.get('borrowers', { params: { noPaginate: true }})

      this.borrowersOptions = data.borrowers
      this.$q.loading.hide()
    },
    clearFilters () {
      this.filters = {
        id: '',
        loanable_type: '',
        loanable_id: '',
        borrower_id: '',
        responsible_id: ''
      }

      this.getIndex()
    },
    showLoanableDialog (loanable) {
      const loanableDialogsMapper = {
        'App\\Models\\Computer': CreateComputerDialog,
        'App\\Models\\Motherboard': MotherboardSearchDialog,
        'App\\Models\\Processor': ProcessorSearchDialog,
        'App\\Models\\RamMemory': RamMemorySearchDialog,
        'App\\Models\\StorageDevice': StorageDeviceSearchDialog,
        'App\\Models\\PowerSupply': PowerSupplySearchDialog,
        'App\\Models\\Gpu': GpuSearchDialog,
        'App\\Models\\Monitor': MonitorSearchDialog,
      }

      const dial = loanableDialogsMapper[loanable.loanable_type]

      this.$q.dialog({
        component: dial,
        loanable: loanable.loanable
      }).onOk(() => {
        this.getIndex()
      })
    },
    showCreateLoanDialog () {
      this.$q.dialog({
        component: CreateLoanDialog,
        borrowersOptions: this.borrowersOptions
      }).onOk(() => {
        this.getIndex()
      })
    },
    showReturnLoanDialog (loan) {
      this.$q.dialog({
        component: ReturnLoanDialog,
        loan
      }).onOk(() => {
        this.getIndex()
      })
    },
    showCommentsDialog (commentable) {
      this.$q.dialog({
        component: CommentsDialog,
        commentableType: "App\\Models\\Loan",
        commentable: commentable
      }).onOk((comments) => {
        commentable.comments = comments
      })
    },
    getStatus (row) {      
      if (row.return_date) {
        return 'Liberado'
      } else if (Date.parse(row.end_date) < Date.now()) {
        return 'Atrasado'
      } else {
        return 'Emprestado'
      }
    }
  },
  created () {
    this.getIndex()
    this.getUserOptions()
    this.getBorrowersOptions()
  }
}
</script>

<style>
.q-table__bottom {
  justify-content: start !important;
}

.q-table__bottom .q-table__separator {
  display: none !important;
}
</style>