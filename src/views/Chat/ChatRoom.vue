<template>
  <div class="chat-room w-full h-full">
    <div class="box bg-gray-100">
      <template
        v-for="message in messages"
        :key="message.id"
      >
        <chat-row :message="message" />
      </template>
    </div>
    <el-button @click="send">
      点我
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useIo } from '../../utils/useIo'
import { reactive } from 'vue'
import { IMessageRow } from '../../api/types/message'
import ChatRow from './ChatRow.vue'
const { sendMsg } = useIo('http://172.19.103.145:3000/')
const send = () => {
  sendMsg('aaa')
}
const messages = reactive<IMessageRow[]>([
  {
    username: 'alvin',
    content: 'asdfasdfasdf',
    avtar: 'aaaa',
    id: '1'
  },
  {
    username: 'poly',
    content: 'poly',
    avtar: 'poly',
    id: '2'
  }
])
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
    height: 600px;
}
</style>
