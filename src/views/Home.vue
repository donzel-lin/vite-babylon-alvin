<template>
  <div class="h-full">
    <p>Home</p>
    <el-button @click="logout">
      退出
    </el-button>
    <trim-input v-model:value="value" />
    <div class="w-full h-52 bg-blue-500 overflow-auto">
      <el-scrollbar>
        <div class="w-full h-96 bg-red-500 " />
        <div
          class="w-full h-96 target"
          id="target"
        >
          <h1>哈哈哈</h1>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TrimInput from '../components/TrimInput.vue'
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '../useFns/useIntersection'
import { useRouter } from 'vue-router'
import { useLogin } from '../useFns/useLogin'
const router = useRouter()
const { logout } = useLogin(router)

const value = ref('aa')

onMounted(() => {
  // intersection observer
  const intersectionObserver = useIntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return
    // .target 目标元素 进入 视窗
    console.log('load img')
  })
  const el = document.querySelector('.target')
  intersectionObserver.observe(el!)
})

</script>

<style lang="scss" scoped></style>
