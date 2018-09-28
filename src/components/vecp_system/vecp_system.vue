<template>
	<div class="vecp_system">
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>整车发动机冷却性能数据查询系统</span>
				</div>
				<div class="button">
					<span>车型平台</span>
					<i-button type="primary" @click="search" style="width: 70px;">查询</i-button>
					<i-button type="success" @click="toCompare" style="width: 70px;">加入对比</i-button>
				</div>
				<div class="selectList" style="margin-top: 10px;">
					<div>
						<span>车型数据：</span>
						<el-select v-model="vehicleValue" filterable placeholder="请选择" @change="vehicleChange" style="width: 400px;">
							<el-option v-for="(item,index) in vehicleArr" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型平台：</span>
						<el-select v-model="pro.valueOne">
							<el-option v-for="item in cxptArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型名称：</span>
						<el-select v-model="pro.valueTwo">
							<el-option v-for="item in cxmcArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型年份：</span>
						<el-select v-model="pro.valueThree">
							<el-option v-for="item in cxnfArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>发动机：</span>
						<el-select v-model="pro.valueFour">
							<el-option v-for="item in fdjArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>变速箱：</span>
						<el-select v-model="pro.valueFive">
							<el-option v-for="item in bsxArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>驱动形式：</span>
						<el-select v-model="pro.valueSix">
							<el-option v-for="item in qdxsArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>左/右驾：</span>
						<el-select v-model="pro.valueSeven">
							<el-option v-for="item in zyjArr" :value="item" :label="item"></el-option>
						</el-select>
					</div>
				</div>
				<el-tabs value="name1" style="margin-top: 30px;">
					<el-tab-pane label="查询显示结果" name="name1">
						<Spin v-show="!searchShow"></Spin>
						<div class="title" v-if="searchShow">
							<span>动力冷却性能结果</span>
						</div>
						<div class="resultTable" v-if="searchShow">
							<div class="topTitle">
								<div></div>
								<div>
									<div class="top">
										<span>发动机油温</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>发动机水温</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>风扇出风温度 </span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>

								<div>
									<div class="top">
										<span>LTR水温</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>变速箱油温</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>CAC出口温度</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Con.</span>
										<span style="background: rgb(240,249,235);">Exc.</span>
										<span style="background: rgb(240,249,235);">Ext.</span>
									</div>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="border-left: none;background: rgb(240,249,235);">试验结果</span>
								</div>
								<div>
									<span v-for="item in pscArrText">{{item}}</span>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="border-left: none;background: rgb(240,249,235);">虚拟结果</span>
								</div>
								<div>
									<span v-for="item in pscArrSim">{{item}}</span>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="background: rgb(240,249,235);">VTS要求</span>
								</div>
								<div>
									<span v-for="item in pscArrVts">{{item}}</span>
								</div>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;" v-if="searchShow">
							<span>前端开口和进风量结果</span>
						</div>
						<div class="resultTableTwo" v-if="searchShow">
							<div class="twoTitle">
								<div>Openging(cm2)</div>
								<div>Shutter Open(CMM)</div>
								<div>Shutter Close(CMM)</div>
							</div>
							<div class="twoList">
								<div>
									<span style="background: rgb(240,249,235);">总体开口面积</span>
									<span>{{intakeObjSea.one[0].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.two[0].key}}</span>
									<span>{{intakeObjSea.two[0].val}}</span>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.two[1].key}}</span>
									<span>{{intakeObjSea.two[1].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.three[0].key}}</span>
									<span>{{intakeObjSea.three[0].val}}</span>
								</div>
							</div>
							<div class="twoList">
								<div>
									<span style="background: rgb(240,249,235);">正投影面积</span>
									<span>{{intakeObjSea.one[1].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.two[2].key}}</span>
									<span>{{intakeObjSea.two[2].val}}</span>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.two[3].key}}</span>
									<span>{{intakeObjSea.two[3].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.three[1].key}}</span>
									<span>{{intakeObjSea.three[1].val}}</span>
								</div>
							</div>
							<div class="twoList">
								<div>
									<span style="background: rgb(240,249,235);">风扇功率</span>
									<span>{{intakeObjSea.one[2].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);" v-if="intakeObjSea.two[4]">{{intakeObjSea.two[4].key}}</span>
									<span v-if="intakeObjSea.two[4]">{{intakeObjSea.two[4].val}}</span>
									<span style="background: rgb(240,249,235);" v-if="intakeObjSea.two[5]">{{intakeObjSea.two[5].key}}</span>
									<span v-if="intakeObjSea.two[5]">{{intakeObjSea.two[5].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">{{intakeObjSea.three[2].key}}</span>
									<span>{{intakeObjSea.three[2].val}}</span>
								</div>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;" v-if="searchShow">
							<span>前端冷却模块结果</span>
							<el-select style="width: 150px;" v-model="qdlqValue" @change="qdlqValueChange">
								<el-option v-if="item.name!== 'Fan'" v-for="(item,index) in qdlqArr" :key="index" :label="item.name" :value="item.name">{{item.name}}</el-option>
							</el-select>
						</div>
						<div class="resultTableThree" v-if="searchShow">
							<div class="threeList">
								<div>
									<span style="background: rgb(240,249,235);">Length</span>
									<span>{{qdlqDataArr.content[5].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">No. of Tubes</span>
									<span>{{qdlqDataArr.content[1].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Flow in Front View</span>
									<span>{{qdlqDataArr.content[0].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Primary Inlet Temp</span>
									<span>{{qdlqDataArr.content[9].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Air Temp</span>
									<span class="ELSELECT">
										<el-select style="height: 20px;" @change="airValueChange" v-model="airValue">
											<el-option v-for="(item,index) in airArr" :key="index" :value="item.temperature" :label="item.temperature"></el-option>
										</el-select>
									</span>
								</div>
							</div>
							<div class="threeList">
								<div>
									<span style="background: rgb(240,249,235);">Height</span>
									<span>{{qdlqDataArr.content[6].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">No. of Passes</span>
									<span>{{qdlqDataArr.content[3].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Recirculated Flow</span>
									<span>{{qdlqDataArr.content[1].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Auxiliary Inlet Temp</span>
									<span>{{qdlqDataArr.content[8].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Air Density</span>
									<span>{{currentAir.density}}</span>
								</div>
							</div>
							<div class="threeList">
								<div>
									<span style="background: rgb(240,249,235);">Thickness</span>
									<span>{{qdlqDataArr.content[7].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">No. of Raws</span>
									<span>{{qdlqDataArr.content[4].val}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Cp</span>
									<span>{{qdlqDataArr.cp}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Du</span>
									<span>{{qdlqDataArr.du}}</span>
								</div>
								<div>
									<span style="background: rgb(240,249,235);">Air Viscosity</span>
									<span>{{currentAir.viscosity}}</span>
								</div>
							</div>
						</div>
						<div class="resultTableFive" v-if="qdlqValue !=='Condenser'" v-show="searchShow">
							<div class="fiveTitle">
								<span>前端冷却模块CDS数据</span>
								<span v-if="qdlqValue !=='Condenser'" v-for="(item,index) in qdlqDataArr.cds['0.5']">
									{{item.key}}
								</span>
							</div>
							<div class="fiveList" v-for="(item,index) in qdlqDataArr.cds">
								<span>{{index}}</span>
								<span v-for="list in qdlqDataArr.cds[index]">{{list.val}}</span>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;" v-if="searchShow">
							<span>风扇冷却模块结果</span>
						</div>
						<div style="display: inline-block; vertical-align:top;" class="resultTableFour" v-if="searchShow">
							<div class="sec" v-for="item in fanDataArr">
								<span style="background: rgb(240,249,235);">{{item.key}}</span>
								<span>{{item.val}}</span>
							</div>
						</div>
						<div id="myChart" style="display: inline-block;position: relative;bottom: 20px;left: 20px;">
						</div>
					</el-tab-pane>
					<el-tab-pane label="对比显示结果" name="name2">
						<div style="background: #68ab82;line-height: 38px;color: #000;display: block;">
							<span style="width: 130px;display: inline-block;text-align: left;text-indent: 2px;border: none;text-align: center;">对比项</span>
							<el-tooltip class="item" effect="dark" :content="item" placement="top" :key="index" v-for="(item,index) in compareArr">
								<span style="vertical-align: top; width: 130px;display: inline-block;border: none; height: 38px;">
									<el-button type="danger" @click="closeCompare(item,index)" icon="el-icon-close" circle style="margin-right: 5px;position: relative;bottom: 6px;"></el-button>
									<span style="width: 90px; overflow: hidden; display: inline-block;height: 30px;">{{item}}</span>
								</span>
							</el-tooltip>
						</div>
						<div class="title">
							<img v-show="dllqxnShow" @click="dllqxnShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!dllqxnShow" @click="dllqxnShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>动力冷却性能结果</span>
						</div>
						<div class="compareTableOne" v-if="dllqxnShow">
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 0px;">
								<img v-show="dllqxnItemOneShow" @click="dllqxnItemOneShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemOneShow" @click="dllqxnItemOneShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> 发动机水温
							</span>
							<div v-if="dllqxnItemOneShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Radiator Inlet Coolant"][0].con}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][1].con}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Radiator Inlet Coolant"][0].exc}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][1].exc}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Radiator Inlet Coolant"][0].ext}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][1].ext}}</span>
									<span>{{item.psc["Radiator Inlet Coolant"][2].ext}}</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
								<img v-show="dllqxnItemTwoShow" @click="dllqxnItemTwoShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemTwoShow" @click="dllqxnItemTwoShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> 发动机油温
							</span>
							<div v-if="dllqxnItemTwoShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Engine Sump Oil"][0].con}}</span>
									<span>{{item.psc["Engine Sump Oil"][1].con}}</span>
									<span>{{item.psc["Engine Sump Oil"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Engine Sump Oil"][0].exc}}</span>
									<span>{{item.psc["Engine Sump Oil"][1].exc}}</span>
									<span>{{item.psc["Engine Sump Oil"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Engine Sump Oil"][0].ext}}</span>
									<span>{{item.psc["Engine Sump Oil"][1].ext}}</span>
									<span>{{item.psc["Engine Sump Oil"][2].ext}}</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 2px;">
								<img v-show="dllqxnItemThreeShow" @click="dllqxnItemThreeShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemThreeShow" @click="dllqxnItemThreeShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> 变速箱油温
							</span>
							<div v-if="dllqxnItemThreeShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Transmission Sump Oil"][0].con}}</span>
									<span>{{item.psc["Transmission Sump Oil"][1].con}}</span>
									<span>{{item.psc["Transmission Sump Oil"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Transmission Sump Oil"][0].exc}}</span>
									<span>{{item.psc["Transmission Sump Oil"][1].exc}}</span>
									<span>{{item.psc["Transmission Sump Oil"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Transmission Sump Oil"][0].ext}}</span>
									<span>{{item.psc["Transmission Sump Oil"][1].ext}}</span>
									<span>{{item.psc["Transmission Sump Oil"][2].ext}}</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075">
								<img v-show="dllqxnItemFourShow" @click="dllqxnItemFourShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemFourShow" @click="dllqxnItemFourShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> 风扇出风温度
							</span>
							<div v-if="dllqxnItemFourShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Fan Discharge"][0].con}}</span>
									<span>{{item.psc["Fan Discharge"][1].con}}</span>
									<span>{{item.psc["Fan Discharge"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Fan Discharge"][0].exc}}</span>
									<span>{{item.psc["Fan Discharge"][1].exc}}</span>
									<span>{{item.psc["Fan Discharge"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["Fan Discharge"][0].ext}}</span>
									<span>{{item.psc["Fan Discharge"][1].ext}}</span>
									<span>{{item.psc["Fan Discharge"][2].ext}}</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075">
								<img v-show="dllqxnItemFiveShow" @click="dllqxnItemFiveShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemFiveShow" @click="dllqxnItemFiveShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> CAC出口温度
							</span>
							<div v-if="dllqxnItemFiveShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["CAC out"][0].con}}</span>
									<span>{{item.psc["CAC out"][1].con}}</span>
									<span>{{item.psc["CAC out"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["CAC out"][0].exc}}</span>
									<span>{{item.psc["CAC out"][1].exc}}</span>
									<span>{{item.psc["CAC out"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["CAC out"][0].ext}}</span>
									<span>{{item.psc["CAC out"][1].ext}}</span>
									<span>{{item.psc["CAC out"][2].ext}}</span>
								</div>
							</div>

							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 2px;">
								<img v-show="dllqxnItemSixShow" @click="dllqxnItemSixShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemSixShow" @click="dllqxnItemSixShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> LTR水温
							</span>
							<div v-if="dllqxnItemSixShow">
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Con.</span>
								</div>
								<div class="compareOneCon">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["LTR"][0].con}}</span>
									<span>{{item.psc["LTR"][1].con}}</span>
									<span>{{item.psc["LTR"][2].con}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["LTR"][0].exc}}</span>
									<span>{{item.psc["LTR"][1].exc}}</span>
									<span>{{item.psc["LTR"][2].exc}}</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon" v-for="(item,index) in compareList">
									<span>{{item.psc["LTR"][0].ext}}</span>
									<span>{{item.psc["LTR"][1].ext}}</span>
									<span>{{item.psc["LTR"][2].ext}}</span>
								</div>
							</div>
						</div>
						<div class="title">
							<img v-show="qdkkjflShow" @click="qdkkjflShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!qdkkjflShow" @click="qdkkjflShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>前端开口和进风量结果</span>
						</div>
						<div class="compareTableTwo" v-if="qdkkjflShow">
							<span>
								<img v-show="qdkkjflItemOneShow" @click="qdkkjflItemOneShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemOneShow" @click="qdkkjflItemOneShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> Openging(cm2)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemOneShow">
								<div>
									<span>总开口面积</span>
									<span>正投影面积</span>
									<span>风扇功率</span>
								</div>
								<div v-for="(item,index) in compareList">
									<span>{{item.intake.one[0].val}}</span>
									<span>{{item.intake.one[1].val}}</span>
									<span>{{item.intake.one[2].val}}</span>
								</div>
							</div>
							<span>
								<img v-show="qdkkjflItemTwoShow" @click="qdkkjflItemTwoShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemTwoShow" @click="qdkkjflItemTwoShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> Shutter oPEN(CMM)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemTwoShow">
								<div>
									<span>Idle,Fan On</span>
									<span>50kph,Fan On</span>
									<span>90kph,Fan On</span>
									<span>155kph,Fan On</span>
									<span>Vmax</span>
								</div>
								<div v-for="(item,index) in compareList">
									<span>{{item.intake.two[0].val}}</span>
									<span>{{item.intake.two[1].val}}</span>
									<span>{{item.intake.two[2].val}}</span>
									<span>{{item.intake.two[3].val}}</span>
									<span>{{item.intake.two[4].val}}</span>
								</div>
							</div>
							<span>
								<img v-show="qdkkjflItemThreeShow" @click="qdkkjflItemThreeShow=false" src="../../../static/reduce2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemThreeShow" @click="qdkkjflItemThreeShow=true" src="../../../static/plus2.png" width="15px"
								 style="cursor: pointer;position: relative;top: 2px;"> Shutter oPEN(CMM) Shutter Close(CMM)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemThreeShow">
								<div>
									<span>50/90Kph</span>
									<span>120kph</span>
									<span>Vmax</span>
								</div>
								<div v-for="(item,index) in compareList">
									<span>{{item.intake.three[0].val}}</span>
									<span>{{item.intake.three[1].val}}</span>
									<span>{{item.intake.three[2].val}}</span>
								</div>
							</div>
						</div>
						<div class="title">
							<img v-show="qdlqmkShow" @click="qdlqmkShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!qdlqmkShow" @click="qdlqmkShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>前端冷却模块结果</span>
						</div>
						<div class="compareTableThree" v-if="qdlqmkShow">
							<div style="display: block;">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemOneShow" @click="qdlqmkItemOneShow=false" src="../../../static/reduce2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemOneShow" @click="qdlqmkItemOneShow=true" src="../../../static/plus2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;"> Condenser
								</span>
							</div>
							<div v-if="qdlqmkItemOneShow">
								<div>
									<span>Length</span>
									<span>Height</span>
									<span>Thickness</span>
									<span>No.of Tubes</span>
									<span>No.of Passes</span>
									<span>No.of Raws</span>
									<span>Flow in Front View</span>
									<span>Recirculated Flow</span>
									<span>Primary Inlet Temp</span>
									<span>Auxiliary</span>
									<span>Air Temp
										<el-select @change="airValueChange" v-model="airValue" style="width: 70px;height: 20px;">
											<el-option v-for="(item,index) in airArr" :key="index" :value="item.temperature" :label="item.temperature"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div v-for="(item,index) in compareList">
									<span>{{item["Condenser"].content[5].val}}</span>
									<span>{{item["Condenser"].content[6].val}}</span>
									<span>{{item["Condenser"].content[7].val}}</span>
									<span>{{item["Condenser"].content[2].val}}</span>
									<span>{{item["Condenser"].content[3].val}}</span>
									<span>{{item["Condenser"].content[4].val}}</span>
									<span>{{item["Condenser"].content[0].val}}</span>
									<span>{{item["Condenser"].content[1].val}}</span>
									<span>{{item["Condenser"].content[9].val}}</span>
									<span>{{item["Condenser"].content[8].val}}</span>
									<span>{{airValue}}</span>
									<span>{{currentAir.density}}</span>
									<span>{{currentAir.viscosity}}</span>
									<span>{{item["Condenser"].cp}}</span>
									<span>{{item["Condenser"].du}}</span>
								</div>
							</div>

							<div style="display: block;">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemTwoShow" @click="qdlqmkItemTwoShow=false" src="../../../static/reduce2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemTwoShow" @click="qdlqmkItemTwoShow=true" src="../../../static/plus2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;"> CAC
								</span>
							</div>
							<div v-if="qdlqmkItemTwoShow">
								<div>
									<span>Length</span>
									<span>Height</span>
									<span>Thickness</span>
									<span>No.of Tubes</span>
									<span>No.of Passes</span>
									<span>No.of Raws</span>
									<span>Flow in Front View</span>
									<span>Recirculated Flow</span>
									<span>Primary Inlet Temp</span>
									<span>Auxiliary</span>
									<span>Air Temp
										<el-select @change="airValueChange" v-model="airValue" style="width: 70px;height: 20px;">
											<el-option v-for="(item,index) in airArr" :key="index" :value="item.temperature" :label="item.temperature"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<div v-for="(item,index) in compareList">
										<span>{{item["CAC"].content[5].val}}</span>
										<span>{{item["CAC"].content[6].val}}</span>
										<span>{{item["CAC"].content[7].val}}</span>
										<span>{{item["CAC"].content[2].val}}</span>
										<span>{{item["CAC"].content[3].val}}</span>
										<span>{{item["CAC"].content[4].val}}</span>
										<span>{{item["CAC"].content[0].val}}</span>
										<span>{{item["CAC"].content[1].val}}</span>
										<span>{{item["CAC"].content[9].val}}</span>
										<span>{{item["CAC"].content[8].val}}</span>
										<span>{{airValue}}</span>
										<span>{{currentAir.density}}</span>
										<span>{{currentAir.viscosity}}</span>
										<span>{{item["CAC"].cp}}</span>
										<span>{{item["CAC"].du}}</span>
									</div>
								</div>
							</div>
							<div style="display: block;">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemThreeShow" @click="qdlqmkItemThreeShow=false" src="../../../static/reduce2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemThreeShow" @click="qdlqmkItemThreeShow=true" src="../../../static/plus2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">LTR</span>
							</div>
							<div v-if="qdlqmkItemThreeShow">
								<div>
									<span>Length</span>
									<span>Height</span>
									<span>Thickness</span>
									<span>No.of Tubes</span>
									<span>No.of Passes</span>
									<span>No.of Raws</span>
									<span>Flow in Front View</span>
									<span>Recirculated Flow</span>
									<span>Primary Inlet Temp</span>
									<span>Auxiliary</span>
									<span>Air Temp
										<el-select @change="airValueChange" v-model="airValue" style="width: 70px;height: 20px;">
											<el-option v-for="(item,index) in airArr" :key="index" :value="item.temperature" :label="item.temperature"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<div v-for="(item,index) in compareList">
										<span>{{item["LTR"].content[5].val}}</span>
										<span>{{item["LTR"].content[6].val}}</span>
										<span>{{item["LTR"].content[7].val}}</span>
										<span>{{item["LTR"].content[2].val}}</span>
										<span>{{item["LTR"].content[3].val}}</span>
										<span>{{item["LTR"].content[4].val}}</span>
										<span>{{item["LTR"].content[0].val}}</span>
										<span>{{item["LTR"].content[1].val}}</span>
										<span>{{item["LTR"].content[9].val}}</span>
										<span>{{item["LTR"].content[8].val}}</span>
										<span>{{airValue}}</span>
										<span>{{currentAir.density}}</span>
										<span>{{currentAir.viscosity}}</span>
										<span>{{item["LTR"].cp}}</span>
										<span>{{item["LTR"].du}}</span>
									</div>
								</div>
							</div>

							<div style="display: block;">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemFourShow" @click="qdlqmkItemFourShow=false" src="../../../static/reduce2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemFourShow" @click="qdlqmkItemFourShow=true" src="../../../static/plus2.png" width="15px"
									 style="cursor: pointer;position: relative;top: 2px;">Radiator"</span>
							</div>
							<div v-if="qdlqmkItemFourShow">
								<div>
									<span>Length</span>
									<span>Height</span>
									<span>Thickness</span>
									<span>Matrix Row No</span>
									<span>Matrix Column No</span>
									<span>Primary Inlet Temp</span>
									<span>Auxiliary</span>
									<span>Air Temp
										<el-select @change="airValueChange" v-model="airValue" style="width: 70px;height: 20px;">
											<el-option v-for="(item,index) in airArr" :key="index" :value="item.temperature" :label="item.temperature"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<div v-for="(item,index) in compareList">
										<span>{{item["Radiator"].content[0].val}}</span>
										<span>{{item["Radiator"].content[1].val}}</span>
										<span>{{item["Radiator"].content[2].val}}</span>
										<span>{{item["Radiator"].content[5].val}}</span>
										<span>{{item["Radiator"].content[6].val}}</span>
										<span>{{item["Radiator"].content[4].val}}</span>
										<span>{{item["Radiator"].content[3].val}}</span>
										<span>{{airValue}}</span>
										<span>{{currentAir.density}}</span>
										<span>{{currentAir.viscosity}}</span>
										<span>{{item["Radiator"].cp}}</span>
										<span>{{item["Radiator"].du}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="title">
							<img v-show="fslqmkShow" @click="fslqmkShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!fslqmkShow" @click="fslqmkShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>风扇冷却模块结果</span>
						</div>
						<div class="compareTableFour" v-if="fslqmkShow">
							<div style="display: block;">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 2px;">风扇冷却模块结果</span>
							</div>
							<div style="display: inline-block;vertical-align: top;">
								<div>
									<span>Fan Type</span>
									<span>Outer Radius</span>
									<span>Inner Radius</span>
									<span>Fan Coffe.A</span>
									<span>Fan Coffe.B</span>
									<span>Fan Coffe.C</span>
									<span>Fan Coffe.D</span>
									<span>Fan Coffe.E</span>
									<span>Fan Coffe.F</span>
								</div>
								<div v-for="(item,index) in compareList">
									<span>{{item["Radiator"].fan[0].val}}</span>
									<span>{{item["Radiator"].fan[1].val}}</span>
									<span>{{item["Radiator"].fan[2].val}}</span>
									<span>{{item["Radiator"].fan[3].val}}</span>
									<span>{{item["Radiator"].fan[4].val}}</span>
									<span>{{item["Radiator"].fan[5].val}}</span>
									<span>{{item["Radiator"].fan[6].val}}</span>
									<span>{{item["Radiator"].fan[7].val}}</span>
									<span>{{item["Radiator"].fan[8].val}}</span>
								</div>
							</div>
							<i-button @click="drawLineTwo" style="margin-top: 10px;" type="primary">查看曲线图</i-button>
							<div style="display: inline-block;width: 600px;height:400px;" id="myChartTwo">
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cxptArr: ['E2-2', 'D2XX'],
				cxmcArr: ['E2LB', 'E2LC', 'D2UB', 'D2SB'],
				cxnfArr: ['MY16', 'MY17', 'MY18'],
				fdjArr: ['L2B', 'L3T', 'L3Z'],
				bsxArr: ['CVT', 'DCT'],
				qdxsArr: ['AWD', 'FWD'],
				zyjArr: ['LHD', 'RHD'],
				pro: {
					valueOne: '',
					valueTwo: '',
					valueThree: '',
					valueFour: '',
					valueFive: '',
					valueSix: '',
					valueSeven: '',
					valueEight: '',
					valueNine: '1.0',
					valueTen: '1.1',
				},
				searchShow: false,
				isCompare: false,
				vehicleValue: '',
				vehicleArr: [],
				compareArr: [],
				pscArr: [],
				pscArrText: [],
				pscArrSim: [],
				pscArrVts: [],
				intakeObj: {
					one: {},
					two: {},
					three: {}
				},
				intakeObjSea: {
					one: {},
					two: {},
					three: {}
				},
				qdlqArr: [],
				navInd: '2',
				qdlqValue: '',
				qdlqId: '',
				fanDataArr: [],
				qdlqDataArr: {
					cds: {
						'0.5': []
					}
				},
				airArr: [],
				airValue: '20',
				airId: '3',
				vehicleId: '',
				dllqxnShow: true,
				dllqxnItemOneShow: true,
				dllqxnItemTwoShow: true,
				dllqxnItemThreeShow: true,
				dllqxnItemFourShow: true,
				dllqxnItemFiveShow: true,
				dllqxnItemSixShow: true,
				qdkkjflShow: true,
				qdkkjflItemOneShow: true,
				qdkkjflItemTwoShow: true,
				qdkkjflItemThreeShow: true,
				qdlqmkShow: true,
				qdlqmkItemOneShow: true,
				qdlqmkItemTwoShow: true,
				qdlqmkItemThreeShow: true,
				qdlqmkItemFourShow: true,
				qdlqmkItemFiveShow: true,
				fslqmkShow: true,
				compareObj: {
					psc: {},
					intake: {},
					qdlqDataArr: {},
					fan: {}
				},
				compareList: [],
				fanViewData: [],
				compareViewData: [],
				CId: ''
			}
		},
		mounted() {
			this._getData()
			// this._getQDLQSelectData()
		},
		methods: {
			toCompare() {
				if (!this.vehicleValue) {
					this.$notify.error({
						title: '错误',
						message: '请选择车型数据'
					});
					return
				}
				if (this.compareArr.length > 0) {
					let a = this.compareArr.toString().indexOf(this.vehicleValue)
					if (a !== -1) {
						this.$notify.error({
							title: '错误',
							message: '当前车型数据已加入对比！'
						});
						return
					} else {
						this.compareArr.push(this.vehicleValue)
						this.isCompare = true
						this.compareArr.forEach((vehicle) => {
							let cObj = {}
							this.compareList = []
							this.axios({
								method: 'get',
								url: `/patac_ras/carModel`,
								headers: {
									'Content-type': 'application/json;charset=UTF-8'
								},
								params: {
									excelName: vehicle
								}
							}).then((resp) => {
								this.axios({
									method: 'get',
									url: `/patac_ras/carModel/all/${resp.data.data.id}/partModel`,
									headers: {
										'Content-type': 'application/json;charset=UTF-8'
									}
								}).then((res) => {
									this.qdlqArr = res.data.data
									this.qdlqValue = res.data.data[0].name
									this.qdlqId = res.data.data[0].id
									this._getAir()
									this.$set(cObj, 'psc', resp.data.data.psc)
									this.$set(cObj, 'intake', this.intakeObj)
									for (let i in this.qdlqArr) {
										this.axios({
											method: 'get',
											url: `/patac_ras/partModel/${this.qdlqArr[i].id}`,
											headers: {
												'Content-type': 'application/json;charset=UTF-8'
											},
											params: {
												advId: this.airId,
												cId: resp.data.data.id
											}
										}).then((res) => {
											this.$set(cObj, 'fan', res.data.data.fan)
											this.$set(cObj, this.qdlqArr[i].name, res.data.data)
										})
									}
									this.compareList.push(cObj)
								})
								this.pscArr = resp.data.data.psc
								// this.pscArrText = []
								// this.pscArrSim = []
								// this.pscArrVts = []
								this.vehicleId = resp.data.data.id
								for (let i in resp.data.data.intake) {
									if (i === "Openning Area & Fan") {
										this.$set(this.intakeObj, "one", resp.data.data.intake[i])
									} else if (i === "FEAF Shutter Open") {
										this.$set(this.intakeObj, "two", resp.data.data.intake[i])
									} else if (i === "FEAF Shutter Closed") {
										this.$set(this.intakeObj, "three", resp.data.data.intake[i])
									}
								}
								// 								for (let i in this.pscArr) {
								// 									for (let o in this.pscArr[i][0]) {
								// 										if (o === 'con' || o === 'exc' || o === 'ext') {
								// 											this.pscArrText.push(this.pscArr[i][0][o])
								// 										}
								// 									}
								// 									for (let o in this.pscArr[i][1]) {
								// 										if (o === 'con' || o === 'exc' || o === 'ext') {
								// 											this.pscArrSim.push(this.pscArr[i][1][o])
								// 										}
								// 									}
								// 									for (let o in this.pscArr[i][2]) {
								// 										if (o === 'con' || o === 'exc' || o === 'ext') {
								// 											this.pscArrVts.push(this.pscArr[i][2][o])
								// 										}
								// 									}
								// 								}
							})
						})
					}
				} else {
					this.compareArr.push(this.vehicleValue)
					this.isCompare = true
					this.compareArr.forEach((vehicle) => {
						this.compare(vehicle)
					})
				}

			},
			compare(vehicle) {
				this.compareList = []
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						excelName: vehicle
					}
				}).then((resp) => {
					this.axios({
						method: 'get',
						url: `/patac_ras/carModel/all/${resp.data.data.id}/partModel`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						}
					}).then((res) => {
						this.qdlqArr = res.data.data
						this.qdlqValue = res.data.data[0].name
						this.qdlqId = res.data.data[0].id
						this._getAir()
						this.$set(this.compareObj, 'psc', resp.data.data.psc)
						this.$set(this.compareObj, 'intake', this.intakeObj)
						for (let i in this.qdlqArr) {
							this.axios({
								method: 'get',
								url: `/patac_ras/partModel/${this.qdlqArr[i].id}`,
								headers: {
									'Content-type': 'application/json;charset=UTF-8'
								},
								params: {
									advId: this.airId,
									cId: resp.data.data.id
								}
							}).then((res) => {
								this.$set(this.compareObj, 'fan', res.data.data.fan)
								this.$set(this.compareObj, this.qdlqArr[i].name, res.data.data)
							})
						}
						this.compareList.push(this.compareObj)
					})
					this.pscArr = resp.data.data.psc
					// 					this.pscArrText = []
					// 					this.pscArrSim = []
					// 					this.pscArrVts = []
					this.vehicleId = resp.data.data.id
					for (let i in resp.data.data.intake) {
						if (i === "Openning Area & Fan") {
							this.$set(this.intakeObj, "one", resp.data.data.intake[i])
						} else if (i === "FEAF Shutter Open") {
							this.$set(this.intakeObj, "two", resp.data.data.intake[i])
						} else if (i === "FEAF Shutter Closed") {
							this.$set(this.intakeObj, "three", resp.data.data.intake[i])
						}
					}
					// 					for (let i in this.pscArr) {
					// 						for (let o in this.pscArr[i][0]) {
					// 							if (o === 'con' || o === 'exc' || o === 'ext') {
					// 								this.pscArrText.push(this.pscArr[i][0][o])
					// 							}
					// 						}
					// 						for (let o in this.pscArr[i][1]) {
					// 							if (o === 'con' || o === 'exc' || o === 'ext') {
					// 								this.pscArrSim.push(this.pscArr[i][1][o])
					// 							}
					// 						}
					// 						for (let o in this.pscArr[i][2]) {
					// 							if (o === 'con' || o === 'exc' || o === 'ext') {
					// 								this.pscArrVts.push(this.pscArr[i][2][o])
					// 							}
					// 						}
					// 					}
				})
			},
			search() {
				this.isCompare = false
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel`,
					headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						platform: this.pro.valueOne,
						name: this.pro.valueTwo,
						year: this.pro.valueThree,
						engine: this.pro.valueFour,
						gearbox: this.pro.valueFive,
						drivenMode: this.pro.valueSix,
						leftRight: this.pro.valueSeven,
					},
				}).then((res) => {
					this.CId = res.data.data.id
					this.pscArr = res.data.data.psc
					this.pscArrText = []
					this.pscArrSim = []
					this.pscArrVts = []
					this.vehicleId = res.data.data.id
					this._getQDLQSelectData(res.data.data.id)
					for (let i in res.data.data.intake) {
						if (i === "Openning Area & Fan") {
							this.$set(this.intakeObjSea, "one", res.data.data.intake[i])
						} else if (i === "FEAF Shutter Open") {
							this.$set(this.intakeObjSea, "two", res.data.data.intake[i])
						} else if (i === "FEAF Shutter Closed") {
							this.$set(this.intakeObjSea, "three", res.data.data.intake[i])
						}
					}
					for (let i in this.pscArr) {
						for (let o in this.pscArr[i][0]) {
							if (o === 'con' || o === 'exc' || o === 'ext') {
								this.pscArrText.push(this.pscArr[i][0][o])
							}
						}
						for (let o in this.pscArr[i][1]) {
							if (o === 'con' || o === 'exc' || o === 'ext') {
								this.pscArrSim.push(this.pscArr[i][1][o])
							}
						}
						for (let o in this.pscArr[i][2]) {
							if (o === 'con' || o === 'exc' || o === 'ext') {
								this.pscArrVts.push(this.pscArr[i][2][o])
							}
						}
					}
					// 					this.compareObj.psc = res.data.data.psc
					// 					this.compareObj.intake = this.intakeObj
					setTimeout(() => {
						this.searchShow = true
					}, 500)
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			_getQDLQSelectData(value) {
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel/all/${value}/partModel`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					this.qdlqArr = res.data.data
					this.qdlqValue = res.data.data[0].name
					this.qdlqId = res.data.data[0].id
					this._getAir()
					if (this.isCompare) {
						this._getQDLQDataCompare(value)
					} else {
						this._getQDLQData()
					}
				})
			},
			qdlqValueChange(value) {
				for (let i in this.qdlqArr) {
					if (this.qdlqArr[i].name === value) {
						this.qdlqId = this.qdlqArr[i].id
						this.axios({
							method: 'get',
							url: `/patac_ras/partModel/${this.qdlqId}`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							params: {
								cId: this.CId,
								advId: this.airId
							}
						}).then((res) => {
							this.qdlqDataArr = res.data.data
						})
					}
				}
			},
			_getQDLQDataCompare(value) {
				for (let i in this.qdlqArr) {
					this.axios({
						method: 'get',
						url: `/patac_ras/partModel/${this.qdlqArr[i].id}`,
						headers: {
							'Content-type': 'application/json;charset=UTF-8'
						},
						params: {
							advId: this.airId,
							cId: value
						}
					}).then((res) => {
						this.compareObj.fan = res.data.data.fan
						this.$set(this.compareObj, this.qdlqArr[i].name, res.data.data)
					})
				}
				this.compareList.push(this.compareObj)
			},
			_getAir() {
				this.axios({
					method: 'get',
					url: `/patac_ras/air/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					this.airArr = res.data.data
					this.currentAir = res.data.data[2]
				})
			},
			airValueChange(value) {
				for (let i in this.airArr) {
					if (this.airArr[i].temperature === value) {
						this.currentAir = this.airArr[i]
						this.airId = this.airArr[i].id
						this.axios({
							method: 'get',
							url: `/patac_ras/partModel/${this.qdlqId}`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							params: {
								cId: this.CId,
								advId: this.airId
							}
						}).then((res) => {
							this.qdlqDataArr = res.data.data
						})
					}
				}
				if (this.isCompare) {
					this.compareArr.forEach((vehicle) => {
						this.compare(vehicle)
					})
				}
			},
			_getQDLQData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/partModel/${this.qdlqId}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						advId: this.airId,
						cId: this.CId
					}
				}).then((res) => {
					this.qdlqDataArr = res.data.data
					this.fanDataArr = res.data.data.fan
					// 					this.compareObj.qdlqDataArr = res.data.data
					// 					this.compareObj.fan = res.data.data.fan
					for (let i in this.compareObj.fan) {
						if (this.compareObj.fan[i].key !== 'Fan Type') {
							this.fanViewData.push(this.compareObj.fan[i].val)
						}
						this.drawLine()
					}
				})
			},
			_getData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel/all/excel`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.vehicleArr = res.data.data
						this.vehicleValue = res.data.data[0]
						this.pro.valueOne = this.vehicleValue.split("_")[0]
						this.pro.valueTwo = this.vehicleValue.split("_")[1]
						this.pro.valueThree = this.vehicleValue.split("_")[2]
						this.pro.valueFour = this.vehicleValue.split("_")[3]
						this.pro.valueFive = this.vehicleValue.split("_")[4]
						this.pro.valueSix = this.vehicleValue.split("_")[5]
						this.pro.valueSeven = this.vehicleValue.split("_")[6]
					}
				})
			},
			vehicleChange(value) {
				this.vehicleValue = value
				this.pro.valueOne = this.vehicleValue.split("_")[0]
				this.pro.valueTwo = this.vehicleValue.split("_")[1]
				this.pro.valueThree = this.vehicleValue.split("_")[2]
				this.pro.valueFour = this.vehicleValue.split("_")[3]
				this.pro.valueFive = this.vehicleValue.split("_")[4]
				this.pro.valueSix = this.vehicleValue.split("_")[5]
				this.pro.valueSeven = this.vehicleValue.split("_")[6]
				if (this.cxptArr.indexOf(this.pro.valueOne) < 0 || this.cxmcArr.indexOf(this.pro.valueTwo) < 0 || this.cxnfArr.indexOf(
						this.pro.valueThree) < 0 ||
					this.fdjArr.indexOf(this.pro.valueFour) < 0 || this.bsxArr.indexOf(this.pro.valueFive) < 0 || this.qdxsArr.indexOf(
						this.pro.valueSix) < 0 ||
					this.zyjArr.indexOf(this.pro.valueSeven) < 0) {
					this.$notify.error({
						title: '错误',
						message: '该车型属性不完整',
						duration: 3000
					});

				}
			},
			closeCompare(item, index) {
				this.compareArr.splice(index, 1)
				if (this.compareArr.length >= 1) {
					this.compareArr.forEach((vehicle) => {
						this.compare(vehicle)
					})
				} else if (this.compareArr.length === 0) {
					this.compareList = []
				}

			},
			changeSelectResultTableThree(value) {
				if (value === '20') {
					this.pro.valueNine = 2.0
					this.pro.valueTen = 2.1
				} else if (value === '30') {
					this.pro.valueNine = 3.0
					this.pro.valueTen = 3.1
				} else {
					this.pro.valueNine = 5.0
					this.pro.valueTen = 5.1
				}
			},
			drawLine() {
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				myChart.setOption({
					xAxis: {
						type: 'category',
						data: [],
						name: ''
					},
					yAxis: {
						type: 'value',
						name: " "
					},
					series: [{
						data: this.fanViewData,
						type: 'line',
						itemStyle: {
							normal: {
								color: "rgb(64, 158, 255)",
							}
						},
					}],
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
				})
			},
			drawLineTwo() {
				this.compareViewData = []
				this.compareList.forEach((item) => {
					let nArr = []
					for (let i in item.fan) {
						if (item.fan[i].key !== 'Fan Type') {
							nArr.push(item.fan[i].val)
						}
					}
					this.compareViewData.push(nArr)
				})
				let myChart = this.$echarts.init(document.getElementById('myChartTwo'))
				let serArr = []
				if (this.compareViewData.length === 1) {
					serArr = [{
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[0]
					}, ]
				} else if (this.compareViewData.length === 2) {
					serArr = [{
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[0]
					}, {
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[1]
					}]
				} else if (this.compareViewData.length === 3) {
					serArr = [{
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[0]
					}, {
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[1]
					}, {
						name: 'one',
						type: 'line',
						smooth: true,
						data: this.compareViewData[2]
					}]
				}
				myChart.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['one', 'two']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
					},
					yAxis: {
						type: 'value'
					},
					series: serArr
				})

			}
		}

	}
</script>

<style scoped="scoped" lang="scss">
	#myChart {
		width: 610px;
		height: 400px;
		margin: 0 auto;
	}

	.vecp_system {
		display: flex;

		/deep/ .el-button.is-circle {
			padding: 2px !important;
		}

		.ivu-btn {
			padding: 5px;
		}

		.ivu-tabs {
			margin-top: 30px;
		}

		.right {
			flex: 1;
			padding: 20px;

			/deep/ .el-button.is-circle {
				padding: 5px;
			}

			/deep/ .el-input__inner {
				height: 26px;
				line-height: 20px;
			}

			/deep/ .el-card__header {
				background: #eff0dc;
				padding: 14px 20px !important;
			}

			/deep/ .el-input__icon {
				line-height: 20px;
			}

			.compareTableThree {
				font-size: 0;

				>div {
					display: inline-block;

					font-size: 0;

					>span {
						font-size: 14px;
					}

					div {
						display: inline-block;
						vertical-align: top;
						font-size: 12px;
						vertical-align: top;

						span {
							width: 130px;
							display: block;
							text-align: left;
							line-height: 30px;
							height: 31px;
							border-right: 1px solid #E4E4E4;
							border-bottom: 1px solid #E4E4E4;
							text-indent: 2px;
						}
					}
				}
			}

			.compareTableFour {
				div {
					div {
						display: inline-block;

						span {
							width: 130px;
							display: block;
							text-align: left;
							line-height: 30px;
							border-right: 1px solid #E4E4E4;
							border-bottom: 1px solid #E4E4E4;
						}
					}
				}
			}

			.compareTableTwo {
				>span {
					display: block;
					background: #d4d4aa;
					line-height: 34px;
					background: #c1a075;
				}

				.compareTableTwoList {
					>div {
						display: inline-block;

						span {
							width: 130px;
							display: block;
							text-align: left;
							line-height: 30px;
							border-right: 1px solid #E4E4E4;
							border-bottom: 1px solid #E4E4E4;
						}
					}
				}
			}

			.button {
				padding-bottom: 5px;
				border-bottom: 1px solid #eff0dc;

				span {
					margin-right: 5px;
					position: relative;
					top: 5px;
				}
			}

			.compareTableOne {

				.compareOneCon,
				.compareOneExc,
				.compareOneExt {
					vertical-align: top;
					display: inline-block;

					span {
						display: block;
						border-right: 1px solid #E4E4E4;
						border-bottom: 1px solid #E4E4E4;
						width: 130px;
						line-height: 30px;
						text-align: center;
						height: 31px;
					}
				}
			}

			.selectList {
				display: inline-block;

				.sec {
					display: inline-block;
					margin-top: 10px;

					span {
						display: inline-block;
						width: 70px;
						text-align: right;
					}
				}
			}

			.compare {
				display: inline-block;
				vertical-align: top;
				margin-top: 10px;
				margin-left: 50px;

				.ivu-card {
					width: 300px;
					margin: 0 auto;

					/deep/ .ivu-card-bordered {
						border-color: #999a86;
					}
				}
			}

			.title {
				margin: 5px 0;

				span {
					color: rgb(112, 48, 160);
					font-size: 16px;
				}
			}

			.resultTableFive {
				margin-top: 30px;
				border: 1px solid #000000;

				>div {
					line-height: 30px;
					display: flex;

					span {
						text-align: center;
						flex: 1;
						border-right: 1px solid #E4E4E4;
						border-bottom: 1px solid #E4E4E4;

						&:last-child {
							border-right: none;
						}
					}
				}
			}

			.resultTableFour {
				border: 1px solid #000000;
				margin-top: 00px;

				.sec {
					width: 300px;
					display: flex;

					span {
						flex: 1;
						width: 100px;
						line-height: 40px;
						height: 40px;
						border-bottom: 1px solid #E4E4E4;
						border-right: 1px solid #E4E4E4;
						text-align: center;

						&:last-child {
							border-right: none;
						}
					}
				}
			}

			.resultTableThree {
				border: 1px solid #000000;

				.threeList {
					display: flex;

					div {
						flex: 1;
						display: flex;
						line-height: 30px;
						border-bottom: 1px solid #E4E4E4;

						/*&:last-child {
							border-bottom: none;
						}*/
						span {
							flex: 1;
							border-right: 1px solid #E4E4E4;
							text-align: center;
						}
					}
				}
			}

			.resultTableTwo {
				border: 1px solid #000000;

				.twoTitle,
				.twoList {
					line-height: 30px;
					display: flex;

					div {
						flex: 1;
						text-align: center;
						border-right: 1px solid #E4E4E4;

						&:nth-child(2) {
							flex: 2;
						}

						&:last-child {
							border-right: none;
						}
					}
				}

				.twoList {
					div {
						display: flex;

						span {
							flex: 1;
							border-right: 1px solid #E4E4E4;
							border-top: 1px solid #E4E4E4;

							&:last-child {
								border-right: none;
							}
						}
					}
				}
			}

			.resultTable {
				border: 1px solid #000000;

				.topTitle {
					display: flex;

					div {
						flex: 1;

						&:first-child {
							flex: 0 60px;
						}

						>div {
							display: flex;
							border-left: 1px solid #E4E4E4;
							line-height: 30px;

							span {
								flex: 1;
								text-align: center;
								border-right: 1px solid #E4E4E4;

								&:last-child {
									border-right: none;
								}
							}
						}

						.top {
							border-bottom: 1px solid #E4E4E4;
							line-height: 30px;
						}
					}
				}

				.tableList {
					display: flex;
					border-top: 1px solid #E4E4E4;

					>div {
						flex: 1;
						display: flex;
						line-height: 30px;

						&:first-child {
							flex: 0 60px;
						}

						>span {
							flex: 1;
							text-align: center;
							border-left: 1px solid #E4E4E4;
						}
					}
				}
			}
		}
	}
</style>
