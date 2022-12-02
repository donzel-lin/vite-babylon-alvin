
import { io } from 'socket.io-client'
import { IMessageRow } from '../api/types/message'
import { reactive } from 'vue'
import EventListener from '../utils/EventListener'
const connect = () => {
  console.log('connect')
}

export const ioListener = new EventListener()

export const useIo = (url: string) => {
  const socket = io(url, {
    transports: ['websocket']
  })

  socket.on('connect', connect)
  const sendMsg = (msg: IMessageRow) => {
    msgs.push(msg)
    socket.emit('hello', msg)
  }

  const msgs = reactive<IMessageRow[]>([])
  socket.on('answer', (msg: IMessageRow) => {
    msgs.push(msg)
    console.log(msg, 'msg-socket')
    ioListener.trigger<IMessageRow>('answer', msg)
  })

  return {
    socket,
    sendMsg,
    msgs
  }
}
