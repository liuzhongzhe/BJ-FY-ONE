<template>
	<div class="SED_zzzEntry">
		<div class="title">
			<span class="return" @click="toReturn">
				<i class="el-icon-arrow-left"></i>返回 </span>
			<span>实测录入</span>
		</div>
		<div class="sec">
			<span>油门附近地毯</span>
			<el-input v-model="pro.valueOne">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec">
			<span>一排右侧地毯</span>
			<el-input v-model="pro.valueTwo">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec">
			<span>二排左侧地毯</span>
			<el-input v-model="pro.valueThree">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec">
			<span>二排右侧地毯</span>
			<el-input v-model="pro.valueFour">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec">
			<span>三排左侧地毯</span>
			<el-input v-model="pro.valueFive">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec">
			<span>三排右侧地毯</span>
			<el-input v-model="pro.valueSix">
				<span slot="append">℃</span>
			</el-input>
		</div>
		<div class="sec" style="text-align: center;">
			<el-button type="primary" style="width: 120px;" @click="inputOK">提交</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				resultObj: {},
				msgState: true,
				pro: {
					valueOne: '',
					valueTwo: '',
					valueThree: '',
					valueFour: '',
					valueFive: '',
					valueSix: ''
				}
			}
		},
		mounted() {
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_tse/thermalPropertyDetailsMeasure/${this.$route.params.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.status === 200) {
						this.resultObj = res.data.thermalPropertyDetailsMeasureByByAssessId[0]
						this.pro.valueOne = this.resultObj.temDriver
						this.pro.valueTwo = this.resultObj.tem1R
						this.pro.valueThree = this.resultObj.tem2L
						this.pro.valueFour = this.resultObj.tem2R
						this.pro.valueFive = this.resultObj.tem3L
						this.pro.valueSix = this.resultObj.tem3R
					}
				})
			},
			inputOK() {
				for (let i in this.pro) {
					if (this.pro[i]) {
						let val = this.pro[i]
						var regPos = /^\d+(\.\d+)?$/; //非负浮点数
						var regNeg =
							/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
						if (regPos.test(val) || regNeg.test(val)) {} else {
							if (this.msgState) {
								this.msgState = false
								this.$Message.error('非数字');
								setTimeout(() => {
									this.msgState = true
								}, 1500)
							}
							return
						}
						if (Number(this.pro[i]) > 120) {
							if (this.msgState) {
								this.msgState = false
								this.$Message.error('请勿输入超过120的数值');
								setTimeout(() => {
									this.msgState = true
								}, 1500)
							}
							return
						}
						if (Number(this.pro[i]) < 20) {
							if (this.msgState) {
								this.msgState = false
								this.$Message.error('请勿输入小于20的数值');
								setTimeout(() => {
									this.msgState = true
								}, 1500)
							}
							return
						}
					}
				}
				this.resultObj.temDriver = this.pro.valueOne
				this.resultObj.tem1R = this.pro.valueTwo
				this.resultObj.tem2L = this.pro.valueThree
				this.resultObj.tem2R = this.pro.valueFour
				this.resultObj.tem3L = this.pro.valueFive
				this.resultObj.tem3R = this.pro.valueSix
				this.axios({
					method: 'post',
					url: `/patac_tse/createThermalPropertyDetailsMeasure`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.resultObj
				}).then((res) => {
					if (res.status === 200) {
						this.$Message.success('操作成功');
						this.$router.push('/SED_table')
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
	.SED_zzzEntry {
		/deep/ .el-button {
			padding: 10px 30px;
		}
		/deep/ .el-input-group__append {
			padding: 0 6px;
		}
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid rgb(231, 231, 231);
			>.return {
				position: absolute;
				left: 0;
				top: 0;
				padding: 0px 5px;
			}
		}
		>.sec {
			width: 280px;
			margin: 10px auto;
			>span {
				display: inline-block;
				width: 100px;
				font-size: 14px;
				text-align: right;
				line-height: 32px;
				vertical-align: bottom;
			}
			.el-input {
				width: 170px;
				margin-left: 5px;
			}
			/deep/ .el-input__inner {
				height: 32px;
				line-height: 32px;
			}
		}
	}
</style>
