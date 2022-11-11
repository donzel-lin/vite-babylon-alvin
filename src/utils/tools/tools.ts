
export const isEmptyString = (value: string): boolean => {
  return value.length === 0
}

export const isZero = (value: number): boolean => {
  return value === 0
}

export const isTrue = (value: any): boolean => {
  if (value === undefined ||
        value === null ||
        value === 0 ||
        value === ''
  ) {
    return true
  } else {
    return false
  }
}
// 首字母大写
export const firstCharUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
