import { isZero, isEmptyString } from './tools/tools'

export interface ErrorType {
  message: string | null
  type: string
}

export type ValidateFn = <T>(arg: T) => ErrorType

const errorMessage = {
  isRequired: '不能为空'
}
export const isRequired: ValidateFn = value => {
  let message = null
  if (typeof value === 'string') {
    message = isEmptyString(value) ? null : errorMessage.isRequired
  }
  return {
    message,
    type: 'isRequired'
  }
}
