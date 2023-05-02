<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-12 text-h6">
      Testes de Usuário
    </div>
    <div class="col-12 text-caption q-mb-sm text-grey-9">
      Atividades realizadas para verificar o desempenho do computador em rotinas básicas da área de trabalho e internet. 
    </div>
    <div v-if="val.current_step == 5" class="col-12">
      Deseja cadastrar os testes de usuário do computador? 
      <q-toggle
        v-model="userTestToggle"
        color="secondary"
      />
    </div>
    <template v-if="userTestToggle && val.current_step == 5">
      <q-form @submit="handleSubmit" class="row col-12 q-col-gutter-md">
        <div class="col-12 q-mb-sm">
          <q-separator />
        </div>
        <div class="col-md-6 col-xs-12">
          O computador inicializa o sistema automaticamente?
          <q-toggle
            color="secondary"
            class="q-ml-sm"
            v-model="userTests.auto_boot"
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          A inicialização ocorre de maneira fluida e sem travamentos?
          <q-toggle
            color="secondary"
            class="q-ml-sm"
            v-model="userTests.initialization"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          Os atalhos da área de trabalho funcionam corretamente?
          <q-toggle
            color="secondary"
            class="q-ml-sm"
            v-model="userTests.shortcuts"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          O computador exibe data e hora corretamente?
          <q-toggle
            v-model="userTests.correct_date"
            color="secondary"
            class="q-ml-sm"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Teste de Desempenho: GSuite"
            v-model="userTests.gsuite_performance"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Teste de Desempenho: Wine"
            v-model="userTests.wine_performance"
            outlined
            dense
          />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input
            label="Teste de Desempenho: Youtube"
            v-model="userTests.youtube_performance"
            outlined
            dense
          />
        </div>
        <div class="col-12 text-right">
          <q-btn
            type="submit"
            color="primary"
            label="Adicionar Teste de Usuário"
          />
        </div>
      </q-form>
    </template>
    <div class="col-12">
      <q-list bordered>
        <q-expansion-item
          style="border-radius: 4px"        
          icon="ads_click"
          label="Histórico de Testes de Usuário"
          header-class="text-body2 text-primary"
        >
          <q-card>
            <q-card-section>
              <q-timeline color="primary">
  
                <q-timeline-entry
                  v-for="userTest in val.user_test_histories"
                  icon="ads_click"
                  :key="userTest.id"
                >
                <template v-slot:title>
                  <div class="text-body1">
                    {{ userTest.responsible.name }}
                  </div>
                </template>
                <template v-slot:subtitle>
                  {{ getLocaleDateString(userTest.created_at) }}
                </template>
                
                <q-list bordered>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon 
                        :name="userTest.auto_boot ? 'check_circle' : 'cancel'"
                        :color="userTest.auto_boot ? 'secondary' : 'negative'"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Inicialização automática
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.auto_boot ? 'Sim' : 'Não' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon 
                        :name="userTest.initialization ? 'check_circle' : 'cancel'"
                        :color="userTest.initialization ? 'secondary' : 'negative'"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Inicialização fluida
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.initialization ? 'Sim' : 'Não' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon 
                        :name="userTest.shortcuts ? 'check_circle' : 'cancel'"
                        :color="userTest.shortcuts ? 'secondary' : 'negative'"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Atalhos funcionais
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.shortcuts ? 'Sim' : 'Não' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon 
                        :name="userTest.correct_date ? 'check_circle' : 'cancel'"
                        :color="userTest.correct_date ? 'secondary' : 'negative'"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Data e hora correta
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.correct_date ? 'Sim' : 'Não' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="userTest.gsuite_performance">
                    <q-item-section avatar>
                      <q-icon color="primary" name="apps" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Performance: GSuite
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.gsuite_performance }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="userTest.wine_performance">
                    <q-item-section avatar>
                      <q-icon color="primary" name="local_bar" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Performance: Wine
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.wine_performance }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="userTest.youtube_performance">
                    <q-item-section avatar>
                      <q-icon color="primary" name="smart_display" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        Performance: Youtube
                      </q-item-label>
                      <q-item-label caption>
                        {{ userTest.youtube_performance }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'Step5',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    userTests: {
      auto_boot: true,
      initialization: true,
      shortcuts: true,
      correct_date: true,
      gsuite_performance: '',
      wine_performance: '',
      youtube_performance: ''
    },
    userTestToggle: true
  }),
  methods: {
    required,
    async handleSubmit () {
      try {
        this.$q.loading.show()
        await this.$axios.post('computer/' + this.val.id + '/user-test-history', {
          ...this.userTests
        })
  
        this.$q.notify({
          type: 'positive',
          message: 'Teste de usuário adicionado com sucesso.'
        })
        
        this.userTests = {
          auto_boot: true,
          initialization: true,
          shortcuts: true,
          correct_date: true,
          gsuite_performance: '',
          wine_performance: '',
          youtube_performance: ''
        }

        this.$emit('refresh')
      } finally {
        this.$q.loading.hide()
      }
    },
    getLocaleDateString (date) {
      const dt = new Date(date)

      return dt.toLocaleDateString('pt-br') + ' ' + dt.toLocaleTimeString('pt-br')
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
    }
  }
}
</script>
