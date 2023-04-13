<template>
  <q-header>
    <q-toolbar>
      <q-toolbar-title
        class="q-ml-sm text-white text-uppercase text-subtitle2"
      >
        Programa Solidariedade Digital
      </q-toolbar-title>
      <div>
        <q-btn padding="md" color="grey-8" no-caps flat>
          <span class="text-weight-medium text-white text-caption">
            {{ this.username }}
          </span>
          <q-avatar class="q-ml-sm" size="24px" :icon="avatarIcon">
            <q-img style="width: 100%" v-if="profilePic" :src="profilePic" />
          </q-avatar>
          <q-menu fit square>
            <q-card style="width: 220px" square flat>
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
    username: {
      type: String,
      default: ''
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