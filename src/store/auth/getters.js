export function getUser (state) {
  return state.user
}

export function isClient (state) {
  return state.user?.type === 'Cliente'
}

export function isMaster (state) {
  return state.user?.is_master
}

export function isAdmin (state) {
  return state.user?.role === 'admin'
}

export function isAuthenticated (state) {
  return Boolean(state.user)
}