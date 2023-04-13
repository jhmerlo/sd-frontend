<template>
  <q-footer class="bg-primary">
    <q-tabs
      :dense="!hideLabels"
      :breakpoint="0"
      align="justify"
      class="bg-primary text-secondary"
      active-color="warning"
    >
      <q-route-tab
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        :label="!hideLabels ? link.label : ''"
        :icon="link.icon"
        :class="['full-width-flex', hideLabels && 'q-pa-none']"
        :exact="link.name === 'home'"
        no-caps
      />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  name: 'MobileFooter',
  props: {
    links: {
      type: Array,
      required: true
    },
    breakpoint: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hideLabels () {
      return this.$q.screen.width < this.breakpoint
    }
  }
}
</script>