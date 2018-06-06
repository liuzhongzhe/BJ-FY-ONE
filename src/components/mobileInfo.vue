<template>
	<div class="mobileInfo">
		<div class="top" style="z-index: 10;background: #ffffff; text-align: center;position:fixed;top: 0;left: 0;right:0;height:38px;line-height:38px;border-bottom: 1px solid #EEE;">
			<el-button @click="returnBack" style="display: inline-block;height: 34px; line-height: 1px;margin: 2px;position: absolute;left: 0;" >返回</el-button>
			<span>详细信息</span>
		</div>
		<div class="form" style="margin-top: 40px;width: 100%;">
			<h3 style="line-height: 24px;">Title & Author</h3>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Title</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">E2XX_E2LB_MY16_L3T_DCT_AWD_LHD_DSI_Exhaust</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">	
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Department</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">AVD&VI</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">	
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Engineer</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">lzz</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">	
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Date</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">2018-06-05</span>
			</div>
			
			<h3 style="line-height: 24px;">Boundary & Summary</h3>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Product</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">Exhaust Cold End</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Mathdata No.</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">90901172</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Customer Proj.</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">S4</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Engine</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">L3T</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Software</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">ANSYS Fluent 18.2</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">target</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">SP<3.0KPa @125g/s 800℃ Mach number<0.3</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Suppliar</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">Tenneco</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Drawing No.</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">J0901172</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Orderer</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">Li Bo</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Vehicle</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">GEM</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Mesh Quantity</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">XX</span>
			</div>
			<div style="height: 30px;line-height: 30px;border-bottom: 1px solid #eee;display: flex;">
				<span style="display: inline-block;flex:0 85px;background: rgba(245,245,245,0.5);vertical-align: top;">Date</span>
				<span style="display: inline-block;flex: 1;text-align: center; overflow:hidden;">2018-06-05</span>
			</div>
		</div>
		<div class="image">
			<img src="../../static/2.jpg" style="width: 100%;" v-for="item in 5" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			returnBack(){
				this.$router.push({ path: '/mobile' })
			}
		}
	}
</script>

<style>
	.mobileInfo{
		font-size: 12px;
	}
	
</style>