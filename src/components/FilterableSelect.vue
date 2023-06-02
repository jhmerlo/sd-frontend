<template>
  <q-select
    @filter="filterFn"
    v-model="val" 
    :options="opt" 
    :label="label"
    :loading="loading"
    :use-chips="val != ''"
    :option-value="optionValue"
    :option-label="optionLabel"
    :rules="rules"
    lazy-rules
    hide-bottom-space
    emit-value
    map-options
    use-input
    outlined
    dense
  />
</template>

<script>
export default {
  name: 'FilterableSelect',
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    optionValue: {
      type: String,
      required: false,
      default: 'value'
    },
    optionLabel: {
      type: String,
      required: false,
      default: 'label'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    rules: {
      type: Array,
      required: false
    }
  },
  data: () => ({
    opt: []
  }),
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.opt = [...this.options]
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.opt = this.options.filter(v => v[this.optionLabel].toLowerCase().indexOf(needle) > -1)
      })
    },
  }
}
</script>
