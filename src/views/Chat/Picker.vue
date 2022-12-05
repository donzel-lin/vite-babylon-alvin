<template>
  <Picker
    :data="emojiIndex"
    :show-search="false"
    :show-preview="false"
    :picker-styles="pickerStyle"
    @select="showEmoji"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
const emojiIndex = new EmojiIndex(data)
const emojisOutput = ref('')

const emit = defineEmits(['selectEmoji'])
const showEmoji = (emoji: any) => {
  emojisOutput.value = emojisOutput.value + emoji.native
  emit('selectEmoji', emojisOutput.value)
  emojisOutput.value = ''
}
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const pickerStyle = computed(() => {
  return props.show
    ? null
    : {
        display: 'none'
      }
})
</script>
