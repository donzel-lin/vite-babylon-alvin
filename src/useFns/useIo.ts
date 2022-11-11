import { io } from 'socket.io-client'
import { IMessageRow } from '../api/types/message'
import { reactive } from 'vue'
const connect = () => {
  console.log('connect')
}

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
  socket.on('answer', (msg) => {
    msgs.push(msg)
  })

  return {
    socket,
    sendMsg,
    msgs
  }
}
