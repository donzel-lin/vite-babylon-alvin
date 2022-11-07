<template>
  <div>
    <div
      class="code-box"
      id="codeBox"
    />
    <el-button @click="getCode">
      点我
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const getCode = () => {
  const url = encodeURIComponent('https://haibao88.com/#/home')
  // const url = encodeURIComponent('http://127.0.0.1:5173/#/product/product-list')
  console.log(url, 'href')
  // eslint-disable-next-line no-undef, no-new
  new WxLogin({
    self_redirect: true,
    id: 'codeBox',
    appid: 'wx63c18ec5cf76e9a2',
    scope: 'snsapi_login',
    redirect_uri: url,
    state: '1'
    // style: 'black',
    // href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE4MHB4O21hcmlnbi10b3A6LThweH0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge2Rpc3BsYXk6IG5vbmU7fQ=='
  })
}
</script>

<style lang="scss" scoped>
.code-box {
  width: 200px;
  height: 500px;
}
</style>
