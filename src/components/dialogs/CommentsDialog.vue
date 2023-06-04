<template>
  <q-dialog :position="$q.screen.xs ? 'bottom' : undefined" ref="dialog" @hide="onDialogHide">
    <q-card style="width: 500px" class="bg-white">
      <q-card-section class="text-h6 text-primary q-pb-none">
        <q-icon name="comment" class="q-mr-sm" />
        Lista de Comentários
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div class="row q-col-gutter-sm">
        <q-form class="q-mt-sm col-12" @submit="handleComment">
          <q-editor placeholder="Escreva um novo comentário"  max-height="100px" dense toolbar-bg="primary" toolbar-color="white" toolbar-toggle-color="warning" v-model="commentBody" />
          <q-card-actions align="right">
            <q-btn
              :loading="commentLoading"
              type="submit"
              label="Enviar"
              color="primary"
              icon="send"
              flat
            />
          </q-card-actions>
        </q-form>
          <div class="text-body2 col-12 text-grey-9" v-for="comment in comments" :key="comment.id">
            <q-card flat bordered>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ comment.user.name }}</q-item-label>
                  <q-item-label caption>
                    {{  getLocaleDateString(comment.created_at) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-card-section v-html="comment.body" />
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CommentsDialog',
  props: {
    commentable: {
      type: Object,
      required: true
    },
    commentableType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    commentBody:  '',
    commentLoading: false,
    comments: []
  }),
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('ok', this.comments)
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    getLocaleDateString (date) {
      const dt = new Date(date)

      return dt.toLocaleDateString('pt-br') + ' ' + dt.toLocaleTimeString('pt-br')
    },
    async handleComment () {
      try {
        this.commentLoading = true

        const { data } = await this.$axios.post('comment', {
          body: this.commentBody,
          commentable_id: this.commentable.id,
          commentable_type: this.commentableType
        })
  
        this.$q.notify({
          message: data.message,
          type: 'positive'
        })
  
        this.commentBody = ''

        this.comments.unshift(data.comment)
      } finally {
        this.commentLoading = false
      }
    },
  },
  created () {
    this.comments = [ ...this.commentable.comments ]
    this.comments.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
  }
}
</script>