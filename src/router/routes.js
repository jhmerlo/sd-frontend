
const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    meta: { guestOnly: true },
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('pages/Login.vue')
      },
      {
        name: 'SignUp',
        path: 'cadastro',
        component: () => import('pages/SignUp.vue')
      },
      {
        name: 'VerifyEmail',
        path: 'verificar-email/:id/:hash',
        props: true,
        component: () => import('pages/VerifyEmail.vue')
      }
    ]
  },
  {
    path: '/painel',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authOnly: true },
    children: [
      { 
        name: 'Home',
        path: 'inicio',
        component: () => import('pages/Index.vue')
      },
      { 
        name: 'Devices',
        path: 'dispositivos',
        component: () => import('pages/Devices.vue')
      },
      { 
        name: 'QRCode',
        path: 'qrcode',
        component: () => import('pages/QRCodeReader.vue') 
      },
      {
        name: 'Maintenance',
        path: 'dispositivos/manutencao/:id',
        component: () => import('pages/Maintenance.vue'),
        props: true
      },
      {
        name: 'Components',
        path: 'componentes',
        redirect: { name: 'Components.Motherboards' },
        component: () => import('pages/Components.vue'),
        children: [
          {
            name: 'Components.Motherboards',
            path: 'placas-mae',
            component: () => import('pages/Motherboards.vue')
          },
          {
            name: 'Components.Processors',
            path: 'processadores',
            component: () => import('pages/Processors.vue')
          },
          {
            name: 'Components.RamMemories',
            path: 'memorias-ram',
            component: () => import('pages/RamMemories.vue')
          },
          {
            name: 'Components.StorageDevices',
            path: 'dispositivos-de-armazenamento',
            component: () => import('pages/StorageDevices.vue')
          },
          {
            name: 'Components.PowerSupplies',
            path: 'fontes-de-alimentacao',
            component: () => import('pages/PowerSupplies.vue')
          },
          {
            name: 'Components.Gpus',
            path: 'gpus',
            component: () => import('pages/Gpus.vue')
          },
          {
            name: 'Components.Monitors',
            path: 'monitores',
            component: () => import('pages/Monitors.vue')
          },
        ]
      },
      {
        name: 'Loans',
        path: 'emprestimos',
        component: () => import('pages/Loans.vue'),
        props: true
      },
      {
        name: 'Borrowers',
        path: 'tomadores-de-emprestimo',
        component: () => import('pages/Borrowers.vue'),
        props: true
      },
      {
        name: 'Users',
        path: 'usuarios',
        meta: { adminOnly: true },
        component: () => import('pages/Users.vue'),
        props: true
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
