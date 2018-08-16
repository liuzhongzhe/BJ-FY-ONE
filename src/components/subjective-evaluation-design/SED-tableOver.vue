<template>
    <div class="SED_table">
        <div class="title">
            <span class="return" @click="toReturn">
                <i class="el-icon-arrow-left"></i>返回</span>
            <span>已关闭评估项目
                <img src="../../../static/ten.png" style="height: 18px;position: relative;top: 4px;left: 5px;" @click="changeTitle" />
            </span>
        </div>
        <div class="table">
            <div class="title">
                <span>评估日期
                    <img @click="sortList('date')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
                </span>
                <span>车辆编号
                    <img @click="sortList('modelNum')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
                </span>
                <span>评估工况
                    <img @click="sortList('evaluationCon')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
                </span>
                <span>参与人数
                    <img @click="sortList('personNum')" src="../../../static/sort.png" style="height: 16px;vertical-align:middle;position: relative;bottom: 1px;right: 3px;">
                </span>
            </div>
            <div class="list" v-for="(item,index) in tableData" @click="handleCurrentChange(item,index)" :class="{'active':index==currentIndex}">
                <span>{{item.date}}</span>
                <span>{{item.modelNum}}</span>
                <span>{{item.evaluationCon}}</span>
                <span>{{item.personNum}}</span>
            </div>
        </div>
        <div class="btn">
            <div @click="toResult">
                <img src="../../../static/six.png" />评估结果</div>
            <div @click="viewListInfo">
                <img src="../../../static/tenq.png" />项目信息</div>
        </div>
        <div class="listInfo" v-if="listInfoShow">
            <div class="title">
                <span class="return" @click="listInfoShow=false">
                    <i class="el-icon-arrow-left"></i>返回 </span>
                <span>详细信息</span>
            </div>
            <div class="content">
                <div class="sec">
                    <span>评估日期：</span>
                    <span>
                        {{proInfo.date}}
                    </span>
                </div>
                <div class="sec">
                    <span>车辆编号：</span>
                    <span>{{proInfo.modelNum}}</span>
                </div>
                <div class="sec">
                    <span>评估工况：</span>
                    <span>{{proInfo.evaluationCon}}</span>
                </div>
                <div class="sec">
                    <span>空调模式：</span>
                    <span>{{proInfo.airCconditioning}}</span>
                </div>
                <div v-if="proInfo.airCconditioning==='User-Defined'">
                    <div class="sec">
                        <span>出风温度：</span>
                        <span>{{proInfo.temperature}}℃</span>
                    </div>
                    <div class="sec">
                        <span>风量等级：</span>
                        <span>{{proInfo.grade}}</span>
                    </div>
                    <div class="sec">
                        <span>循环模式：</span>
                        <span>{{proInfo.cycle}}</span>
                    </div>
                    <div class="sec">
                        <span>出风方向：</span>
                        <span>{{proInfo.direction}}</span>
                    </div>
                </div>
                <div class="sec">
                    <span>环境温度：</span>
                    <span>{{proInfo.temperatureEnv}}℃</span>
                </div>
                <div class="sec">
                    <span>日照强度：</span>
                    <span>{{proInfo.irradiance}}W</span>
                </div>
                <div class="sec">
                    <span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</span>
                    <span>{{proInfo.weight}}kg</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                listInfoShow: false,
                closedShow: false,
                zzzShow: false,
                currentIndex: -1,
                proInfo: {},
                topTitle: '未关闭评估项目',
                currentRow: {},
                tabelDatas: [],
                tabelDatak: [],
                tableData: [],
				sortState:0
            }
        },
        created() {
            if (localStorage.userIdentity === 'zzz') {
                this.zzzShow = true
            } else {
                this.zzzShow = false
            }
        },
        mounted() {
			this.$Loading.start();
            this._getData()
        },
        methods: {
            _getData() {
                this.axios({
                    method: 'get',
                    url: `/patac_tse/thermalPropertyClose/date/0`,
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        this.tableData = res.data.thermalPropertysClose
						this.$Loading.finish();
                    }
                })
            },
			sortList(item){
				this.$Loading.start();
				if(this.sortState ===0){
					this.axios({
						method: 'get',
						url: `/patac_tse/thermalPropertyClose/${item}/0`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						if (res.status === 200) {
							this.tableData = res.data.thermalPropertysClose
							this.$Loading.finish();
							this.sortState = 1
						}
					})
				}else if(this.sortState ===1){
					this.axios({
						method: 'get',
						url: `/patac_tse/thermalPropertyClose/${item}/1`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						if (res.status === 200) {
							this.tableData = res.data.thermalPropertysClose
							this.$Loading.finish();
							this.sortState = 0
						}
					})
				}
			},
            chooseListState() {
                if (!this.currentRow) {
                    alert()
                }
            },
            toLanchAss() {
                this.$router.push('/SED_LaunchAssessment')
            },
            toDeletePro() {
                if (JSON.stringify(this.currentRow) == "{}") {
                    this.$Message.warning('请选择一条测试');
                    return
                } else {
                    this.axios({
                        method: 'delete',
                        url: `/patac_tse/deleteThermalProperty/${this.currentRow.id}`,
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            this.$Message.success('关闭成功');
                            this._getData()
                        }
                    })
                }
            },
            viewListInfo() {
                if (JSON.stringify(this.currentRow) == "{}") {
                    this.$Message.warning('请选择一条测试');
                    return
                } else {
                    this.listInfoShow = true
                    this.axios({
                        method: 'get',
                        url: `/patac_tse/thermalProperty/${this.currentRow.id}`,
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            this.proInfo = res.data.thermalPropertyById
                        }
                    })
                }
            },
            toResult() {
                if (JSON.stringify(this.currentRow) == "{}") {
                    this.$Message.warning('请选择一条测试');
                    return
                }
                if (this.currentRow.evaluationCon === '熄火') {
                    this.$router.push(`/SED_result/${this.currentRow.id}`)
                } else {
                    this.$router.push(`/SED_resultNormal/${this.currentRow.id}`)
                }

            },
            toUserAss() {
                if (JSON.stringify(this.currentRow) == "{}") {
                    this.$Message.warning('请选择一条测试');
                    return
                }
                if (!this.zzzShow) {
                    if (this.currentRow.evaluationCon === '熄火') {
                        this.$router.push(`/SED_pgzEntryFlameout/${this.currentRow.id}`)

                    } else {
                        this.$router.push(`/SED_pgzEntry/${this.currentRow.id}`)
                    }
                } else {
                    if (this.currentRow.evaluationCon === '熄火') {
                        this.$router.push(`/SED_zzzEntryFlameout/${this.currentRow.id}`)
                    } else {
                        this.$router.push(`/SED_zzzEntry/${this.currentRow.id}`)
                    }
                }
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val, index) {
                this.currentIndex = index
                this.currentRow = val
                return 'warning-row';
            },
            toReturn() {
                this.$router.push('/SED_index')
            },
            changeTitle() {
                this.$router.push('/SED_table')
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .SED_table {
        table {
            width: 100% !important;
        }
        /deep/ .el-table .warning-row {
            background: oldlace;
        }
        /deep/ .el-table .success-row {
            background: #f0f9eb;
        }
        /deep/ .el-button {
            padding: 10px 4px;
        }
        /deep/ .el-table th {
            text-align: center !important;
        }
        /deep/ .el-table .cell {
            text-align: center;
        }
        >.table {
            padding-bottom: 20px;
            >.title {
                display: flex;
                line-height: 40px;
                span {
                    flex: 1;
                    text-align: center;
                }
            }
            >.list {
                display: flex;
                transition: .3s;
                span {
                    flex: 1;
                    text-align: center;
                    line-height: 42px;
                    border-top: 1px solid #E4E4E4;
                }
                &.active {
                    background: #BDDBF9;
                }
            }
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
        .btn {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            text-align: center;
            border-top: 1px solid rgb(231, 231, 231);
            padding-top: 1px;
            display: flex;
            z-index: 10;
            background: #F8F8F8;
            >div {
                flex: 1;
                font-size: 12px;
                img {
                    width: 30px;
                    margin: 1px auto;
                    display: block;
                }
            }
        }
        .listInfo {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: #ffffff;
            z-index: 10;
            >.title {
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid rgb(231, 231, 231);
                .return {
                    position: absolute;
                    top: 0px;
                    left: 2px;
                }
            }
            >.content {
                .sec {
                    width: 200px;
                    margin: 0 auto;
                    margin-top: 10px;
                    span {
                        display: inline-block;
                        height: 30px;
                        line-height: 30px;
                        &:first-child {
                            width: 80px;
                            float: left;
                        }
                        &:last-child {
                            margin-left: 10px;
                            min-width: 100px;
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
</style>
