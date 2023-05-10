<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm q-col-gutter-sm">

      <div class="col-12">
        <q-tabs
          outside-arrows
          mobile-arrows
          class="bg-white rounded-borders shadow-1 text-grey-8"
          align="justify"
          active-color="secondary"
          indicator-color="secondary"
        >
          <q-route-tab
            icon="hub"
            label="Placas-Mãe"
            :to="{ name: 'Components.Motherboards'}"
            exact
          />
          <q-route-tab
            icon="developer_board"
            label="Processadores"
            :to="{ name: 'Components.Processors'}"
            exact
          />
          <q-route-tab
            icon="memory"
            label="Memórias RAM"
            :to="{ name: 'Components.RamMemories'}"
            exact
          />
          <q-route-tab
            icon="storage"
            label="Disp. de Armazenamento"
            :to="{ name: 'Components.StorageDevices'}"
            exact
          />
          <q-route-tab
            icon="power"
            label="Alimentações"
            :to="{ name: 'Components.PowerSupplies'}"
            exact
          />
          <q-route-tab
            icon="extension"
            label="GPU's"
            :to="{ name: 'Components.Gpus'}"
            exact
          />
          <q-route-tab
            icon="desktop_windows"
            label="Monitores"
            :to="{ name: 'Components.Monitors'}"
            exact
          />
        </q-tabs>
      </div>

      <div class="col-12">
        <router-view />
      </div>
    </div>

    
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'Components',
}
</script>

<style>

</style>