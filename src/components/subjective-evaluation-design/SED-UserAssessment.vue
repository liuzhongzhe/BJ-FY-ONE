<template>
	<div class="SED_UA">
		<div class="chooseSite" v-show="chooseSiteShow">
			<img src="../../../static/bgCar.png"  style="width: 200px;">
		</div>
		<div class="chooseLevel">
			<el-slider
				:format-tooltip="formatTooltip"
			  v-model.number="userLevel"
			  vertical
			  :step="0.1"
			  :min="0"
			  :max="10"
			  height="300px">
			</el-slider>
		</div>
		<div style="display: inline-block;height: 300px;width: 40px;font-size:14px;position: relative;bottom: 50px;">
			<p style="display: block;height: 60px;border-top: 1px solid #000000;">烫伤</p>
			<p style="display: block;height: 60px;border-top: 1px solid #000000;">烫</p>
			<p style="display: block;height: 60px;border-top: 1px solid #000000;">温热</p>
			<p style="display: block;height: 60px;border-top: 1px solid #000000;">温</p>
			<p style="display: block;height: 60px;border-top: 1px solid #000000;">舒适</p>
		</div>
		<div class="button">
			<el-button type="success" style="width: 120px;" @click="chooseOk">确定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				siteAr:['Driver','1R','2L','2R','3L','3R'],
				chooseSiteShow:true,
				siteIndex:-1,
				userLevel:0
			}
		},
		created(){
			this.chooseSiteShow=true
			this.siteIndex=-1
		},
		methods: {
			chooseOk(){
				this.$router.push('/SED_table')
			},
			formatTooltip(val) {
			if(val>0&&val<=2){
				$('.el-slider__bar').css("background","#0C6FF9")
			}else if(val>2&&val<=4){
				$('.el-slider__bar').css("background","#02BC05")
			}else if(val>4&&val<=6){
				$('.el-slider__bar').css("background","#F9B60C")
			}else if(val>6&&val<=7){
				$('.el-slider__bar').css("background","#F99E0C")
			}else if(val>8){
				$('.el-slider__bar').css("background","#F90C0C")
			}
      },
			chooseSite(item,index){
				this.siteIndex=index
			}
		}
	}
</script>

<style lang="scss">
	.el-slider__bar{
		background-color: red;
	}
	.SED_UA {
		.chooseSite{
			display: inline-block;
			margin-top: 40px;
		}
		.chooseLevel{
			position: relative;
			bottom: 10px;
			left: 10px;
			display: inline-block;
		}
		.button{
			position: fixed;
			bottom: 30px;
			left: 0;
			right: 0;
			text-align: center;
		}
	}
</style>