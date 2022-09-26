<template>
	<div class="box">
		<canvas id="renderCanvas" touch-action="none"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { init, initFn } from '../utils/Engine';
// import { createGround, createCan, createHouse } from '../utils/CustomeFn-9-23';
// import { createParentAndChild } from '../utils/ParentAndChild';
// import { createScene } from '../utils/ParentAndPivot';
// import { createScene } from '../utils/SetPivot';
import { createScene, createAnimationWheel } from '../utils/Car';
onMounted(() => {
	console.log('mounted');
	initFn('renderCanvas', createAnimationWheel);
	// init('renderCanvas', createParentAndChild);
});
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
