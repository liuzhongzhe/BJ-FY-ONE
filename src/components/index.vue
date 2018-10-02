<template>
	<div class="index">
		<div style="text-align: center;">
			<el-button @click="toOne" type="primary" style="width: 200px;display: block;margin: 30px auto;">整车热性能主观评估系统</el-button>
			<el-button @click="toTwo" type="primary" style="width: 200px; display: block;margin: 30px auto;">整车自燃风险评估系统</el-button>
			<el-button @click="toThree" type="success" style="width: 200px; display: block;margin: 30px auto;">动力冷却性能数据查询体统</el-button>
			<el-button @click="toFour" type="success" style="width: 200px; display: block;margin: 30px auto;">人体皮肤接触温度计算系统</el-button>
			<el-button @click="toFive" type="success" style="width: 200px; display: block;margin: 30px auto;">零件温度预测系统</el-button>
			<el-button @click="toSix" type="success" style="width: 200px; display: block;margin: 30px auto;">基础数据库</el-button>
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
			},
			toThree() {
				this.$router.push('/vecp_system')
			},
			toFour() {
				this.$router.push('/carpet_temperature')
			},
			toFive() {
				this.$router.push('/part_temperature')
			},
			toSix() {
				this.$router.push('/calculat_manage')
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
