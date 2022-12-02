
export type listenerFn = <T>(arg: T) => void

export interface listenerParams {
  type: string
  fn: listenerFn
  capture?: boolean
}
export default class EventListener {
  public events: Map<string, listenerFn[]>
  constructor () {
    this.events = new Map()
  }

  /*
    监听事件
    type: 事件名
    fn: 回调函数
    capture: 捕获方式，默认为false,冒泡
  */
  on (params: listenerParams) {
    const { type, fn } = params
    const handler = this.events.get(type) ?? []
    if (handler.length > 0) {
      handler.push(fn)
    } else {
      this.events.set(type, [fn])
    }
  }

  /*
    移除事件
  */
  off (params: listenerParams) {
    const { type, fn } = params
    const handler = this.events.get(type) ?? []
    if (handler.length > 0) {
      const index = handler.findIndex(x => x === fn)
      if (index) {
        handler.splice(index, 1)
      }
    }
  }

  trigger <T>(type: string, params: T) {
    const handler = this.events.get(type) ?? []
    if (handler.length > 0) {
      handler?.forEach(cb => {
        cb(params)
      })
    }
  }
}
