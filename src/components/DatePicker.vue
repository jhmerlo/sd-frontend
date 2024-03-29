<template>
  <q-input
    ref="input"
    v-model="val"
    :label="label"
    :placeholder="placeholder"
    :rules="getRules"
    :disable="disable"
    :outlined="outlined"
    :filled="filled"
    :lazy-rules="lazyRules"
    :hide-bottom-space="hideBottomSpace"
    :debounce="debounce"
    :dense="dense"
    mask="##/##/####"
    class="cursor-pointer"
  >
    <template v-slot:append>
      <q-btn
        flat
        text-color="primary"
        icon="event"
        round
        @click.self="() => $refs.date.show()"
      >
        <q-popup-proxy ref="date" transition-show="scale" transition-hide="scale">
          <q-date color="primary" text-color="white" :value="val" mask="DD/MM/YYYY" @input="setDate" />
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar'
import { validDate, noFutureDate, noPastDate } from 'src/utils/rules'

const formatDateVal = (val) => {
  if (typeof val !== 'string') return null

  return /^\d{2}\/\d{2}\/\d{4}$/.test(val)
    ? val.split('/').reverse().join('-')
    : val
}

export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    noFutureDate: {
      type: Boolean,
      default: false
    },
    noPastDate: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    filled: {
      type: Boolean,
      default: false
    },
    hideBottomSpace: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    defaultDate: {
      type: Boolean,
      default: false
    },
    dense: Boolean,
    debounce: Number,
    label: String,
    placeholder: String,
    disable: Boolean,
    lazyRules: Boolean
  },
  mounted () {
    if (this.defaultDate && !this.value) {
      this.val = new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    val: {
      get () {
        return this.value.split('-').reverse().join('/')
      },
      set (val) {
        this.$emit('input', val.split('/').reverse().join('-'))
      }
    },
    getRules () {
      const rules = [val => !val || validDate(formatDateVal(val))]

      if (this.noFutureDate) {
        rules.push(val => !val || noFutureDate(formatDateVal(val)))
      }

      if (this.noPastDate) {
        rules.push(val => !val || noPastDate(formatDateVal(val)))
      }

      return [...this.rules, ...rules]
    }
  },
  methods: {
    setDate (timestamp) {
      try {
        const timestampFormat = 'DD/MM/YYYY HH:mm:ss'
        const currentDate = new Date().getTime()
        const selectedDate = date.extractDate(`${timestamp} 00:00:00`, timestampFormat).getTime()
        if (this.noFutureDate && selectedDate > currentDate) {
          return this.$q.notify({
            color: 'grey-8',
            textColor: 'white',
            message: 'Não é possível selecionar uma data futura'
          })
        }
        if (this.noPastDate && selectedDate < currentDate) {
          return this.$q.notify({
            color: 'grey-8',
            textColor: 'white',
            message: 'Não é possível selecionar uma data passada'
          })
        }
        this.val = timestamp
        this.$refs.date.hide()
      } catch (err) {
        this.$q.notify({
          color: 'grey-8',
          textColor: 'white',
          icon: 'warning',
          message: 'A data informada não é válida'
        })
      }
    },
    validate () {
      return this.$refs.input.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>