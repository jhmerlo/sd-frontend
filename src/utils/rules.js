import { date } from 'quasar'

export const getDateTime = timeStamp => {
  if (typeof timeStamp !== 'string') return []
  const [date, time] = timeStamp.split(/[\sT.]/)

  return [date, time]
}

export const required = (val, options, msg) => {
  const defaults = {
    allowZero: false,
    allowEmptyString: false
  }
  const { allowZero, allowEmptyString } = Object.assign(defaults, options)
  msg ??= 'O campo acima é obrigatório.'

  if (typeof val === 'string') return ((allowEmptyString && val === '') || val.trim().length > 0) || msg
  else if (typeof val === 'number') return (allowZero && val === 0) || !!val || msg
  else if (typeof val === 'bigint') return (allowZero && val === 0n) || !!val || msg

  return !!val || msg
}

// eslint-disable-next-line no-useless-escape
export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validEmail = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'Por favor insira um e-mail válido.'

  return (typeof val === 'string' && emailPattern.test(val)) || msg
}

export const sameAs = (val, refVal, options, msg) => {
  msg ??= 'Os valores não coincidem.'
  // Para mais informações, veja https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#parameters
  const defaults = {
    locale: 'pt-BR',
    sensitivity: 'variant'
  }
  const { locale, sensitivity } = Object.assign(defaults, options)

  if (typeof val === 'string') return val.localeCompare(refVal, { locale, sensitivity }) === 0 || msg

  return val === refVal || msg
}

export const minValue = (val, min, options, msg) => {
  const defaults = {
    formatter: n => n
  }
  const { formatter } = Object.assign(defaults, options)
  msg ??= `Não é permitido valor abaixo de ${formatter(min)}.`

  return (typeof val === 'number' && val >= min) || msg
}

export const maxValue = (val, max, options, msg) => {
  const defaults = {
    formatter: n => n
  }
  const { formatter } = Object.assign(defaults, options)
  msg ??= `Não é permitido valor acima de ${formatter(max)}.`

  return (typeof val === 'number' && val <= max) || msg
}

export const minLength = (val, min, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= `Limite mínimo de ${min} caracteres.`

  return (typeof val === 'string' && val.trim().length >= min) || msg
}

export const maxLength = (val, max, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= `Limite máximo de ${max} caracteres.`

  return (typeof val === 'string' && val.trim().length <= max) || msg
}

export const notNegative = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'O valor não pode ser negativo.'

  return (typeof val === 'number' && val >= 0) || msg
}

export const notPositive = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'O valor não pode ser positivo.'

  return (typeof val === 'number' && val < 0) || msg
}

export const minValidAge = (val, min, options, msg) => {
  const defaults = {
    dateMask: 'DD/MM/YYYY'
  }
  const { dateMask } = Object.assign(defaults, options)
  msg ??= `É necessário ter ${min} anos para continuar.`

  return date.subtractFromDate(new Date(), { year: min }) > date.extractDate(val, dateMask) || msg
}

export const validPhone = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'Por favor insira um telefone válido.'

  return (typeof val === 'string' && val.trim().length > 9 && val.trim().length < 12) || msg
}

export const validName = (val, options, msg) => {
  const defaults = {
    minWordLength: 3,
    minWords: 2
  }
  const { minWordLength, minWords } = Object.assign(defaults, options)
  msg ??= 'Por favor, digite nome e sobrenome.'

  return (typeof val === 'string' && val.trim().split(/\s+/).filter(s => s.length >= minWordLength).length >= minWords) || msg
}

export const checkEqualNumbers = (str) => {
  const letter = str.charAt(0)
  for (let i = 1; i < str.length; i++) {
    if (letter !== str.charAt(i)) {
      return false
    }
  }
  return true
}

export const validCPF = (val, options, msg) => {
  const defaults = {
    skipDev: true
  }
  const { skipDev } = Object.assign(defaults, options)
  msg ??= 'Por favor, insira um CPF válido'

  if (skipDev && process.env.DEV) return true

  let sum = 0, mod

  if (typeof val !== 'string' || val.trim().length !== 11 || checkEqualNumbers(val)) return msg

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (11 - i)
  }
  mod = (sum * 10) % 11

  if ((mod === 10) || (mod === 11)) {
    mod = 0
  }

  if (mod !== parseInt(val.substring(9, 10))) return msg

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(val.substring(i - 1, i)) * (12 - i)
  }
  mod = (sum * 10) % 11

  if ((mod === 10) || (mod === 11)) {
    mod = 0
  }
  if (mod !== parseInt(val.substring(10, 11))) return msg

  return true
}

export const validPIS = (val, options, msg) => {
  const defaults = {
    skipDev: true
  }
  const { skipDev } = Object.assign(defaults, options)
  msg ??= 'Por favor, insira um PIS válido'

  if (skipDev && process.env.DEV) return true

  let sum = 0, mod
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  if (
    typeof val !== 'string' ||
    val.length !== 11 ||
    checkEqualNumbers(val)
  ) return msg

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(val.substring(i - 1, i)) * weights[i - 1]
  }
  mod = 11 - sum % 11

  if ((mod === 10) || (mod === 11)) {
    mod = 0
  }

  if (mod !== parseInt(val.substring(10))) return msg

  return true
}

export const validCNPJ = (val, options, msg) => {
  const defaults = {
    skipDev: true
  }
  const { skipDev } = Object.assign(defaults, options)
  msg ??= 'Por favor, insira um CNPJ válido'

  if (skipDev && process.env.DEV) return true

  if (typeof val !== 'string' || val.trim().length !== 14 || checkEqualNumbers(val)) return msg

  let size = val.length - 2
  let numbers = val.substring(0, size)
  const digitos = val.substring(size)
  let sum = 0
  let pos = size - 7

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11
  if (result !== digitos.charAt(0)) return msg

  size = size + 1
  numbers = val.substring(0, size)
  sum = 0
  pos = size - 7

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11
  if (result !== digitos.charAt(1)) return msg

  return true
}

export const validCreditCard = (val, options, msg) => {
  const defaults = {
    skipDev: true
  }
  const { skipDev } = Object.assign(defaults, options)
  msg ??= 'Número do cartão inválido.'

  if (skipDev && process.env.DEV) return true

  if (/[^0-9-\s]+/.test(val)) return msg

  let nCheck = 0, bEven = false
  val = val.replace(/\D/g, '')

  for (var n = val.length - 1; n >= 0; n--) {
    var cDigit = val.charAt(n),
      nDigit = parseInt(cDigit, 10)

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9
    nCheck += nDigit
    bEven = !bEven
  }
  return ((nCheck % 10 === 0) && (nCheck !== 0)) || msg
}

export const validDate = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'Por favor, insira uma data válida.'

  return (typeof val === 'string' && date.isValid(val)) || msg
}

export const validCNH = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'CNH inválida.'

  return (typeof val === 'string' && val.trim().length === 11) || msg
}

export const validTime = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'Não é uma hora válida.'

  if (typeof val !== 'string' || val.match(/^\d{1,2}:\d{1,2}$/) === null) return msg

  const [hours, mins] = val.split(':').map(t => t >>> 0)

  return (hours < 24 && mins < 60) || msg
}

export const noPastDate = (val, options, msg) => {
  const defaults = {
    appendTime: true,
    dateMask: 'DD/MM/YYYY 00:00:00'
  }
  const { appendTime, dateMask } = Object.assign(defaults, options)
  msg ??= 'A data não pode ser anterior.'

  if (appendTime) val += ' 00:00:00'
  const dateVal = date.extractDate(val, dateMask)

  const diff = date.getDateDiff(dateVal, new Date(), 'days')

  return (typeof val === 'string' && diff >= 0) || msg
}

export const noFutureDate = (val, options, msg) => {
  const defaults = {
    appendTime: true,
    dateMask: 'DD/MM/YYYY 00:00:00'
  }
  const { appendTime, dateMask } = Object.assign(defaults, options)
  msg ??= 'A data não pode ser futura.'

  if (appendTime) val += ' 00:00:00'
  const dateVal = date.extractDate(val, dateMask)

  const diff = date.getDateDiff(dateVal, new Date(), 'days')

  return (typeof val === 'string' && diff <= 0) || msg
}

export const greaterThanDate = (val, ref, msg) => {
  msg = msg ?? 'A data 1 precisa ser maior que a data 2'
  if (typeof val !== 'string') return msg

  let [date1] = getDateTime(val)
  date1 = date.extractDate(`${date1} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
  let [date2] = getDateTime(ref)
  date2 = date.extractDate(`${date2} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
  return date1 > date2 || msg
}

export const methods = {
  required,
  validEmail,
  sameAs,
  minValue,
  maxValue,
  minLength,
  maxLength,
  notNegative,
  notPositive,
  minValidAge,
  validPhone,
  validName,
  validCPF,
  validPIS,
  validCNPJ,
  validCreditCard,
  validDate,
  validCNH,
  validTime,
  noPastDate,
  noFutureDate,
  greaterThanDate
}