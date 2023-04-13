
const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('pages/Login.vue')
      },
      {
        name: 'SignUp',
        path: '/cadastro',
        component: () => import('pages/SignUp.vue')
      },
      {
        name: 'VerifyEmail',
        path: '/verificar-email/:id/:hash',
        props: true,
        component: () => import('pages/VerifyEmail.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authOnly: true },
    children: [
      { 
        name: 'Home',
        path: '/inicio',
        component: () => import('pages/Index.vue') 
      },
      { 
        name: 'Devices',
        path: '/dispositivos',
        component: () => import('pages/Devices.vue') 
      },
      { 
        name: 'QRCode',
        path: '/qrcode',
        component: () => import('pages/QRCodeReader.vue') 
      }
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
