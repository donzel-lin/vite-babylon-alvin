<template>
	<div>
		<el-button primary @click="login">点我</el-button>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useLogin } from '../../useFns/useLogin';
const router = useRouter();
const { login } = useLogin(router);
</script>

<style lang="scss" scoped></style>
