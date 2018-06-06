<template>
	<div class="mobile">
		<div class="top" style="z-index: 10;background: #ffffff; text-align: center;position:fixed;top: 0;left: 0;right:0;height:39px;line-height:38px;border-bottom: 1px solid #EEE;">
			<el-input style="width: 60%;position: absolute;top: 0;right: 0;">
				<el-button icon="el-icon-search" circle @click="" slot="append"></el-button>
			</el-input>
		</div>
		<div class="row">
			<table>
				<tr class="tr_one">
					<td class="id">ID</td>
					<td class="name">任务名称</td>
					<td>所属模块</td>
					<td class="state">任务状态</td>
				</tr>
				<tr v-for="item in 30">
					<td class="id">11</td>
					<td class="name" @click="toInfo">E2XX_E2LB_MY16_L3T_DCT_AWD_LHD_DSI_Exhaust</td>
					<td>底盘排气系统</td>
					<td class="state" style="color: cadetblue ">已创建</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false
			}
		},
		methods: {
			toInfo() {
				this.$router.push({
					path: '/mobileInfo'
				})
			}
		}
	}
</script>

<style>
	.row table{
		width: 100%;
	}
	.row table tr {
		display: flex;
		font-size: 12px;
		height: 40px;
		line-height: 40px;
	}
	
	.row table tr:nth-child(2n) {
		background: rgba(130, 130, 240, 0.2);
	}
	
	.row table tr td {
		flex: 1;
	}
	
	.row table tr .name {
		flex: 0 200px;
		overflow: hidden;
	}
	
	.row table tr .id {
		flex: 0 20px;
		overflow: hidden;
	}
	
	.row table tr .state {
		flex: 0 50px;
		overflow: hidden;
	}
</style>