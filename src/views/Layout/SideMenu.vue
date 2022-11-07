<template>
  <el-menu
    default-active="Home"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <template
      v-for="(menu, index) in menus"
      :key="index"
    >
      <el-sub-menu
        :index="menu.name"
      >
        <template #title>
          <span>{{ menu.name }}</span>
        </template>
        <template v-if="menu.children?.length">
          <template
            v-for="submenu in menu.children"
            :key="submenu.meta.id"
          >
            <template v-if="submenu.children?.length">
              <el-sub-menu :index="submenu.name">
                <template #title>
                  <span>{{ submenu.name }}</span>
                </template>
                <template
                  v-for="childMenu in submenu.children"
                  :key="childMenu.meta.id"
                >
                  <el-menu-item
                    :index="childMenu.name"
                  >
                    {{ childMenu.name }}
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <el-menu-item
              v-else
              :index="submenu.name"
            >
              {{
                submenu.name
              }}
            </el-menu-item>
          </template>
        </template>
        <el-menu-item
          v-else
          :index="menu.name"
        >
          {{ menu.name }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRoutes } from '../../useFns/useRoutes'
import { useUserStore } from '../../stores/userStore'
const menus = useRoutes()
const router = useRouter()
const user = useUserStore()
// 跳转页面
const handleSelect = (name: string) => {
  router.push({
    name
  })
}

// 监听token的变化
watch(
  () => user.token,
  () => {
    if (!user.token) {
      router.push({
        name: 'Login'
      })
    }
  }
)
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
