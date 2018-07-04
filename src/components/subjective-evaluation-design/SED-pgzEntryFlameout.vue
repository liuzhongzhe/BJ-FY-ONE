<template>
	<div class="SED_pgzEntryFlameout">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>测试评估</span>
		</div>
		<div class="chooseSite">
			<img style="width: 320px;height: 240px; background-image: url(../../../static/bgcar2.jpg);">
			<span v-for="(item,index) in xihuoAr" :class="{'active':nowCurrentIndex===index||item.score>0}" style="position: absolute;transition: .2s;" @click="chooseTemperature(item,index)">{{item.name}} 
				<span style="border: none;" v-show="item.score!=0">{{item.score}}</span>
			</span>
		</div>
		<div class="block" style="width: 300px;margin: 10px auto; position: relative;">
			<img src="../../../static/15e.png" style="position: absolute;left:0px; width: 300px;" />
			<el-slider v-model="value2" :max=10 :min=0 :step=0.1 :format-tooltip="formatTooltip"></el-slider>
		</div>
		<div class="button">
			<el-button type="primary" style="width: 120px;" @click="submit">提交</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				siteAr: ['Driver', '1R', '2L', '2R', '3L', '3R'],
				nowCurrentIndex: 0,
				dialogVisible: false,
				value2: 0,
				xihuoAr: [{
						name: '支撑杆护套',
						score: 0
					},
					{
						name: '翼子板',
						score: 0
					},
					{
						name: '后备箱地毯',
						score: 0
					},
					{
						name: '制动液壶盖',
						score: 0
					},
					{
						name: '冷却液壶盖',
						score: 0
					},
					{
						name: '机油标尺',
						score: 0
					},
					{
						name: '保险丝盒',
						score: 0
					},
					{
						name: '机油加注口',
						score: 0
					},
					{
						name: '前舱盖锁头',
						score: 0
					},
					{
						name: '引擎盖',
						score: 0
					}
				]
			}
		},
		created() {},
		methods: {
			submit() {
				this.$router.push('/SED_table')
			},
			chooseTemperature(item, index) {
				this.value2 = item.score
				this.nowCurrentIndex = index
			},
			toReturn() {
				this.$router.go(-1)
			},
			chooseOk() {
				this.$router.push('/SED_table')
			},
			formatTooltip(val) {
				this.$set(this.xihuoAr[this.nowCurrentIndex], 'score', val)
				if (val > 0 && val <= 2) {
					$('.el-slider__bar').css("background", "#0C6FF9")
				} else if (val > 2 && val <= 4) {
					$('.el-slider__bar').css("background", "#02BC05")
				} else if (val > 4 && val <= 6) {
					$('.el-slider__bar').css("background", "#F9B60C")
				} else if (val > 6 && val <= 8) {
					$('.el-slider__bar').css("background", "#F99E0C")
				} else if (val > 8) {
					$('.el-slider__bar').css("background", "#F90C0C")
				}
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	/deep/ .el-slider__button-wrapper,{
		width: 12px;
		height: 12px;
	}
	/deep/ .el-slider__button{
		width: 12px;
		height: 12px;
		position: relative;
		top: 8px;
	}
	.SED_pgzEntryFlameout {
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
		.sliderWrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #ffffff;
			.chooseLevel {
				position: relative;
				top: 20px;
				left: 10px;
				display: inline-block;
			}
		}
		.chooseSite {
			width: 320px;
			height: 240px;
			display: block;
			margin-top: 40px;
			position: relative;
			margin: 0 auto;
			>span {
				font-size: 12px;
				background: #ffffff;
				padding: 2px 5px;
				/*border: 1px solid #409EFF;*/
				&.active {
					background: lightgreen;
				}
				&:nth-child(2) {
					top: 10px;
					left: 0;
				}
				&:nth-child(3) {
					top: 170px;
					left: 0;
				}
				&:nth-child(4) {
					top: 5px;
					right: 30px;
				}
				&:nth-child(5) {
					top: 60px;
					right: 120px;
				}
				&:nth-child(6) {
					top: 60px;
					right: 5px;
				}
				&:nth-child(7) {
					top: 100px;
					right: 110px;
				}
				&:nth-child(8) {
					top: 100px;
					right: 0px;
				}
				&:nth-child(9) {
					top: 130px;
					right: 120px;
				}
				&:nth-child(10) {
					top: 190px;
					right: 70px;
				}
				&:nth-child(11) {
					bottom: 10px;
					left: 70px;
				}
			}
		}
		.button {
			position: fixed;
			bottom: 30px;
			left: 0;
			right: 0;
			text-align: center;
		}
	}
</style>