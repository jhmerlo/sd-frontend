<template>
  <q-header class="bg-primary text-primary">
    <q-toolbar>
      <q-toolbar-title
        class="text-subtitle2 items-center row no-wrap text-uppercase text-white"
      >
        <div class="ellipsis">
          {{ $q.screen.xs ? 'Solidariedade Digital' : 'Programa Solidariedade Digital' }}
        </div>
      </q-toolbar-title>
      <div>
        <q-btn color="grey-8" no-caps padding="md" flat>
          <q-avatar size="24px" :icon="avatarIcon">
            <q-img v-if="profilePic" :src="profilePic" />
          </q-avatar>
          <q-menu fit square>
            <q-card style="width: 200px" square flat>
              <q-card-section class="q-pa-sm">
                <q-list dense>
                  <q-item
                    v-for="link in profileLinks"
                    @click="() => onClick(link)"
                    :key="link.label"
                    :to="link.to"
                    :class="[link.class]"
                    active-class="text-accent"
                    clickable
                    dense
                  >
                    <q-item-section v-if="link.icon" side>
                        <q-icon :name="link.icon" />
                    </q-item-section>
                    <q-item-section>
                        {{ link.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>

export default {
  name: 'DesktopHeader',
  props: {
    profileLinks: {
      type: Array,
      required: true
    },
    profilePic: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }
  },
  computed: {
    avatarIcon () {
      return this.profilePic ? undefined : 'person'
    }
  },
  methods: {
    onClick ({ onClick }) {
      if (onClick) onClick(this)
    }
  }
}
</script>