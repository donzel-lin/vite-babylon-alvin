export type IRuleFn = (value: string) => boolean

export interface formRule1 {
  name: IRuleFn[]
  phone: IRuleFn[]
}
