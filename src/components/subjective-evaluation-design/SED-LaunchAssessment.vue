<template>
	<div class="SED_LA">
		<div class="title">
			<span class="return" @click="toReturn"><i class="el-icon-arrow-left"></i>返回	</span>
			<span>发起评估</span>
		</div>
		<div class="sec">
			<span>评估日期</span>
			<div class="block" style="display: inline-block; width: 60%;">
				<el-date-picker style="width: 100%"  v-model="valueTime" type="date" placeholder="选择日期">
				</el-date-picker>
			</div>
		</div>
		<div class="sec">
			<span>车辆编号</span>
			<el-input style="display: inline-block; width: 60%;"></el-input>
		</div>
		<div class="sec">
			<span>评估工况</span>
			<el-select v-model="valueOne" placeholder="请选择" style="display: inline-block;  width: 60%;">
				<el-option v-for="item in optionsOne" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="sec">
			<span>空调模式</span>
			<el-select v-model="valueTwo" placeholder="请选择" style="display: inline-block; width: 60%;" @change="ktModelChange(valueTwo)">
				<el-option v-for="item in optionsTwo" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<!--default状态-->
		<el-collapse-transition>
			<div v-show="defaultShow">
				<div class="sec">
					<span>出风温度</span>
					<el-select v-model="valueThree" placeholder="请选择" style="display: inline-block; width: 60%;">
						<el-option v-for="item in optionsThree" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="sec">
					<span>风量等级</span>
					<el-select v-model="valueFour" placeholder="请选择" style="display: inline-block; width: 60%;">
						<el-option v-for="item in optionsFour" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="sec">
					<span>循环模式</span>
					<el-select v-model="valueFive" placeholder="请选择" style="display: inline-block; width: 60%;">
						<el-option v-for="item in optionsFive" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="sec">
					<span>出风方向</span>
					<el-select v-model="valueSix" placeholder="请选择" style="display: inline-block; width: 60%;">
						<el-option v-for="item in optionsSix" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</el-collapse-transition>
		<!--结束-->

		<div class="sec">
			<span>温度环境</span>
			<el-input style="display: inline-block; width: 60%;"></el-input>
		</div>
		<div class="sec">
			<span>日照强度</span>
			<el-input style="display: inline-block; width: 60%;"></el-input>
		</div>
		<div class="sec">
			<span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</span>
			<el-input style="display: inline-block; width: 60%;"></el-input>
		</div>
		<div class="sec" style="">
			<el-button type="primary">发起评估</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultShow: false,
				optionsOne: [{
					value: '城郊',
					label: '城郊'
				}, {
					value: '城市',
					label: '城市'
				}, {
					value: '高速',
					label: '高速'
				}, {
					value: '爬坡',
					label: '爬坡'
				}, {
					value: '怠速',
					label: '怠速'
				}, {
					value: '熄火',
					label: '熄火'
				}],
				valueOne: '',
				optionsTwo: [{
					value: 'AC Off',
					label: 'AC Off'
				}, {
					value: 'AC Auto 22C',
					label: 'AC Auto 22C'
				}, {
					value: 'Full Cold OSA',
					label: 'Full Cold OSA'
				}, {
					value: 'Full Cold Recir',
					label: 'Full Cold Recir'
				}, {
					value: 'User-Defined',
					label: 'User-Defined'
				}],
				valueTwo: '',
				optionsThree: [{
					value: '16',
					label: '16'
				},{
					value: '17',
					label: '17'
				},{
					value: '18',
					label: '18'
				},{
					value: '19',
					label: '16'
				},{
					value: '20',
					label: '20'
				},{
					value: '21',
					label: '21'
				}, {
					value: '22',
					label: '22'
				}, {
					value: '23',
					label: '23'
				}, {
					value: '24',
					label: '24'
				}, {
					value: '25',
					label: '25'
				}, {
					value: '26',
					label: '26'
				}, {
					value: '27',
					label: '27'
				}, {
					value: '28',
					label: '28'
				}, {
					value: '29',
					label: '29'
				}, {
					value: '30',
					label: '30'
				}, ],
				valueThree: '',
				optionsFour: [{
					value: '1',
					label: '1'
				}, {
					value: '2',
					label: '2'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}, {
					value: '5',
					label: '5'
				},{
					value: '6',
					label: '6'
				}, {
					value: '7',
					label: '7'
				}, {
					value: '8',
					label: '8'
				}, {
					value: '9',
					label: '0'
				}, {
					value: '10',
					label: '10'
				}],
				valueFour: '',
				optionsFive: [{
					value: 'OSA',
					label: 'OSA'
				}, {
					value: 'Recir',
					label: 'Recir'
				}, {
					value: 'Auto',
					label: 'Auto'
				}],
				valueFive: '',
				optionsSix: [{
					value: '吹面',
					label: '吹面'
				}, {
					value: '吹脚',
					label: '吹脚'
				}, {
					value: '吹面+吹脚',
					label: '吹面+吹脚'
				}],
				valueSix: '',
				valueTime: ''
			}
		},

		methods: {
			ktModelChange(item) {
				if(item === 'User-Defined') this.defaultShow = true
				else this.defaultShow = false
			},
			toReturn() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.el-select-dropdown__item{
	display: block;
}
	.SED_LA {
		>.title {
			position: relative;
			height: 40px;
			line-height: 40px;
			text-align: center;
			>.return {
				position: absolute;
				left: 0;
				top: 0;
				padding: 0px 5px;
			}
		}
		.sec {
			width: 100%;
			margin-top: 12px;
			span {
				font-size: 14px;
				margin-right: 5px;
			}
		}
	}
</style>