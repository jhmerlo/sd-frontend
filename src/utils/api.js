import Vue from 'vue'
import { Notify } from 'quasar'

import VerifyEmailDialog from 'components/dialogs/VerifyEmailDialog'

export const handleErrors = async (
  error,
  { router, store, customErrorHandlers }
) => {
  if (!window.navigator?.onLine) {
    Notify.create({
      type: 'alert',
      message: 'Sem conexão com a internet.'
    })

    return Promise.reject(error)
  }

  if (!error.response || typeof error.response !== 'object') {
    Notify.create({
      type: 'alert',
      message: 'Problemas de conexão, por favor tente mais tarde.'
    })

    return Promise.reject(error)
  }

  const defaultErrorHandlers = {
    401: async data => {
      await store.dispatch('auth/logout')

      const message = data.message

      const unverifiedEmail = message.includes('E-mail não verificado')

      if (unverifiedEmail) {
        let email = ''
        try {
          const data = JSON.parse(error.config.data)
          email = data.email
        } finally {
          Vue.prototype.$q.dialog({
            component: VerifyEmailDialog,
            email
          })
        }
      } else {
        Vue.prototype.$q.notify({
          type: 'alert',
          message: data.message
        })
        router.push({ name: 'Login' })
      }
    },
    403: async (data) => {
      if (
        typeof data.message === 'string' &&
        data.message.match('termos de serviço')
      ) {
        const { data } = await Vue.prototype.$axios.get(
          'term-of-service/active'
        )
      }
      router.replace({ name: 'Login' })
      Vue.prototype.$q.notify({
        type: 'alert',
        message: data.message 
      })
    },
    404: data => {
      Vue.prototype.$q.notify({
        type: 'alert',
        message: data.message
      })
    },
    400: data => {
      if (data.errors) {
        const errors = Object.values(data.errors).flat()
        Vue.prototype.$q.notify({
          type: 'alert',
          message: errors.shift()
        })
      } else if (data.message) {
        Vue.prototype.$q.notify({
          type: 'alert',
          message: data.message
        })
      } else {
        Vue.prototype.$q.notify({
          type: 'alert',
          message: 'Problema na requisição.'
        })
      }
    },
    429: (/* data */) => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message:
          'Você está realizando muitas ações em um curto período de tempo, por favor tente novamente mais tarde.'
      })
    },
    500: (/* data */) => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message:
          'Não foi possível realizar esta ação no momento. tente novamente mais tarde.'
      })
    }
  }

  const errorHandler = { ...defaultErrorHandlers }

  Object.assign(errorHandler, customErrorHandlers)

  const { status, data } = error.response

  return (
    (errorHandler[status] && (await errorHandler[status](data))) ||
    Promise.reject(error)
  )
}