import { io } from 'socket.io-client'

const connect = () => {
  console.log('connect')
}

export const useIo = (url: string) => {
  const socket = io(url)
  socket.on('connect', connect)
  const sendMsg = (msg: string) => {
    socket.emit('msg', msg)
  }
  return {
    socket,
    sendMsg
  }
}
