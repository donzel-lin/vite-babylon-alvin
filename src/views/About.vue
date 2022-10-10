<template>
  <div class="box">
    <canvas
      id="renderCanvas"
      touch-action="none"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { initFn } from '../utils/Engine'
// import { createGround, createCan, createHouse } from '../utils/CustomeFn-9-23';
// import { createParentAndChild } from '../utils/ParentAndChild';
// import { createScene } from '../utils/ParentAndPivot';
// import { createScene } from '../utils/SetPivot';
// import { createScene, createAnimationWheel } from '../utils/Car';
// import { createScene } from '../utils/CarWithWheel'
// import { createScene } from '../utils/MovingCar';
// import { createScene } from '../utils/MovingCarInVallige';
// import { createScene } from '../utils/chapter2/hill';
// import { createScene } from '../utils/chapter2/Lathe';
import { createScene } from '../utils/chapter2/light'
onMounted(() => {
  console.log('mounted')
  initFn('renderCanvas', createScene)
  // init('renderCanvas', createParentAndChild);
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 500px;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
