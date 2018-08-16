<template>
    <div class="SED_LA">
        <div class="title">
            <span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回 </span>
            <span>发起评估</span>
        </div>
        <Form ref="pro" :model="pro" :rules="ruleValidate" :label-width="70">
			<FormItem label="评估日期" class="lzz">
				<FormItem >
					<DatePicker type="date" v-model="pro.date" @on-change="chooseTime"></DatePicker>
				</FormItem>
			</FormItem>
            <FormItem label="车辆编号" prop="modelNum">
                <Input v-model="pro.modelNum"></Input>
            </FormItem>
			<FormItem label="评估工况" prop="evaluationCon">
				<Select v-model="pro.evaluationCon">
					<Option value="城郊">城郊</Option>
					<Option value="城市">城市</Option>
					<Option value="高速">高速</Option>
					<Option value="爬坡">爬坡</Option>
					<Option value="怠速">怠速</Option>
					<Option value="熄火">熄火</Option>
				</Select>
			</FormItem>
			<FormItem label="空调模式" prop="airCconditioning">
				<Select v-model="pro.airCconditioning" @on-change="ktModelChange">
					<Option value="AC Off">AC Off</Option>
					<Option value="AC Auto 22C">AC Auto 22C</Option>
					<Option value="Full Cold OSA">Full Cold OSA</Option>
					<Option value="Full Cold Recir">Full Cold Recir</Option>
					<Option value="User-Defined">User-Defined</Option>
				</Select>
			</FormItem>
            <el-collapse-transition>
            	<div v-if="defaultShow">
					<FormItem label="出风温度" prop="temperature">
						<Select v-model="pro.temperature" >
							<Option value="16">16℃</Option>
							<Option value="17">17℃</Option>
							<Option value="18">18℃</Option>
							<Option value="19">19℃</Option>
							<Option value="20">20℃</Option>
							<Option value="21">21℃</Option>
							<Option value="22">22℃</Option>
							<Option value="23">23℃</Option>
							<Option value="24">24℃</Option>
							<Option value="25">25℃</Option>
							<Option value="26">26℃</Option>
							<Option value="27">27℃</Option>
							<Option value="28">28℃</Option>
							<Option value="29">29℃</Option>
							<Option value="30">30℃</Option>
							<span slot="append">℃</span>
						</Select>
					</FormItem>
					<FormItem label="风量等级" prop="grade">
						<Select v-model="pro.grade" >
							<Option value="1">1</Option>
							<Option value="2">2</Option>
							<Option value="3">3</Option>
							<Option value="4">4</Option>
							<Option value="5">5</Option>
							<Option value="6">6</Option>
							<Option value="7">7</Option>
							<Option value="8">8</Option>
							<Option value="9">9</Option>
							<Option value="10">10</Option>
						</Select>
					</FormItem>
					<FormItem label="循环模式" prop="cycle">
						<Select v-model="pro.cycle" >
							<Option value="OSA">OSA</Option>
							<Option value="Recir">Recir</Option>
							<Option value="Auto">Auto</Option>
						</Select>
					</FormItem>
					<FormItem label="出风方向" prop="direction">
						<Select v-model="pro.direction" >
							<Option value="吹面">吹面</Option>
							<Option value="吹脚">吹脚</Option>
							<Option value="吹面+吹脚">吹面+吹脚</Option>
						</Select>
					</FormItem>
            	</div>
            </el-collapse-transition>
			<FormItem label="温度环境" prop="temperatureEnv">
				<Input v-model="pro.temperatureEnv">
					<span slot="append">℃</span>
				</Input>
			</FormItem>
			<FormItem label="日照强度" prop="irradiance">
				<Input v-model="pro.irradiance">
					<span slot="append">W</span>
				</Input>
			</FormItem>
			<FormItem label="车重" prop="weight">
				<Input v-model="pro.weight">
					<span slot="append">kg</span>
				</Input>
			</FormItem>
        </Form>
        
        <div class="sec" style="margin-top: 40px;">
            <el-button type="primary" style="width: 120px;" @click="handleSubmit('pro')">发起评估</el-button>
            <el-button type="info"style="width: 120px;" @click="handleReset('pro')">重置</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                defaultShow: false,
                ruleValidate: {
                    modelNum: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }],
					temperatureEnv: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }],
					temperature: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }],
					evaluationCon: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }],
					irradiance: [{
						required: true,
						message: '',
						trigger: 'blur'
					}],
					airCconditioning: [{
						required: true,
						message: '',
						trigger: 'blur'
					}],
                    weight: [{
                        required: true,
                        message: '',
                        trigger: 'change'
                    }],
					grade:[{
                        required: true,
                        message: '',
                        trigger: 'change'
                    }],
					cycle:[{
                        required: true,
                        message: '',
                        trigger: 'change'
                    }],
					direction:[{
                        required: true,
                        message: '',
                        trigger: 'change'
                    }],
                    date: [{
                        required: true,
                        type: 'string',
                        message: '',
                        trigger: 'change'
                    }],
                },
                pro: {
                    date: '',
                    modelNum: '',
                    evaluationCon: '',
                    airCconditioning: '',
                    temperature: '',
                    grade: '',
                    cycle: '',
                    direction: '',
                    temperatureEnv: '',
                    irradiance: '',
                    weight: ''
                },
                valueOne: '',
                valueTwo: '',
                valueThree: '',
                valueFour: '',
                valueFive: '',
                valueSix: '',
                valueTime: ''
            }
        },
		created(){
			let _date = new Date()
			let _dateMonth=_date.getMonth()+1
			if(_dateMonth<10){
				_dateMonth = '0'+_dateMonth
			}
			this.pro.date = `${_date.getFullYear()}-${_dateMonth}-${_date.getDate()}`
		},
		mounted(){
			let _date = new Date()
			let _dateMonth=_date.getMonth()+1
			if(_dateMonth<10){
				_dateMonth = '0'+_dateMonth
			}
			this.pro.date = `${_date.getFullYear()}-${_dateMonth}-${_date.getDate()}`
		},
        methods: {
			chooseTime(e){
				this.pro.date = e
			},
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.axios({
							method: 'post',
							url: `/patac_tse/createThermalProperty`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.pro
						}).then((res) => {
							if (res.status === 200) {
								this.$Message.success('添加成功');
								this.$router.push('/SED_table')
							}
						})
                    } else {
                        this.$Message.error('请将项目信息填写完整');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            ktModelChange() {
                if (this.pro.airCconditioning === 'User-Defined') {
                    this.defaultShow = true
                } else {
                    this.defaultShow = false
                }
            },

            toReturn() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
	
    .SED_LA {
        text-align: center;
		span{
			text-align: left !important;
		}
		.lzz {
			position: relative;
			top: 10px !important;
			/deep/ label{
				position: relative;
				top: 10px !important;
			}
		}
		/deep/ .ivu-select-item{
			text-align: left;
			padding: 7px 9px;
		}
		/deep/ .ivu-input-group-append{
			position: relative;
			right: 27px;
			z-index: 10;
			border-radius: 0;
		}
		/deep/ .ivu-select-selected-value{
			text-align: left !important;
		}
		/deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
			text-align: left !important;
		}
		/deep/ .ivu-form-item-required .ivu-form-item-label:before{
			content: '';
		}
		/deep/ .ivu-form-item{
			width: 270px;
			margin: 10px auto;
		}
		/deep/ .ivu-form-item-content{
			width: 200px;
		}
		/deep/ .ivu-input,.ivu-select{
			width: 198px !important;
		}
        /deep/ .ivu-form-item-error-tip {
            color: transparent;
        }
        /deep/ .el-select-dropdown__item {
            display: block;
        }
        /deep/ .el-button {
            padding: 10px 30px;
        }
        /deep/ .el-input__inner {
            height: 34px;
            line-height: 34px;
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
        .sec {
            width: 100%;
            margin-top: 10px;
            span {
                font-size: 14px;
                margin-right: 5px;
            }
        }
    }
</style>
