<template>
	<div class="container mx-auto w-full h-full">
		<Header></Header>
		<div class="content flex">
			<div class="side-bar h-full">
				<side-menu></side-menu>
			</div>
			<div class="flex-1">
				<empty-view></empty-view>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script lang="ts" setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
import EmptyView from './EmptyView.vue';
import SideMenu from './SideMenu.vue';
</script>

<style lang="scss" scoped>
.content {
	height: calc(100% - 8rem);
}
</style>
