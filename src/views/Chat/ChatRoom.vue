<template>
  <div class="chat-room w-full h-full">
    <div class="h-3/5">
      <el-scrollbar class="bg-gray-100 ">
        <div>
          <template
            v-for="message in messages"
            :key="message.id"
          >
            <chat-row :message="message" />
          </template>
        </div>
      </el-scrollbar>
    </div>

    <div class="input-section relative  h-2/5">
      <el-input
        class="h-full"
        placeholder="请输入"
        type="textarea"
        resize="none"
        v-model="inputValue"
      />
      <div
        class="absolute picker"
        v-click-outside="closeEmoji"
      >
        <span
          class="emoji-span"
          @click="inputEmoji"
        >表情</span>
        <picker
          :show="showEmoji"
          @select-emoji="selectEmoji"
        />
      </div>
      <el-button
        class="absolute  submit-btn"
        @click="send"
      >
        点我
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatRow from './ChatRow.vue'
import Picker from './Picker.vue'

import { useIo } from '../../useFns/useIo'
import { computed, ref } from 'vue'

const inputValue = ref('')
const { sendMsg, msgs } = useIo('ws://172.19.103.145:3000/')
const send = () => {
  sendMsg({
    username: 'alvin',
    content: inputValue.value,
    avtar: 'aaaa',
    id: '1',
    isHost: true,
    type: 'text'
  })
  inputValue.value = ''
}
const messages = computed(() => {
  return msgs
})

const showEmoji = ref(false)

const inputEmoji = () => {
  showEmoji.value = !showEmoji.value
}
const closeEmoji = () => {
  if (showEmoji.value) {
    showEmoji.value = false
  }
}
const selectEmoji = (emoji: string) => {
  inputValue.value += emoji
}
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
    height: 550px;
}
.input-section{
  height: 100px;
  .submit-btn{
    right: 0;
    bottom: 0;
  }
}
.picker{
  bottom: 0;
  right: 60px;
  .emoji-span{
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
}
:deep(.input-section) {
  .el-textarea__inner {
    height: 100%;
  }
}
</style>
