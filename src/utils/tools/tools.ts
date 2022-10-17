
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
