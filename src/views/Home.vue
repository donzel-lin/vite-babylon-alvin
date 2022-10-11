<template>
  <div>
    <p>Home</p>
    <el-button @click="logout">
      退出
    </el-button>
    <trim-input v-model:value="value" />
  </div>
</template>

<script lang="ts" setup>
import TrimInput from '../components/TrimInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin } from '../useFns/useLogin'
const router = useRouter()
const { logout } = useLogin(router)

const value = ref('aa')

</script>

<style lang="scss" scoped></style>
