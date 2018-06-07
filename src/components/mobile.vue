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
				</tr>
				<tr v-for="item in listInfo">
					<td class="id">{{item.id}}</td>
					<td class="name" @click="toInfo">{{item.name}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				currentParams: {
					page: 1,
					size: 40
				},
				listInfo:[]
			}
		},
		mounted() {
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: '/api/tasks',
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: this.currentParams
				}).then((res) => {
					if(res.status === 200) {
						this.listInfo=res.data
					}
				})
			},
			toInfo() {
				this.$router.push({
					path: '/mobileInfo'
				})
			}
		}
	}
</script>

<style>
	.row table {
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
		flex: 1;
		overflow: hidden;
		text-align: left;
		text-indent: 10px;
	}
	
	.row table tr .id {
		flex: 0 30px;
		overflow: hidden;
	}
</style>