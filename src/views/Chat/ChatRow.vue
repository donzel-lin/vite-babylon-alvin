<template>
  <div
    class="w-full pl-10 pr-10 pt-10 flex"
    :class="{
      'flex-row-reverse': message.isHost
    }"
  >
    <div class="avtar rounded-full overflow-hidden bg-green-100" />
    <div
      class="p-relative content p-5"
      :class="{ 'is-host': message.isHost }"
    >
      <p
        class="user-name font-12"
        :class="{
          'text-right': message.isHost
        }"
      >
        {{ message.username }}
      </p>
      <div
        class="body whitespace-pre-wrap pt-5 pb-5 font-16"
        :class="{
          'text-right': message.isHost
        }"
      >
        <message-row
          :type="message.type"
          :content="message.content"
        />
      </div>
      <p class="align-right text-right font-12">
        {{ time }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MessageRow from './MessageRow.vue'
import dayjs from 'dayjs'
import { onMounted, computed } from 'vue'
import { IMessageRow } from '../../api/types/message'
interface message {
    message: IMessageRow
}
const props = defineProps<message>()
const time = computed(() => {
  return props.message.time || dayjs().format('YYYY-MM-DD HH:mm:ss')
})
onMounted(() => {
  console.log(props, 'props')
})
</script>

<style lang="scss" scoped>
.avtar{
  width: 30px;
  height: 30px;
}
.body {
  line-height: 16px;
}
</style>
