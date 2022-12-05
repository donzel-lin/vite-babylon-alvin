export const setItem = (key: string, value: object | string | null) => {
  console.log(key, 'key')
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = <T>(key: string) => {
  const value = window.localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value) as T
}

export const removeItem = (key: string) => {
  window.localStorage.setItem(key, 'null')
}
