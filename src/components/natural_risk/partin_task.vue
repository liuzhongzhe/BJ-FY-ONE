<template>
	<div class="partin_task">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>评估项目</span>
		</div>
		<div class="form">
			<div class="list_title">
				<span>评估区域</span>
				<span>评估结果</span>
				<span>Comment</span>
			</div>
			<div class="list_item">
				<div>
					<span>排气附近可燃物</span>
					<span>
						<el-select v-model="qq">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>发动机油</span>
					<span>
						<el-select v-model="ww">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>变速箱油</span>
					<span>
						<el-select v-model="ee">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>冷却液</span>
					<span>
						<el-select v-model="rr">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>动力转向液</span>
					<span>
						<el-select v-model="tt">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>洗窗液</span>
					<span>
						<el-select v-model="yy">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>制动液</span>
					<span>
						<el-select v-model="uu">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>燃油</span>
					<span>
						<el-select v-model="ii">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>冷冻机油</span>
					<span>
						<el-select v-model="oo">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>变速箱/差速器油</span>
					<span>
						<el-select v-model="pp">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
				<div>
					<span>杂项</span>
					<span>
						<el-select v-model="aa">
							<el-option label="OK" value="shanghai"></el-option>
							<el-option label="NoK" value="beijing"></el-option>
							<el-option label="NA" value="beijing"></el-option>
						</el-select>
					</span>
						<span>
						<el-input></el-input>
					</span>
				</div>
			</div>
			<div style="text-align: center;margin: 10px;">
				<el-button type="primary" style="" @click="submit">提交</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				qq:'',
				ww:'',
				ee:'',
				rr:'',
				tt:'',
				yy:'',
				uu:'',
				ii:'',
				oo:'',
				pp:'',
				aa:'',
			}
		},
		methods: {
			submit(){
				this.$router.push('/natural_risk')
			},
			toReturn() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.partin_task {
		/deep/ .el-button {
			padding: 8px 18px;
		}
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid #ebeef5;
			>.return {
				position: absolute;
				left: 0;
				top: 0;
				padding: 0px 5px;
			}
		}
		>.form {
			>.list_title {
				display: flex;
				border-bottom: 1px solid #e4e4e4;
				>span {
					flex: 1;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
			}
			>.list_item {
				div {
					border-bottom: 1px solid #e4e4e4;
					display: flex;
					/deep/ .el-input__inner {
						border: none;
						border-bottom: none;
					}
					>span {
						flex: 1;
						height: 40px;
						line-height: 40px;
						text-align: center;
						text-align: left;
						text-indent: 10px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>