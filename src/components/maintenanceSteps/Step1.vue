<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-12 text-h6">
      Processo de Triagem
    </div>
    <div class="col-12 text-caption q-mb-sm text-grey-9">
      Levantamento das principais informações do computador, seguido de higienização e breve inspeção de funcionalidade.
    </div>
    <div class="col-md-8 col-xs-12">
      <q-input
      label="Descrição *"
      v-model="val.description"
      :rules="[required]"
      :disable="val.current_step != 1"
      lazy-rules
      hide-bottom-space
      outlined
      dense
      />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input
        label="Fabricante *"
        v-model="val.manufacturer"
        :rules="[required]"
        :disable="val.current_step != 1"
        lazy-rules
        hide-bottom-space
        outlined
        dense
      />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-select
        v-model="val.type"
        label="Tipo"
        :options="typeOptions"
        :disable="val.current_step != 1"
        use-input
        map-options
        emit-value
        lazy-rules
        outlined
        dense
      />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input
        label="Sistema Operacional"
        v-model="val.operational_system"
        :disable="val.current_step != 1"
        lazy-rules
        outlined
        dense
      />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input
        label="Patrimônio UFES"
        v-model="val.patrimony"
        :disable="val.current_step != 1"
        lazy-rules
        outlined
        dense
      />
    </div>
    <div class="col-md-12 q-mt-xs">
      <q-toggle
        v-model="val.sanitized"
        :disable="val.current_step != 1"
        icon="cleaning_services"
        size="lg"
        color="secondary"
        :label="val.sanitized ? 'Higienizado' : 'Não Higienizado'"
        class="text-grey-9"
      />
    </div>
    <div class="col-12 q-pt-none">
      <q-toggle
        v-model="val.functional"
        :disable="val.current_step != 1"
        icon="power_settings_new"
        size="lg"
        color="secondary"
        :label="val.functional ? 'Funcional' : 'Não Funcional'"
        class="text-grey-9"
      />
    </div>
  </div>
</template>

<script>
import { required } from 'src/utils/rules'

export default {
  name: 'Step1',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    typeOptions: [
      {
        label: 'Desktop',
        value: 'desktop'
      },
      {
        label: 'Notebook',
        value: 'notebook'
      }
    ],
  }),
  methods: {
    required
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
