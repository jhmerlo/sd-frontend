<template>
  <q-select
    @filter="filterFn"
    v-model="val" 
    :options="opt" 
    :label="label"
    :loading="loading"
    :use-chips="val != ''"
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
    loading: {
      type: Boolean,
      required: false,
      default: false
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
        this.opt = this.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
  }
}
</script>
