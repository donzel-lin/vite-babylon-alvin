<template>
  <el-container class="wrapper w-full h-full">
    <el-header class="border-solid border-2 rounded-2 border-light-blue-500">
      <tool-bar />
    </el-header>
    <el-container class="w-full h-full relative p-t-0 p-l-0 p-t-0">
      <el-aside
        class="h-full"
        width="200px"
      >
        <side-bar />
      </el-aside>
      <el-main class="w-full h-full bg-gray-100">
        <div
          class="relative"
          id="canvasBox"
          @dragover="dragOver"
          @drop="drop"
        />
      </el-main>
      <div
        class="p-absolute select-com"
        ref="selectRef"
        :style="selectStyle"
      >
        <el-select
          v-model="selectValue"
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
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import ToolBar from './ToolBar.vue'
import SideBar from './SideBar.vue'
import { onMounted, ref, reactive, computed } from 'vue'
import { useKonva } from '../../useFns/useKonva'
import { Group } from 'konva/lib/Group'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Text } from 'konva/lib/shapes/Text'
import Konva from 'konva'
import { Stage } from 'konva/lib/Stage'
const { createStage, createLayer, createTextGroup, tooltip, createEditableText } = useKonva()
const layer = createLayer()
const tooltipPlayer = createLayer()
let stage: Stage
let currentTextGroup: Group | Shape<ShapeConfig> | null
let currentTransfer: Konva.Transformer | null
// 标题提示语
const textGroups: (Group | Shape<ShapeConfig>)[] = []
onMounted(() => {
  stage = createStage({
    container: 'canvasBox',
    width: 800,
    height: 650
  })
  const handleSelect = (textGroup: Group | Shape<ShapeConfig>) => {
    if (currentTransfer) currentTransfer.destroy()
    currentTransfer = new Konva.Transformer({
      nodes: [textGroup],
      keepRatio: true,
      enabledAnchors: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ]
    })
    layer.add(currentTransfer)
  }
  for (let i = 0; i < 2; i++) {
    const _text = i % 3 === 0
      ? `用户a${i + 1}`
      : `用户阿斯顿发的说法阿斯顿发斯蒂芬${i + 1}`
    const textGroup = createTextGroup(_text)
    layer.add(textGroup)

    textGroup.on('dblclick', (e) => {
      const group = e.target.parent
      const pos = group?.absolutePosition()
      const textValue = textGroup.children[1].attrs.text
      selectValue.value = textValue
      selectPosition.x = pos?.x || 0
      selectPosition.y = pos?.y || 0
      selectPosition.show = true
      currentTextGroup = textGroup
    })
    textGroup.on('dragstart', () => handleSelect(textGroup))
    textGroup.on('click', () => handleSelect(textGroup))
    textGroup.on('mousemove', e => {
      const mousePos = stage.getPointerPosition()
      tooltip.position({
        x: mousePos?.x - 5,
        y: mousePos?.y - 25
      })
      tooltip.text(_text)
      tooltip.show()
    })
    textGroup.on('mouseout', e => {
      tooltip.hide()
    })
    textGroups.push(textGroup)
  }
  stage.on('click', (e) => {
    if (e.target.index === 0) {
      currentTransfer?.destroy()
    }
  })
  stage.on('dragover', (e) => {
    console.log('dragover')
  })
  tooltipPlayer.add(tooltip)
  stage.add(layer)
  stage.add(tooltipPlayer)
})

const selectValue = ref('')
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
  const text = currentTextGroup?.children[1] as Text
  text.setText(selectValue.value)
  selectPosition.show = false
  setTimeout(() => {
    selectPosition.x = 0
    selectPosition.y = 0
  }, 300)
}

const dragOver = (e) => {
  e.preventDefault()
}
const drop = (e) => {
  e.preventDefault()
  const type = e.dataTransfer.getData('type')
  createEditableText({
    layer,
    stage,
    x: e.layerX,
    y: e.layerY,
    text: 'aaaa'
  })
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
}
::v-deep {
  .select-com {
    .el-select {
      vertical-align: text-bottom;
    }
    .el-input__wrapper {
      padding: 0 7px;
    }
    .el-input__inner {
      line-height: 30px;
      height: 30px;
    }
  }
  .edit-textarea{
    display: inline-block;
    line-height: 30px;
    vertical-align: middle;
  }
}
</style>
