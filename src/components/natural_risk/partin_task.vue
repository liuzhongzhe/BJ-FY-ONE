<template>
	<div class="partin_task">
		<div class="title">
			<span class="return" @click="toReturn">
				<i class="el-icon-arrow-left"></i>返回 </span>
			<span>评估项目</span>
		</div>
		<div class="form">
			<div class="list_title">
				<span>评估区域</span>
				<span>评估结果</span>
				<span>Comment</span>
			</div>
			<div class="list_item">
				<div v-for="item in form">
					<span>{{item.evaarea}}</span>
					<span>
						<el-select v-model="item.evaresult">
							<el-option label="OK" value="EVA_RESILT_PASS"></el-option>
							<el-option label="NoK" value="EVA_RESILT_UNPASS"></el-option>
							<el-option label="NA" value="EVA_RESILT_NORMAL"></el-option>
						</el-select>
					</span>
					<span>
						<el-input v-model="item.momo"></el-input>
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
		data() {
			return {
				form: [
					{
						"evaarea": "排气附近可燃物",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "变速箱/差速器油",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "动力转向液",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "发动机油",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "变速箱油",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "冷冻机油",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "冷却液",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "洗窗液",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "制动液",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "燃油",
						"evaresult": "",
						"momo": "",
					},
					{
						"evaarea": "杂项",
						"evaresult": "",
						"momo": "",
					},
				],
				msgState:true
			}
		},
		methods: {
			submit() {
				for(let i in this.form){
					if(!this.form[i].evaresult){
						if(this.msgState){
							this.msgState=false
							this.$Message.error('请将表单填写完整');
							setTimeout(()=>{
								this.msgState=true
							},1500)
						}
						return;
					}
					if(this.form[i].evaresult === "EVA_RESILT_UNPASS" && !this.form[i].momo){
						if(this.msgState){
							this.msgState=false
							this.$Message.error('请填写Nok对应comment');
							setTimeout(()=>{
								this.msgState=true
							},1500)
						}
						return;
					}
				}
				this.axios({
					method: 'post',
					url: `/patac_ras/proinfo/submit/`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: {
						"evainfos":this.form,
						"proinfo": {
							"id": this.$route.params.id
						}

					}
				}).then((res)=>{
					if(res.data.code === 0){
						this.$Message.success('提交成功');
						this.$router.push('/natural_risk')
					}else{
						this.$Message.error(res.data.msg);
						return
					}
				})
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
			padding: 10px 30px;
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
						text-indent: 10px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
