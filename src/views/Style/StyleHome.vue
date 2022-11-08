<template>
  <div class="wrapper w-full h-full">
    <div
      class="w-full h-full"
      id="canvasBox"
    />
    <div
      class="p-absolute select-com"
      ref="selectRef"
      :style="selectStyle"
    >
      <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        size="small"
        @change="choseMenu"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed, getCurrentInstance } from 'vue'
import { useKonva } from '../../useFns/useKonva'
import { Group } from 'konva/lib/Group'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Text } from 'konva/lib/shapes/Text'
const { createStage, createLayer, createTextGroup } = useKonva()
const layer = createLayer()
const { proxy } = getCurrentInstance()
let textGroup: Group | Shape<ShapeConfig>

onMounted(() => {
  const stage = createStage({
    container: 'canvasBox',
    width: 800,
    height: 800
  })
  textGroup = createTextGroup('啊啊啊啊啊啊')
  layer.add(textGroup)
  stage.add(layer)

  textGroup.on('click', (e) => {
    const group = e.target.parent
    const pos = group?.absolutePosition()
    console.log(group, pos, proxy.$refs)
    selectPosition.x = pos?.x || 0
    selectPosition.y = pos?.y || 0
    selectPosition.show = true
  })
})

const value = ref('')
const selectPosition = reactive({
  x: 0,
  y: 0,
  show: false
})
const selectStyle = computed(() => {
  return {
    left: selectPosition.x + 'px',
    top: selectPosition.y + 'px',
    display: selectPosition.show ? 'block' : 'none'
  }
})
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const choseMenu = () => {
  console.log(value, 'value', textGroup.children[1])
  const text = textGroup.children[1] as Text
  text.setText(value.value)
  selectPosition.show = false
  selectPosition.x = 0
  selectPosition.y = 0
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: relative;
}
.select-com{
    position: absolute;
    width: 100px;
    height: 30px;
    line-height: 30px;
    // visibility: hidden;
}
</style>
