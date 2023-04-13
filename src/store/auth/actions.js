import Vue from 'vue'
import axios from 'axios'

export async function attemptLogin ({ commit }, userCredentials) {
  await axios.get('http://localhost:80/sanctum/csrf-cookie')
  const { data } = await Vue.prototype.$axios.post('login', userCredentials)

  localStorage.setItem('access_token', data.access_token)

  commit('setUser', data.user)

  return data
}

export async function logout ({ commit }) {
  const token = localStorage.getItem('access_token')

  if (token !== null) {
    localStorage.removeItem('access_token')

    await Vue.prototype.$axios
      .post('logout', null, {
        enableLoading: true,
        headers: {
          Authorization: `Bearer ${token}`
        },
        ignoreErrorHandling: true
      })
      .catch(() => {})
  }

  commit('setUser', null)
}