<template>
  <q-page class="bg-grey-2">
    <div class="row q-pa-sm">
      <div class="col-12">
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-h4 text-primary">
              Programa Solidariedade Digital  
            </div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </q-card-section>
          <q-btn @click="getUserInfos" label="Teste" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    async getUserInfos () {
      try {
        this.$q.loading.show()
        await this.$axios.get('user')
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>
