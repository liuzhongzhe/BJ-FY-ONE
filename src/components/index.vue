<template>
	<div class="index">
		<div style="text-align: center;">
				<el-button @click="toOne" type="primary" style="display: block;margin: 20px auto;">车辆热性能主观评价系统</el-button>
				<el-button @click="toTwo" type="primary" style="display: block;margin: 20px auto;">自然风险评估系统</el-button>
				<div style="background: url(static/bgcar2.jpg);"></div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			toOne() {
				this.$router.push('/SED_index')
			},
			toTwo() {
				this.$router.push('/natural_index')
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.index {
		div {
			span {
				display: block;
				margin: 10px 0;
			}
		}
	}
</style>