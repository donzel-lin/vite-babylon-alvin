<template>
  <div class="w-full pl-10 pt-5">
    <div class="avtar" />
    <div class="p-relative content p-5">
      <p class="user-name font-12">
        {{ message.username }}
      </p>
      <div class="body p-5 font-16">
        {{ message.content }}
      </div>
      <p class="align-right fnt-12">
        shijian
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { IMessageRow } from '../../api/types/message'
interface message {
    message: IMessageRow
}
const props = defineProps<message>()
onMounted(() => {
  console.log(props, 'props')
})
</script>

<style lang="scss" scoped>

</style>
