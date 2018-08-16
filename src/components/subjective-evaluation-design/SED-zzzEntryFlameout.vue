<template>
    <div class="SED_zzzEntryFlameout">
        <div class="title">
            <span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回 </span>
            <span>实测录入</span>
        </div>
        <div class="sec">
            <span>翼子板</span>
            <el-input v-model="pro.valueOne">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>引擎盖</span>
            <el-input v-model="pro.valueTwo">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>机油标尺</span>
            <el-input v-model="pro.valueThree">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>保险丝盒</span>
            <el-input v-model="pro.valueFour">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>前舱盖锁头</span>
            <el-input v-model="pro.valueFive">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>机油加注口</span>
            <el-input v-model="pro.valueSix">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>支撑杆护套</span>
            <el-input v-model="pro.valueSeven">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>制动液壶盖</span>
            <el-input v-model="pro.valueEight">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>冷却液壶盖</span>
            <el-input v-model="pro.valueNine">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec">
            <span>后备箱地毯</span>
            <el-input v-model="pro.valueTen">
				<span slot="append">℃</span>
			</el-input>
        </div>
        <div class="sec" style="text-align: center;">
            <el-button type="primary" style="width: 120px;padding: 10px 16px;" @click="inputOK">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                resultObj: {},
                pro: {
                    valueOne: '',
                    valueTwo: '',
                    valueThree: '',
                    valueFour: '',
                    valueFive: '',
                    valueSix: '',
                    valueSeven: '',
                    valueEight: '',
                    valueNine: '',
                    valueTen: ''
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
                    url: `/patac_tse/thermalPropertyDetailsMeasureFlameout/${this.$route.params.id}`,
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        this.resultObj = res.data.thermalPropertyDetailsMeasureFlameoutByByAssessId[0]
                        this.pro.valueOne = this.resultObj.hood
                        this.pro.valueTwo = this.resultObj.fender
                        this.pro.valueThree = this.resultObj.dipstick
                        this.pro.valueFour = this.resultObj.fuseBox
                        this.pro.valueFive = this.resultObj.frontLockLock
                        this.pro.valueSix = this.resultObj.fillingPort
                        this.pro.valueSeven = this.resultObj.supportRodSheath
                        this.pro.valueEight = this.resultObj.brakeFluidPpotCover
                        this.pro.valueNine = this.resultObj.coolantPotCover
                        this.pro.valueTen = this.resultObj.carpets
                    }
                })
            },
            inputOK() {
				for(let i in this.pro){
					for (let i in this.pro) {
						if (this.pro[i]) {
							let val = this.pro[i]
							var regPos = /^\d+(\.\d+)?$/; //非负浮点数
							var regNeg =
								/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
							if (regPos.test(val) || regNeg.test(val)) {} else {
								this.$Message.error('非数字');
								return
							}
							if (Number(this.pro[i]) > 120) {
								this.$Message.error('请勿输入超过120的数值');
								return
							}
							if (Number(this.pro[i]) <20) {
								this.$Message.error('请勿输入小于20的数值');
								return
							}
						}
					}
				}
				this.resultObj.hood = this.pro.valueOne
				this.resultObj.fender = this.pro.valueTwo
				this.resultObj.dipstick = this.pro.valueThree
				this.resultObj.fuseBox = this.pro.valueFour
				this.resultObj.frontLockLock = this.pro.valueFive 
				this.resultObj.fillingPort = this.pro.valueSix
				this.resultObj.supportRodSheath = this.pro.valueSeven
				this.resultObj.brakeFluidPpotCover = this.pro.valueEight
				this.resultObj.coolantPotCover = this.pro.valueNine
				this.resultObj.carpets = this.pro.valueTen
				this.axios({
					method: 'post',
					url: `/patac_tse/createThermalPropertyDetailsMeasureFlameout`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data:this.resultObj
				}).then((res)=>{
					if (res.status === 200) {
						this.$Message.success('添加成功');
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
    .SED_zzzEntryFlameout {
		/deep/ .el-input-group__append{
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
			margin: 6px auto;
			width: 260px;
            >span {
                display: inline-block;
                width: 80px;
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
