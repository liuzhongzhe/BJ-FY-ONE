<template>
    <div class="SED_UA">
        <div class="title">
            <span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回 </span>
            <span>测试评估</span>
        </div>
        <div style="display: flex;">
            <div class="chooseSite" v-show="chooseSiteShow" style="flex: 0 220px;text-align: center;">
                <span v-for="(item,index) in scoreAr">
                    <i ref="point" v-show="index==pointIndex"></i>
                    <img :src="item.img" @click="chooseSite(item,index)" />
                    <span v-show="item.score>=0" style="position: absolute;right:15px;top: 43px;font-size: 12px;">{{item.score}}</span>
                </span>
                <div>
                    <img @click="imgClick" src="../../../static/bgCar.png" style="width: 200px;margin: 0 auto;">
                </div>
            </div>
            <div style="flex: 1; text-align: center;margin-top: 20px;">
                <div class="chooseLevel">
                    <img src="../../../static/15d.png" style="position: absolute;left:-17px;;height: 300px;" />
                    <el-slider v-model="value2" :max=10 :min=-0.5 :step=0.1 vertical :format-tooltip="formatTooltip" height="300px"></el-slider>
                </div>
            </div>
        </div>

        <div class="button">
            <el-button type="primary" @click="modalShow = true" style="width: 120px;">提交</el-button>
        </div>
			<Modal
			style="z-index: 10000;"
			v-model="modalShow"
			title="提示"
			@on-ok="submit"
			@on-cancel="modalShow = false">
			<p>确定提交信息？</p>
		</Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                siteAr: ['static/1z.png', 'static/2b.png', 'static/3b.png', 'static/4b.png', 'static/5b.png',
                    'static/6b.png'
                ],
                chooseSiteShow: true,
				modalShow:false,
                nowCurrentIndex: 0,
                pointIndex: 0,
                userLevel: 0,
                value2: 0,
				resultObj:{},
                scoreAr: [{
                        img: 'static/1z.png',
                        score: 0.0
                    },
                    {
                        img: 'static/2b.png',
                        score: 0.0
                    },
                    {
                        img: 'static/3b.png',
                        score: 0.0
                    },
                    {
                        img: 'static/4b.png',
                        score: 0.0
                    },
                    {
                        img: 'static/5b.png',
                        score: 0.0
                    },
                    {
                        img: 'static/6b.png',
                        score: 0.0
                    }
                ]
            }
        },
        mounted() {
            this._getData()
            this.xxx()
            $('.el-slider__bar').css("background", "#0C6FF9")
        },
        created() {
            this.chooseSiteShow = true
        },
        methods: {
        	imgClick(){
				return
			},
            _getData() {
                this.axios({
                    method: 'get',
                    url: `/patac_tse/thermalPropertyDetails/${this.$route.params.id}`,
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if(res.status===200){
						this.resultObj = res.data.thermalPropertyDetailsById
						this.value2 = this.resultObj.temDriver
						this.scoreAr[0].score = this.resultObj.temDriver
						this.scoreAr[1].score = this.resultObj.tem1R
						this.scoreAr[2].score = this.resultObj.tem2L
						this.scoreAr[3].score = this.resultObj.tem2R
						this.scoreAr[4].score = this.resultObj.tem3L
						this.scoreAr[5].score = this.resultObj.tem3R
					}
                })
            },
            xxx() {
                this.$refs.point[this.pointIndex].style.background = 'red'
                setTimeout(() => {
                    this.$refs.point[this.pointIndex].style.background = 'green'
                    this.bbb()
                }, 500)
            },
            bbb() {
                this.$refs.point[this.pointIndex].style.background = 'green'
                setTimeout(() => {
                    this.$refs.point[this.pointIndex].style.background = 'red'
                    this.xxx()
                }, 500)
            },
            toReturn() {
                this.$router.go(-1)
            },
            submit() {
				this.resultObj.id = 6
				this.resultObj.temDriver = this.scoreAr[0].score
				this.resultObj.tem1R = this.scoreAr[1].score
				this.resultObj.tem2L = this.scoreAr[2].score
				this.resultObj.tem2R = this.scoreAr[3].score
				this.resultObj.tem3L = this.scoreAr[4].score
				this.resultObj.tem3R = this.scoreAr[5].score
				this.axios({
					method: 'put',
					url: `/patac_tse/updateThermalPropertyDetails`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data:this.resultObj
				}).then((res)=>{
					if(res.status===200){
						this.$Message.success('操作成功');
						this.$router.push('/SED_table')
					}
				})
            },
            formatTooltip(val) {
                this.$set(this.scoreAr[this.nowCurrentIndex], 'score', val)
                if (val > 0 && val <= 2) {
                    $('.el-slider__bar').css("background", "#0C6FF9")
                } else if (val > 2 && val <= 4) {
                    $('.el-slider__bar').css("background", "#02BC05")
                } else if (val > 4 && val <= 6) {
                    $('.el-slider__bar').css("background", "#F9B60C")
                } else if (val > 6 && val <= 8) {
                    $('.el-slider__bar').css("background", "rgb(243, 92, 20)")
                } else if (val > 8) {
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
            chooseSite(item, index) {
                this.pointIndex = index

                if (index === 1 || index === 3 || index === 5) {
                    this.$refs.point[index].style.right = "45px"
                }
                this.value2 = this.scoreAr[index].score
                this.nowCurrentIndex = index
                this.scoreAr[0].img = 'static/1b.png'
                this.scoreAr[1].img = 'static/2b.png'
                this.scoreAr[2].img = 'static/3b.png'
                this.scoreAr[3].img = 'static/4b.png'
                this.scoreAr[4].img = 'static/5b.png'
                this.scoreAr[5].img = 'static/6b.png'
                let b = this.siteAr[index].replace(/b./, "z.")
                this.$set(this.scoreAr[index], 'img', b)
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .SED_UA {
		/deep/ .el-slider__button-wrapper{
			z-index: 999;
		}
        /deep/ .el-button {
            padding: 10px 30px;
        }
        /deep/ .el-slider__button {
            width: 20px;
            height: 20px;
        }
        /deep/ .el-slider__bar {
            background-color: red;
        }
        /deep/ .el-slider.is-vertical {
            right: 5px;
        }
        >.title {
            position: relative;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #ebeef5;
            font-size: 14px;
            >.return {
                position: absolute;
                left: 0;
                top: 0;
                padding: 0px 5px;
            }
        }
        .chooseSite {
            display: inline-block;
            margin-top: 20px;
            position: relative;
            >span {
                i {
                    position: absolute;
                    display: inline-block;
                    bottom: 45px;
                    right: -6px;
                    border-radius: 50%;
                    width: 6px;
                    height: 6px;
                    background: green;
                }
                >img {
                    width: 45px;
                }
                &:nth-child(1) {
                    position: absolute;
                    top: 125px;
                    left: 43px;
                }
                &:nth-child(2) {
                    position: absolute;
                    top: 125px;
                    left: 132px;
                }
                &:nth-child(3) {
                    position: absolute;
                    top: 190px;
                    left: 43px;
                }
                &:nth-child(4) {
                    position: absolute;
                    top: 190px;
                    left: 132px;
                }
                &:nth-child(5) {
                    position: absolute;
                    top: 260px;
                    left: 43px;
                }
                &:nth-child(6) {
                    position: absolute;
                    top: 260px;
                    left: 132px;
                }
            }
        }
        .chooseLevel {
            position: relative;
            top: 30px;
            display: inline-block;
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
