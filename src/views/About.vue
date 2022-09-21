<template>
	<div class="box">
		<canvas id="renderCanvas" touch-action="none"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { init } from '../utils/Engine';
import { createGround, createCan, createHouse } from '../utils/CustomeFn';
onMounted(() => {
	console.log('mounted');
	init('renderCanvas', createHouse);
});
</script>

<style lang="scss" scoped>
.box {
	width: 500px;
	height: 500px;
	canvas {
		width: 100%;
		height: 100%;
	}
}
</style>
