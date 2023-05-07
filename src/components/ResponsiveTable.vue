<template>
  <div>
    <q-table
      @request="requestProp => $emit('request', requestProp)"
      @update:pagination="val => $emit('update:pagination', val)"
      :title="title"
      :columns="columns"
      :data="data"
      :filter="filter"
      :grid="responsive"
      :pagination="pagination"
      :rows-per-page-options="[10, 20, 30, 40, 50]"
      :loading="loading"
      :flat="flat"
      table-header-class="text-primary"
    >
      <template v-if="responsive" #item="props">
        <q-card
          flat
          bordered
          :class="props.pageIndex === 0 ? 'q-mt-none q-mb-xs' : 'q-my-xs'"
          class="fit"
        >
          <q-list dense class="q-gutter-y-xs q-py-sm">
            <q-item
              v-for="col in propsCols(props)"
              :key="col.name"
              class="q-my-sm"
            >
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
                <q-item-label class="break-word" caption>
                  <slot
                    v-if="mobileSlots.includes(col.name)"
                    :name="`name-${col.name}`"
                    :props="{ ...props, value: col.value, responsive }"
                  />
                  <span v-else>{{ col.value === null ? '-' : col.value }}</span>
                  <q-tooltip
                    v-if="showColTooltip(col)"
                    content-style="font-size: 12px"
                  >
                    <div v-html="getColTooltipText({ col, row: props.row })" />
                  </q-tooltip>
                </q-item-label>
              </q-item-section>
            </q-item>
            <template v-for="col in propsCols(props, true)">
              <q-item v-if="col.label" :key="col.name + '-bottom-1'">
                <q-item-section no-wrap>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item :key="col.name + '-bottom-2'">
                <q-item-section no-wrap>
                  <slot
                    :name="`name-${col.name}-mobile`"
                    :props="{ ...props, responsive }"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card>
      </template>
      <template v-for="slot in tableSlots" #[slot.originalName]="props">
        <component :is="slot.is" :name="slot.originalName" :key="slot.name">
          <slot :name="slot.name" :props="{ ...props, responsive }" />
        </component>
      </template>
      <template #body-cell="{ value, col, row }">
        <q-td :class="col.classes" :style="col.style">
          {{ value === null ? '-' : value }}
          <q-tooltip
            v-if="showColTooltip(col)"
            content-style="font-size: 12px"
            :offset="[0, -10]"
          >
            <div v-html="getColTooltipText({ col, value, row })" />
          </q-tooltip>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { escapeHtml } from 'src/utils'

export default {
  name: 'ResponsiveTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    filter: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    noResponsive: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({
        rowsPerPage: 50
      })
    },
    flat: {
      type: Boolean,
      default: false
    },
    breakpoint: {
      type: String,
      default: 'sm',
      validator: val => ['xs', 'sm', 'md', 'lg', 'xl'].includes(val)
    }
  },
  computed: {
    responsive () {
      return !this.noResponsive && this.$q.screen.lt[this.breakpoint]
    },
    slots () {
      return [...Object.keys(this.$slots), ...Object.keys(this.$scopedSlots)]
    },
    tableSlots () {
      return [
        ...this.headerSlots.map(slot => ({
          is: 'q-th',
          name: slot,
          originalName: slot
        })),
        ...this.desktopSlots.map(slot => ({
          is: 'q-td',
          name: this.formatDesktopName(slot),
          originalName: slot
        }))
      ]
    },
    headerSlots () {
      return this.slots.filter(slot => slot.startsWith('header-'))
    },
    desktopSlots () {
      return this.slots
        .filter(slot => slot.startsWith('name-') && !slot.endsWith('-mobile'))
        .map(slot => slot.replace('name-', 'body-cell-'))
    },
    mobileSlots () {
      const slots = []
      this.slots
        .filter(slot => slot.startsWith('name-'))
        .forEach(slot => {
          if (
            !Object.prototype.hasOwnProperty.call(this.$slots, `${slot}-mobile`)
          ) {
            slots.push(slot.replace('name-', ''))
          }
        })

      return slots.map(slot => slot.replace('name-', ''))
    },
    bottomSlots () {
      return this.slots
        .filter(slot => slot.endsWith('-mobile'))
        .map(slot => slot.replace('-mobile', ''))
    }
  },
  methods: {
    formatDesktopName (slot) {
      return slot.replace('body-cell-', 'name-')
    },
    propsCols (props, mobile = false) {
      return props.cols.filter(
        col => this.bottomSlots.includes('name-' + col.name) === mobile
      )
    },
    showColTooltip (col) {
      return 'tooltip' in col
    },
    getColTooltipText ({ col, value, row }) {
      value ||= col.value
      let result = '-'

      switch (typeof col.tooltip) {
        case 'boolean':
          if (col.tooltip === true) result = value
          break
        case 'string':
          result = col.tooltip
          break
        case 'function':
          result = String(col.tooltip(value, row))
          break
      }

      return escapeHtml(result)
    }
  }
}
</script>