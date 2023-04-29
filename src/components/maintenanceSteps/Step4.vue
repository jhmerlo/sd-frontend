<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-12 text-h6">
      Rede e Periféricos
    </div>
    <div class="col-12 text-caption q-mb-none text-grey-9">
      Verificação dos componentes de rede e periféricos.
    </div>
    <div class="col-12 row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="settings_input_hdmi" size="sm" color="primary" /> Entrada HDMI
        </div>
        <q-btn-toggle
          v-model="val.hdmi_input"
          :disable="val.current_step != 4"
          size="10px"
          class="toggle-button"
          unelevated
          color="white"
          :toggle-color="getColor(val.hdmi_input)"
          no-caps
          rounded
          text-color="primary"
          :options="options"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="cable" size="sm" color="primary" /> Entrada VGA
        </div>
        <q-btn-toggle
          v-model="val.vga_input"
          size="10px"
          :disable="val.current_step != 4"
          class="toggle-button"
          :toggle-color="getColor(val.vga_input)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="cable" size="sm" color="primary" /> Entrada DVI
        </div>
        <q-btn-toggle
          v-model="val.dvi_input"
          class="toggle-button"
          size="10px"
          :disable="val.current_step != 4"
          :toggle-color="getColor(val.dvi_input)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="lan" size="sm" color="primary" /> Adaptador de Rede Local
        </div>
        <q-btn-toggle
          v-model="val.local_network_adapter"
          class="toggle-button"
          size="10px"
          :disable="val.current_step != 4"
          :toggle-color="getColor(val.local_network_adapter)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="wifi" size="sm" color="primary" /> Adaptador de Rede Wireless
        </div>
        <q-btn-toggle
          v-model="val.wireless_network_adapter"
          class="toggle-button"
          size="10px"
          :disable="val.current_step != 4"
          :toggle-color="getColor(val.wireless_network_adapter)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="headset_mic" size="sm" color="primary" /> Entrada e Saída de Áudio
        </div>
        <q-btn-toggle
          v-model="val.audio_input_and_output"
          class="toggle-button"
          size="10px"
          :disable="val.current_step != 4"
          :toggle-color="getColor(val.audio_input_and_output)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="text-body2 q-py-sm">
          <q-icon name="album" size="sm" color="primary" /> CD ROM
        </div>
        <q-btn-toggle
          v-model="val.cd_rom"
          class="toggle-button"
          size="10px"
          :disable="val.current_step != 4"
          :toggle-color="getColor(val.cd_rom)"
          text-color="primary"
          color="white"
          :options="options"
          unelevated
          no-caps
          rounded
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step4',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    options: [
      {
        label: 'Inexistente',
        value: null
      },
      {
        label: 'Não Funcional',
        value: false
      },
      {
        label: 'Funcional',
        value: true
      }
    ]
  }),
  methods: {
    getColor (v) {
      switch (v) {
        case true:
          return 'secondary'
        case false:
          return 'negative'
        default:
          'primary'
      }
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

<style lang="scss">
  .toggle-button {
    border: 1px solid $primary;
  }


</style>
