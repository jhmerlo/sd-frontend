<template>
  <q-layout view="lHh LpR lFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- The Header -->
    <desktop-header
      v-if="$q.screen.gt.sm"
      :username="username"
      :profile-links="profileLinks"
    />

    <mobile-header
      v-else
      :profile-links="profileLinks"
    />

    <!-- The Footer -->
    <mobile-footer
      v-if="$q.screen.lt.md"
      :links="dashboardLinks"
      :breakpoint="550"
    />

    <!-- The Drawer -->
    <desktop-drawer v-if="$q.screen.gt.sm" :links="dashboardLinks" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DesktopHeader from 'components/layouts/DesktopHeader'
import MobileHeader from 'components/layouts/MobileHeader'
import MobileFooter from 'components/layouts/MobileFooter'
import DesktopDrawer from 'components/layouts/DesktopDrawer'
import { attemptLogout } from 'src/utils'

export default {
  name: 'DashboardLayout',
  components: {
    DesktopHeader,
    MobileHeader,
    MobileFooter,
    DesktopDrawer
  },
  computed: {
    user (){
      return this.$store.getters['auth/getUser']
    },
    username () {
      return this.user?.name
    }
  },
  data: () => ({
    dashboardLinks: [
      {
        icon: 'dashboard',
        label: 'Início',
        to: { name: 'Home' }
      },
      {
        icon: 'devices_other',
        label: 'Dispositivos',
        to: { name: 'Devices' }
      },
      {
        icon: 'memory',
        label: 'Componentes',
        to: { name: 'Components' }
      },
      {
        icon: 'list_alt',
        label: 'Empréstimos',
        to: { name: 'Loans' }
      },
      {
        icon: 'groups',
        label: 'Usuários'
      },
      {
        icon: 'qr_code',
        label: 'QR Code',
        to: { name: 'QRCode'}
      }
    ],
    profileLinks: [
      {
        icon: 'settings',
        label: 'Configurações'
      },
      {
        icon: 'logout',
        label: 'Sair',
        onClick: attemptLogout
      }
    ],
    profilePic: null
  }),
  created () {
    console.log(this.username)
  }
}
</script>
