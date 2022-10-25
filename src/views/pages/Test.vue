<template>
  <div class="box w-full mx-auto">
    <ul>
      <li
        class="item relative"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{
          'is-left': index % 2 === 1
        }"
      >
        <span class="absolute icon">icon</span>
        <div class="blank" />
        <div class="content">
          <div class="body">
            {{ item.name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const list = reactive([
  {
    id: 1,
    name: 'aaasdfasdfafdsasfdasfdasfdasdfasdfasfdafsd阿斯顿发斯蒂芬阿斯顿发送到发送到发三分大赛阿斯顿发发'
  },
  {
    id: 2,
    name: '阿斯顿发斯蒂芬阿斯顿发送到发送到发斯蒂芬阿斯蒂芬阿萨水电费阿斯蒂芬'
  },
  {
    id: 3,
    name: 'aa'
  },
  {
    id: 4,
    name: 'aa'
  },
  {
    id: 5,
    name: 'aa'
  },
  {
    id: 6,
    name: 'aa'
  }
])
</script>
<style lang="scss" scoped>
.icon {
  width: 200px;
  height: 30px;
  line-height: 30px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
}
.content {
  width: 100px;
}
.body {
  width: 100px;
  line-height: 30px;
  font-size: 14px;
  word-break: break-all;
}
.item {
  display: flex;
  .blank {
    width: 50%;
  }
  .content {
    margin-left: 50px;
  }
  &.is-left {
    flex-direction: row-reverse;
    .content {
      margin-left: 0;
      margin-right: 50px;
    }
  }
}
</style>
