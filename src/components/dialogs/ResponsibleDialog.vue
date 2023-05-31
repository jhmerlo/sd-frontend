<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="manage_accounts" class="q-mr-sm" />
        Alterar Responsável
      </q-card-section>
      <q-card-section class="text-grey-8 text-h6 q-mb-sm">
        <div class="col-12">
          <q-form ref="cForm" @submit="handleSubmit">
            <filterable-select
              label="Responsável"
              v-model="current_step_responsible_id" 
              :options="userOptions" 
            />
            <q-card-actions align="right">
              <q-btn
                type="submit"
                label="Alterar"
                color="primary"
              /> 
            </q-card-actions>
          </q-form>
        </div>          
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'src/utils/rules'
import FilterableSelect from 'components/FilterableSelect'

export default {
  name: 'ResponsibleDialog',
  components: {
    FilterableSelect
  },
  props: ['computer_id'],
  data: () => ({
    current_step_responsible_id: '',
    userOptions: [],
    userOptionsLoading: false
  }),
  methods: {
    required,
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    async getUserOptions () {
      this.$q.loading.show()
      const { data } = await this.$axios.get('user-select-options-index')

      this.userOptions = data.users
      this.$q.loading.hide()
    },
    async handleSubmit () {
      try {
        this.$q.loading.show()
        
        await this.$axios.put('computer/' + this.computer_id + '/responsible', { 
          current_step_responsible_id: this.current_step_responsible_id
        })

        this.$emit('ok')
        this.hide()
      } finally {
        this.$q.loading.hide()
      }
    },
    onCancelClick () {
      this.hide()
    }
  },
  created () {
    this.getUserOptions()
  }
}
</script>