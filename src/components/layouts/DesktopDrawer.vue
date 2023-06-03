<template>
  <q-drawer
    :value="true"
    :width="110"
    content-class="bg-primary drawer-item"
    side="left"
    behavior="desktop"
  >
    <q-scroll-area class="fit">
      <div class="text-center q-mt-sm q-pt-xs q-mb-md">
        <q-img
          class="cursor-pointer"
          src="~assets/marca_ufes.png"
          width="50px"
        />
      </div>
      <q-tabs
        class="text-secondary"
        indicator-color="transparent"
        content-class="text-white drawer-item"
        active-color="warning"
        vertical
        
      >
        <q-route-tab
          v-for="link in links"
          :key="link.name"
          v-bind="link"
          no-caps
        />
      </q-tabs>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  name: 'DesktopDrawer',
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss">
.drawer-item .q-tab__label {
  font-size: 12px;
}
</style>