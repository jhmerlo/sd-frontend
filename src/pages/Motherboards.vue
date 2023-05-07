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
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input
                      label="Fabricante"
                      v-model="filters.manufacturer" 
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
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

      <div class="col-12">
        <responsive-table
          @request="getIndex"
          :columns="columns"
          :pagination.sync="pagination"
          :data="motherboards"
          :loading="loading"
        >
        </responsive-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import ResponsiveTable from 'components/ResponsiveTable'
import { date } from 'quasar'

export default {
  name: 'Motherboards',
  components: {
    ResponsiveTable
  },
  data: () => ({
    loading: false,
    motherboards: [],
    filters: {
      manufacturer: '',
      id: ''
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    },
    columns: [
      { name: 'id', label: 'Identificador', field: 'id', align: 'left' },
      { name: 'manufacturer', label: 'Fabricante', field: 'manufacturer', align: 'left' },
      { name: 'model', label: 'Modelo', field: 'model', align: 'left' },
      { name: 'functional', label: 'Funcional', field: 'functional', align: 'left' },
      { name: 'computer_id', label: 'Computador', field: 'computer_id', align: 'left' },
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
        current_step: '',
        type: ''
      }

      this.getIndex()
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style>

</style>