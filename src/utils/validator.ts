import { isZero, isEmptyString } from './tools/tools'

interface ErrorType {
  message: string | null
  type: string
}

type ValidateFn = <T>(arg: T) => ErrorType

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
