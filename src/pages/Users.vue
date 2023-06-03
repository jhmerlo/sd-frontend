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
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-select
                      label="Licença"
                      v-model="filters.license"
                      :options="[{label: 'Ativo', value: 'active'}, { label: 'Inativo', value: 'inactive' }]"
                      map-options
                      emit-value
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                    <q-select
                      label="Papel"
                      v-model="filters.role"
                      :options="[{label: 'Manutenção', value: 'maintenance'}, { label: 'Administrador', value: 'admin' }]"
                      map-options
                      emit-value
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
                @click="switchUserLicense(props.row.institutional_id)"
                :disable="loading || props.row.role == 'admin'"
                class="text-center text-grey-7"
                clickable
                dense
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon :name="props.row.license == 'active' ? 'no_accounts' : 'done_all'" size="sm" />
                  </q-item-label>
                  <q-item-label caption>
                    {{ props.row.license == 'active' ? 'Desativar Usuário' : 'Ativar Usuário' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template>
          <template #name-license="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row text-center">
              <q-chip
                size="sm"
                class="text-white"
                :color="props.row.license == 'active' ? 'secondary' : 'red-4'"
              >
                {{ props.row.license == 'active' ? 'Ativo' : 'Inativo'}}
              </q-chip>
            </div>
          </template>
          <template #name-role="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row text-center">
              <q-chip
                size="sm"
                class="text-white"
                :color="props.row.role == 'maintenance' ? 'blue-4' : 'purple-4'"
              >
                {{ props.row.role == 'maintenance' ? 'Manutenção' : 'Administrador'}}
              </q-chip>
            </div>
          </template>
          <template #name-email_verified_at="{ props }">
            <div :class="$q.screen.gt.sm ? 'justify-center' : ''" class="col-12 row text-center">
              <q-chip
                size="sm"
                class="text-white"
                :color="props.row.email_verified_at == null ? 'negative' : 'secondary'"
              >
                {{ props.row.email_verified_at == null ? 'Não Verificado' : 'Verificado'}}
              </q-chip>
            </div>
          </template>
        </responsive-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import ResponsiveTable from 'components/ResponsiveTable'

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
      email: '',
      license: '',
      role: ''
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
      { name: 'license', label: 'Licença', field: 'license', align: 'center'},
      { name: 'email_verified_at', label: 'E-mail Verificado', field: 'email_verified_at', align: 'center'},
      { name: 'role', label: 'Papel', field: 'role', align: 'center'},
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center', classes: 'text-center' }
    ],
  }),
  methods: {
    async getIndex (props) {
      this.loading = true

      const page = props?.pagination?.page ? props.pagination.page : 1

      const { data } = await this.$axios.get('users', { 
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
        email: '',
        license: '',
        role: ''
      }

      this.getIndex()
    },
    async switchUserLicense (id) {
      this.$q.dialog({
        title: 'Ativar/Desativar Usuário',
        message: 'Você tem certeza que deseja alterar a licença deste usuário?',
        cancel: {
          flat: true
        },
        ok: {
          label: 'Continuar',
          flat: false
        }
      }).onOk(async () => {
        try {
          this.$q.loading.show()
          const { data } = await this.$axios.put('user/' + id + '/switch-user-license')
  
          this.$q.notify({
            type: 'positive',
            message: data.message
          })
  
          this.getIndex()
        } finally {
          this.$q.loading.hide()
        }
      })
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