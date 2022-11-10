import { RouteRecordRaw } from 'vue-router'
export const SocketRoute: RouteRecordRaw = {
  name: 'chatRoom',
  path: '/chat-room',
  component: import('../../views/Chat/ChatRoom.vue'),
  meta: {
    id: 11,
    parentId: 1,
    requireAuth: true
  }
}
