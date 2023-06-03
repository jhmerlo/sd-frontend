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
                    <q-input
                      label="Matrícula"
                      v-model="filters.institutional_id"
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-input
                      label="Nome"
                      v-model="filters.name"
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-input
                      label="E-mail"
                      v-model="filters.email"
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
                @click="showLoansListDialog(props.row)"
                :disable="loading"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="list_alt" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    Empréstimos
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template>
          <template #name-activeLoan="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row text-center">
              <q-chip
                size="sm"
                class="text-white"
                :color="hasActiveLoan(props.row) ? 'secondary' : 'red-4'"
              >
                {{ hasActiveLoan(props.row) ? 'Ativo' : 'Inativo'}}
              </q-chip>
            </div>
          </template>
        </responsive-table>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showCreateBorrowerDialog" fab icon="add" color="primary">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ResponsiveTable from 'components/ResponsiveTable'
import LoansListDialog from 'components/dialogs/LoansListDialog'
import CreateBorrowerDialog from 'components/dialogs/CreateBorrowerDialog'

export default {
  name: 'Borrowers',
  components: {
    ResponsiveTable
  },
  data: () => ({
    loading: false,
    loans: [],
    filters: {
      institutional_id: '',
      name: '',
      email: ''
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    },
    columns: [
      { name: 'institutional_id', label: 'Matrícula', field: 'institutional_id', align: 'center', classes: 'text-center'},
      { name: 'name', label: 'Nome', field: 'name', align: 'center', classes: 'text-center'},
      { name: 'email', label: 'Email', field: 'email', align: 'center', classes: 'text-center'},
      { name: 'telephone', label: 'Telefone', field: 'telephone', align: 'center', classes: 'text-center'},
      { name: 'activeLoan', label: 'Empréstimo Ativo', field: 'loans', align: 'center'},
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center', classes: 'text-center' }
    ],
  }),
  methods: {
    async getIndex (props) {
      this.loading = true

      const page = props?.pagination?.page ? props.pagination.page : 1

      const { data } = await this.$axios.get('borrowers', { 
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
    clearFilters () {
      this.filters = {
        institutional_id: '',
        name: '',
        email: ''
      }

      this.getIndex()
    },
    showLoansListDialog ({ loans }) {
      console.log(loans)
      this.$q.dialog({
        component: LoansListDialog,
        loans
      }).onOk(() => {
        this.getIndex()
      })
    },
    showCreateBorrowerDialog () {
      this.$q.dialog({
        component: CreateBorrowerDialog
      }).onOk(() => {
        this.getIndex()
      })
    },
    hasActiveLoan ({ loans }) {
      let arr = loans.filter(v => v.return_date != null)

      return arr.length > 0
    }
  },
  created () {
    this.getIndex()
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