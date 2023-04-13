import { scroll, Notify } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export const attemptLogout = async vm => {
  await vm.$store.dispatch('auth/logout')
  vm.$router.push({ name: 'Login' })
  
  Notify.create({
    type: 'positive',
    message: 'Logout efetuado com sucesso. Volte sempre!'
  })
  
}

/**
 *
 * @param {Element} ref      Vue ref
 * @param {number}  duration Duration (in milliseconds)
 */
export const scrollToElement = (ref, duration = 250) => {
  const el = ref.$el || ref
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  setScrollPosition(target, offset, duration)
}

/**
 * Creates an array with numbers from 0 to n (n to m if m is a valid number) inclusive
 * @param {number} n couting start
 * @param {number} [m] couting end
 *
 * @returns {Array<number>} Array with numbers from n..m or 0..n
 */
export const getContiguousArray = (n, m) => {
  n >>>= 0
  if (typeof m === 'undefined') [n, m] = [0, n]

  return Array.from({ length: m - n + 1 }, (_, i) => i + n)
}

/**
 * Escapes every html tag that may lead to an XSS attack
 *
 * @param {string|number} unsafe Unsafe string
 * @returns {string} Safe string
 */
export const escapeHtml = unsafe => {
  if (typeof unsafe === 'number') unsafe = String(unsafe)
  if (typeof unsafe !== 'string') return unsafe

  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>')
}

/**
 * Cleans every html tag from a string
 *
 * @param {string} val Unformatted string
 * @returns {string} Formatted string
 */
export const removeHtmlTags = val => {
  return typeof val === 'string'
    ? val.replace(/<[^>]+>|<\/[^>]+>|<br>|\s|&nbsp;/gi, '')
    : null
}

/**
 * Receives an object and returns a formdata object appending every object property on it
 *
 * @param {Object} obj Object
 * @returns {FormData}
 */
export const objectToFormData = obj => {
  const getPrefix = (prefix, key) =>
    prefix + (prefix ? '[' : '') + key + (prefix ? ']' : '')

  const formData = new FormData()

  const appendValue = (prefix, value) => {
    if (typeof value === 'undefined') return
    else if (typeof value === 'boolean') value = value ? '1' : '0'
    else if (value === null) value = ''
    formData.append(prefix, value)
  }

  const fromArray = (_arr, prefix) => {
    for (let i = 0; i < _arr.length; i++) {
      if (Array.isArray(_arr[i])) {
        fromArray(_arr[i], getPrefix(prefix, i))
      } else if (_arr[i] instanceof Object && !(_arr[i] instanceof Blob)) {
        fromObject(_arr[i], getPrefix(prefix, i))
      } else {
        appendValue(getPrefix(prefix, _arr[i]), _arr[i])
      }
    }
  }

  const fromObject = (_obj, prefix = '') => {
    for (const [key, value] of Object.entries(_obj)) {
      if (Array.isArray(value)) {
        fromArray(value, getPrefix(prefix, key))
      } else if (value instanceof Object && !(value instanceof Blob)) {
        fromObject(value, getPrefix(prefix, key))
      } else {
        appendValue(getPrefix(prefix, key), value)
      }
    }
  }

  fromObject(obj)

  return formData
}

/**
 * @param {number} since First year
 * @returns {Array<number>} Array of years since the first year provided
 */
export const arrayOfYearsSince = since => {
  return Array.from(Array(new Date().getFullYear() - since + 1), (_, i) =>
    (i + since).toString()
  ).reverse()
}

/**
 * @param {string} base
 * @param {string} newString
 * @param {string} index
 * @returns {string}
 */
export const addString = (base, newString, index) => {
  return base.slice(0, index) + newString + base.slice(index)
}