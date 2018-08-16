<template>
	<div class="SED_pgzEntryFlameout">
		<div class="title">
			<span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回 </span>
			<span>测试评估</span>
		</div>
		<div class="chooseSite">
			<img @click="imgClick" style="width: 320px;height: 240px; background-image: url(static/bgcar3.jpg); background-size: 320px 240px;">
			<span v-for="(item,index) in xihuoAr" :class="{'active':nowCurrentIndex===index||item.score>0}" style="position: absolute;transition: .2s;" @click="chooseTemperature(item,index)">{{item.name}}
                <span style="border: none;" v-show="item.score>=0">{{item.score}}</span>
			</span>
			<div>
				<i ref="point" :format-tooltip="formatTooltip" v-show="index === nowCurrentIndex" v-for="(i,index) in 10" style="display: inline-block; width: 7px;height: 7px;border-radius: 50%;background: red;"></i>
			</div>
		</div>
		<div class="block" style="width: 300px;margin: 10px auto; position: relative;">
			<img src="../../../static/15e.png" style="position: absolute;left:0px; width: 300px;" />
			<el-slider v-model="value2" :max=10 :min=-0.5 :step=0.1 :format-tooltip="formatTooltip"></el-slider>
		</div>
		<div class="button">
			<el-button type="primary" @click="modalShow = true" style="width: 120px;">提交</el-button>
		</div>
		<Modal v-model="modalShow" title="提示" @on-ok="submit" @on-cancel="modalShow - false">
			<p>确定提交信息？</p>
		</Modal>
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
				modalShow: false,
				resultObj: {},
				xihuoAr: [{
						name: '支撑杆护套',
						score: -0.5
					},
					{
						name: '翼子板',
						score: -0.5
					},
					{
						name: '后备箱地毯',
						score: -0.5
					},
					{
						name: '制动液壶盖',
						score: -0.5
					},
					{
						name: '冷却液壶盖',
						score: -0.5
					},
					{
						name: '机油标尺',
						score: -0.5
					},
					{
						name: '保险丝盒',
						score: -0.5
					},
					{
						name: '机油加注口',
						score: -0.5
					},
					{
						name: '前舱盖锁',
						score: -0.5
					},
					{
						name: '引擎盖',
						score: -0.5
					}
				]
			}
		},
		created() {

		},
		mounted() {
			this._getData()
			this.aaa()
		},
		methods: {
			imgClick(){
				return
			},
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_tse/thermalPropertyNewDetailsFlameout/${this.$route.params.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if(res.status === 200) {
						this.resultObj = res.data.thermalPropertyNewDetailsFlameoutById
						this.value2 = this.resultObj.supportRodSheath
						this.xihuoAr[0].score = this.resultObj.supportRodSheath
						this.xihuoAr[1].score = this.resultObj.fender
						this.xihuoAr[2].score = this.resultObj.carpets
						this.xihuoAr[3].score = this.resultObj.brakeFluidPpotCover
						this.xihuoAr[4].score = this.resultObj.coolantPotCover
						this.xihuoAr[5].score = this.resultObj.dipstick
						this.xihuoAr[6].score = this.resultObj.fuseBox
						this.xihuoAr[7].score = this.resultObj.fillingPort
						this.xihuoAr[8].score = this.resultObj.frontLockLock
						this.xihuoAr[9].score = this.resultObj.hood
					}
				})
			},
			submit() {
				this.resultObj.supportRodSheath = this.xihuoAr[0].score
				this.resultObj.fender = this.xihuoAr[1].score
				this.resultObj.carpets = this.xihuoAr[2].score
				this.resultObj.brakeFluidPpotCover = this.xihuoAr[3].score
				this.resultObj.coolantPotCover = this.xihuoAr[4].score
				this.resultObj.dipstick = this.xihuoAr[5].score
				this.resultObj.fuseBox = this.xihuoAr[6].score
				this.resultObj.fillingPort = this.xihuoAr[7].score
				this.resultObj.frontLockLock = this.xihuoAr[8].score
				this.resultObj.hood = this.xihuoAr[9].score
				this.axios({
					method: 'post',
					url: `/patac_tse/createThermalPropertyDetailsFlameout`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.resultObj
				}).then((res) => {
					if(res.status === 200) {
						this.$Message.success('操作成功');
						this.$router.push('/SED_table')
					}
				})
			},
			chooseTemperature(item, index) {
				this.value2 = item.score
				this.nowCurrentIndex = index
			},
			aaa(){
				this.$refs.point[this.nowCurrentIndex].style.background = 'red'
                setTimeout(() => {
                    this.$refs.point[this.nowCurrentIndex].style.background = 'yellow'
                    this.bbb()
                }, 500)
			},
			 bbb() {
                this.$refs.point[this.nowCurrentIndex].style.background = 'yellow'
                setTimeout(() => {
                    this.$refs.point[this.nowCurrentIndex].style.background = 'red'
                    this.aaa()
                }, 500)
            },
			toReturn() {
				this.$router.go(-1)
			},
			chooseOk() {
				this.$router.push('/SED_table')
			},
			formatTooltip(val) {
				this.$set(this.xihuoAr[this.nowCurrentIndex], 'score', val)
				if(val > 0 && val <= 2) {
					$('.el-slider__bar').css("background", "#0C6FF9")
				} else if(val > 2 && val <= 4) {
					$('.el-slider__bar').css("background", "#02BC05")
				} else if(val > 4 && val <= 6) {
					$('.el-slider__bar').css("background", "#F9B60C")
				} else if(val > 6 && val <= 8) {
					$('.el-slider__bar').css("background", "rgb(243, 92, 20)")
				} else if(val > 8) {
					$('.el-slider__bar').css("background", "#F90C0C")
				}
				if(val<2&&val>0){
					return val +' 舒适';
				}else if(val<4&&val>2){
					return val +' 温';
				}else if(val<6&&val>4){
					return val +' 温热';
				}else if(val<8&&val>6){
					return val +' 烫';
				}else if(val<=10&&val>8){
					return val +' 烫伤';
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	/deep/ .el-slider__button-wrapper,
	{
		width: 20px;
		height: 20px;
	}
	
	/deep/ .el-slider__button {
		width: 20px;
		height: 20px;
		position: relative;
		top: 8px;
	}
	
	.SED_pgzEntryFlameout {
		/deep/ .el-button {
			padding: 10px 30px;
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
			div {
				>i {
					&:first-child {
						position: absolute;
						top: 15px;
						left: 61px;
					}
					&:nth-child(2) {
						position: absolute;
						top: 155px;
						left: 6px;
					}
					&:nth-child(3) {
						position: absolute;
						top: 12px;
						right: 90px;
					}
					&:nth-child(4) {
						position: absolute;
						top: 85px;
						right: 116px;
					}
					&:nth-child(5) {
						position: absolute;
						top: 80px;
						right: 95px;
					}
					&:nth-child(6) {
						position: absolute;
						top: 107px;
						left: 140px;
					}
					&:nth-child(7) {
						position: absolute;
						top: 92px;
						right: 52px;
					}
					&:nth-child(8) {
						position: absolute;
						top: 117px;
						left: 125px;
					}
					&:nth-child(9) {
						position: absolute;
						top: 176px;
						right: 82px;
					}
					&:nth-child(10) {
						position: absolute;
						bottom: 25px;
						right: 65px;
					}
				}
			}
			>span {
				font-size: 12px;
				background: #ffffff;
				padding: 1px 5px;
				/*border: 1px solid #409EFF;*/
				&.active {
					background: lightgreen;
				}
				&:nth-child(2) {
					top: 40px;
					left: 0;
				}
				&:nth-child(3) {
					top: 125px;
					left: 0;
				}
				&:nth-child(4) {
					top: 5px;
					left: 220px;
					padding-left: 13px;
				}
				&:nth-child(5) {
					top: 55px;
					right: 120px;
				}
				&:nth-child(6) {
					top: 60px;
					right: 20px;
				}
				&:nth-child(7) {
					top: 100px;
					left: 160px;
				}
				&:nth-child(8) {
					top: 105px;
					right: 0px;
				}
				&:nth-child(9) {
					top: 130px;
					right: 140px;
				}
				&:nth-child(10) {
					top: 170px;
					right: 100px;
				}
				&:nth-child(11) {
					bottom: 15px;
					right: 80px;
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