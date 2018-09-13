<template>
	<div class="default">
		<div class="right">
			<div class="form">
				<el-card class="box-card">
					<div slot="header" class="clearfix" style="text-align: left;">
						<el-cascader :options="options" v-model="selectedOptions" @change="typeChange">
						</el-cascader>
						<el-button style="float: right;position: relative;top: 5px;margin-left: 10px;  height: 32px;line-height: 1px;" type="danger"
						    @click="_deleteItem">删除</el-button>
						<el-button style="float: right;position: relative;top: 5px;height: 32px;line-height: 1px;" v-show="!materialShow" type="primary"
						    @click="_addItem">添加</el-button>
						<el-button v-show="bpShow ||materialShow || carpettempShow||airShow ||dllqShow" style="float: right;position: relative;top: 5px; height: 32px;line-height: 1px; "
						    type="success" @click="importFile">导入</el-button>
						<el-button v-show="bpShow ||materialShow || carpettempShow ||airShow ||dllqShow" style="float: right;position: relative;top: 5px;height: 32px;line-height: 1px; "
						    type="warning" @click="exportFile">导出</el-button>
					</div>
					<div style="position: relative;">
						<div class="formList" v-if="qiShow">
							<el-table ref="multipleTable" :data="formList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="40">
								</el-table-column>
								<el-table-column type="index" width="50" label="no.">
								</el-table-column>
								<el-table-column v-for="(item,index) in formListTitle" :key="index" v-if="index!=='id'" :prop="index" :label="index" min-width="120">
								</el-table-column>
								<el-table-column prop="name" label="操作" min-width="120">
									<template slot-scope="scope">
										<el-button size="mini" @click="modifyListItem(scope.$index, scope.row)">编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="bp_formList" v-if="bpShow">
							<el-table ref="multipleTable" :data="bpFormList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="40">
								</el-table-column>
								<el-table-column type="index" width="50" label="no.">
								</el-table-column>
								<el-table-column prop="vpps1" label="vpps_1" width="120">
								</el-table-column>
								<el-table-column prop="vpps2" label="VPPS_2" width="120">
								</el-table-column>
								<el-table-column prop="parts" label="Parts" width="120">
								</el-table-column>
								<el-table-column prop="p_1" label="D1" width="80">
								</el-table-column>
								<el-table-column prop="p_2" label="D2" width="80">
								</el-table-column>
								<el-table-column prop="p_3" label="D3" width="80">
								</el-table-column>
								<el-table-column prop="distance" label="Distance" min-width="120">
								</el-table-column>
								<el-table-column prop="name" label="操作" width="120">
									<template slot-scope="scope">
										<el-button size="mini" @click="modifyListItem(scope.$index, scope.row)">编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="material_formList" v-if="materialShow">
							<div class="listTitle">
								<span> </span>
								<span v-for="(item,index) in formListTitle">{{index}}</span>
								<span>操作</span>
							</div>
							<div class="list" v-for="(item,ind) in formList">
								<span v-if="ind<8">{{ind*10+10}}</span>
								<span v-if="ind===8">100</span>
								<span v-if="ind===9">120</span>
								<span v-if="ind===10">150</span>
								<span v-for="(list,index) in item" v-if="index!= 'id'">
									{{list}}
								</span>
								<span>
									<el-button @click="modifyListItem(ind,item)">编辑</el-button>
								</span>
							</div>
						</div>
						<div class="carpettemp_formList" v-if="carpettempShow">
							<el-table ref="multipleTable" :data="carpettempFormList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="40">
								</el-table-column>
								<el-table-column type="index" label="no." min-width="50">
								</el-table-column>
								<el-table-column prop="material" label="material" min-width="120">
								</el-table-column>
								<el-table-column prop="conductivity" label="Conductivity [w/m²*k]" min-width="120">
								</el-table-column>
								<el-table-column prop="specificHeat" label="Specific Heat [J/kg*k]" min-width="120">
								</el-table-column>
								<el-table-column prop="density" label="Density[kg/m³]" min-width="80">
								</el-table-column>
								<el-table-column prop="name" label="操作" min-width="120">
									<template slot-scope="scope">
										<el-button size="mini" @click="modifyListItem(scope.$index, scope.row)">编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div v-if="dllqShow">
							<div class="selectList" style="margin-top: 10px;">
								<div>
									<span style="margin-left: 10px;">车型数据：</span>
									<el-select v-model="vehicleValue" filterable placeholder="请选择" @change="vehicleChange" style="width: 400px;">
										<el-option v-for="(item,index) in vehicleArr" :key="index" :label="item" :value="item">
										</el-option>
									</el-select>
									<span style="margin-left: 50px;">数据表：</span>
									<el-select v-model="sjbValue" filterable placeholder="请选择" style="width: 400px;">
										<el-option v-for="(item,index) in sjbArr" :key="index" :label="item" :value="item">
										</el-option>
									</el-select>
									<el-button @click="dllqSearch">查询</el-button>
								</div>
								<div class="sec">
									<span>车型平台：</span>
									<el-select v-model="pro.valueOne">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>车型名称：</span>
									<el-select v-model="pro.valueTwo">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>车型年份：</span>
									<el-select v-model="pro.valueThree">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>发动机：</span>
									<el-select v-model="pro.valueFour">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>变速箱：</span>
									<el-select v-model="pro.valueFive">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>驱动形式：</span>
									<el-select v-model="pro.valueSix">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
								<div class="sec">
									<span>左/右驾：</span>
									<el-select v-model="pro.valueSeven">
										<el-option value="" label=""></el-option>
									</el-select>
								</div>
							</div>
							<div class="resultTable" v-if="pscShow">
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
							<div class="resultTableTwo" v-if="feafShow">
								<div class="twoTitle">
									<div>Openging(cm2)</div>
									<div>Shutter Open(CMM)</div>
									<div>Shutter Close(CMM)</div>
								</div>
								<div class="twoList">
									<div>
										<span style="background: rgb(240,249,235);">总体开口面积</span>
										<span>{{intakeObj.one[0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">{{intakeObj.two[0].key}}</span>
										<span>{{intakeObj.two[0].val}}</span>
										<span style="background: rgb(240,249,235);">{{intakeObj.two[1].key}}</span>
										<span>{{intakeObj.two[1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">{{intakeObj.three[0].key}}</span>
										<span>{{intakeObj.three[0].val}}</span>
									</div>
								</div>
								<div class="twoList">
									<div>
										<span style="background: rgb(240,249,235);">正投影面积</span>
										<span>{{intakeObj.one[1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">{{intakeObj.two[2].key}}</span>
										<span>{{intakeObj.two[2].val}}</span>
										<span style="background: rgb(240,249,235);">{{intakeObj.two[3].key}}</span>
										<span>{{intakeObj.two[3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">{{intakeObj.three[1].key}}</span>
										<span>{{intakeObj.three[1].val}}</span>
									</div>
								</div>
								<div class="twoList">
									<div>
										<span style="background: rgb(240,249,235);">风扇功率</span>
										<span>{{intakeObj.one[2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);" v-if="intakeObj.two[4]">{{intakeObj.two[4].key}}</span>
										<span v-if="intakeObj.two[4]">{{intakeObj.two[4].val}}</span>
										<span style="background: rgb(240,249,235);" v-if="intakeObj.two[5]">{{intakeObj.two[5].key}}</span>
										<span v-if="intakeObj.two[5]">{{intakeObj.two[5].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">{{intakeObj.three[2].key}}</span>
										<span>{{intakeObj.three[2].val}}</span>
									</div>
								</div>
							</div>
							<div class="resultTableThree" v-if="crfmShow">
								<p style="line-height: 40px;font-size: 18px;">CAC Parameters</p>
								<div class="threeList">
									<div>
										<span style="background: rgb(240,249,235);">Flow in Front View</span>
										<span>{{dllqData.part["CAC Parameters"][0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Recirculated Flow</span>
										<span>{{dllqData.part["CAC Parameters"][1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Tubes</span>
										<span>{{dllqData.part["CAC Parameters"][2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Passes</span>
										<span>{{dllqData.part["CAC Parameters"][3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Raws</span>
										<span>{{dllqData.part["CAC Parameters"][4].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Length(mm)</span>
										<span>{{dllqData.part["CAC Parameters"][5].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Height(mm)</span>
										<span>{{dllqData.part["CAC Parameters"][6].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Thickness</span>
										<span>{{dllqData.part["CAC Parameters"][7].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Auxiliary Inlet Temp</span>
										<span>{{dllqData.part["CAC Parameters"][8].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Primary Inlet Temp</span>
										<span>{{dllqData.part["CAC Parameters"][9].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Row No.</span>
										<span>{{dllqData.part["CAC Parameters"][10].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Column No.</span>
										<span>{{dllqData.part["CAC Parameters"][11].val}}</span>
									</div>
								</div>
								<p style="line-height: 40px;font-size: 18px;">Condenser Parameters</p>
								<div class="threeList">
									<div>
										<span style="background: rgb(240,249,235);">Flow in Front View</span>
										<span>{{dllqData.part["Condenser Parameters"][0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Recirculated Flow</span>
										<span>{{dllqData.part["Condenser Parameters"][1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Tubes</span>
										<span>{{dllqData.part["Condenser Parameters"][2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Passes</span>
										<span>{{dllqData.part["Condenser Parameters"][3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Raws</span>
										<span>{{dllqData.part["Condenser Parameters"][4].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Length(mm)</span>
										<span>{{dllqData.part["Condenser Parameters"][5].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Height(mm)</span>
										<span>{{dllqData.part["Condenser Parameters"][6].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Thickness</span>
										<span>{{dllqData.part["Condenser Parameters"][7].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Auxiliary Inlet Temp</span>
										<span>{{dllqData.part["Condenser Parameters"][8].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Primary Inlet Temp</span>
										<span>{{dllqData.part["Condenser Parameters"][9].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Row No.</span>
										<span>{{dllqData.part["Condenser Parameters"][10].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Column No.</span>
										<span>{{dllqData.part["Condenser Parameters"][11].val}}</span>
									</div>
								</div>
								<p style="line-height: 40px;font-size: 18px;">LTR Parameters</p>
								<div class="threeList">
									<div>
										<span style="background: rgb(240,249,235);">Flow in Front View</span>
										<span>{{dllqData.part["LTR Parameters"][0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Recirculated Flow</span>
										<span>{{dllqData.part["LTR Parameters"][1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Tubes</span>
										<span>{{dllqData.part["LTR Parameters"][2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Passes</span>
										<span>{{dllqData.part["LTR Parameters"][3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">No. of Raws</span>
										<span>{{dllqData.part["LTR Parameters"][4].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Length(mm)</span>
										<span>{{dllqData.part["LTR Parameters"][5].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Height(mm)</span>
										<span>{{dllqData.part["LTR Parameters"][6].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Thickness</span>
										<span>{{dllqData.part["LTR Parameters"][7].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Auxiliary Inlet Temp</span>
										<span>{{dllqData.part["LTR Parameters"][8].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Primary Inlet Temp</span>
										<span>{{dllqData.part["LTR Parameters"][9].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Row No.</span>
										<span>{{dllqData.part["LTR Parameters"][10].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Column No.</span>
										<span>{{dllqData.part["LTR Parameters"][11].val}}</span>
									</div>
								</div>
								<p style="line-height: 40px;font-size: 18px;">Radiator Parameters</p>
								<div class="threeList">
									<div>
										<span style="background: rgb(240,249,235);">Length(mm)</span>
										<span>{{dllqData.part["LTR Parameters"][0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Height(mm)</span>
										<span>{{dllqData.part["LTR Parameters"][1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Thickness(mm)</span>
										<span>{{dllqData.part["LTR Parameters"][2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Auxiliary Inlet Temp</span>
										<span>{{dllqData.part["LTR Parameters"][3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Primary Inlet Temp</span>
										<span>{{dllqData.part["LTR Parameters"][4].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Row No.</span>
										<span>{{dllqData.part["LTR Parameters"][5].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">Matrix Column No.</span>
										<span>{{dllqData.part["LTR Parameters"][6].val}}</span>
									</div>
								</div>
								<p style="line-height: 40px;font-size: 18px;">Fan</p>
								<span v-if="dllqData.part.Fan.length ===0">无</span>
								<div class="threeList" v-if="dllqData.part.Fan.length >0">
									<div>
										<span style="background: rgb(240,249,235);">Fan Type</span>
										<span style="width: 120px;">{{dllqData.part["Fan"][0].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">DriverSide Outer Radiaus</span>
										<span>{{dllqData.part["Fan"][1].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">DriverSide Ineer Radiaus</span>
										<span>{{dllqData.part["Fan"][2].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">PassengerSide Outer Radiaus</span>
										<span>{{dllqData.part["Fan"][3].val}}</span>
									</div>
									<div>
										<span style="background: rgb(240,249,235);">PassengerSide Inner Radiaus</span>
										<span>{{dllqData.part["Fan"][4].val}}</span>
									</div>
								</div>
							</div>
							<div v-if="conHrShow" style="margin-top: 10px;">
								<div style="display: flex;border-top: 1px solid #E4E4E4;line-height: 30px;">
									<span style="flex: 1;text-align: center;" v-for="(item,index) in dllqData.endHR['Condenser Parameters'][0]">{{index}}</span>
								</div>
								<div style="display: flex;" v-for="item in dllqData.endHR['Condenser Parameters'] ">
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Inlet\n Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Refrigerant Outlet\nPressure(Pa-Gage)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Sample"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Outlet\nTemp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Volumn \nFlow Rate(m3/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Pressure\nDrop(Pa)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Refrigerant Mass \nAir Flow Rate(m3/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Percent Oil\nRecirculation(%)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Refrigerant Inlet\n Pressure(Pa-Gage)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Refrigerant Inlet Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Inlet \nRelative Humidity(%)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Refrigerant \nOutlet Temp.(C)"]}}</span>
								</div>
							</div>
							<div v-if="cacHrShow" style="margin-top: 10px;">
								<div style="display: flex;border-top: 1px solid #E4E4E4;line-height: 30px;">
									<span style="flex: 1;text-align: center;" v-for="(item,index) in dllqData.endHR['CAC Parameters'][0]">{{index}}</span>
								</div>
								<div style="display: flex;" v-for="item in dllqData.endHR['CAC Parameters'] ">
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Charged Air Mass \nAir Flow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Heat Transfer Rate(W)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Charged Air Inlet Pressure(Pa-Gage)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Charged Air\nInlet Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Cooling Air\nPressure Drop(Pa)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Sample"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["(Optional)\nCharged Air Re Number"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Cooling Air Inlet Pressure(Pa-Gage)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Cooling Air Mass \nFlow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Cooling Air\nInlet Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Charged Air\nPressure Drop(Pa)"]}}</span>
								</div>
							</div>
							<div v-if="ltrHrShow" style="margin-top: 10px;">
								<div style="display: flex;border-top: 1px solid #E4E4E4;line-height: 30px;">
									<span style="flex: 1;text-align: center;" v-for="(item,index) in dllqData.endHR['LTR Parameters'][0]">{{index}}</span>
								</div>
								<div style="display: flex;" v-for="item in dllqData.endHR['LTR Parameters'] ">
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["(Optional)\nLuquid Re Number"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Heat Transfer Rate(W)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Sample"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Liquid Mass\nFlow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Inlet Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Pressure\nDrop(Pa)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Mass \nFlow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Liquid Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Luquid Pressure\nDrop(Pa)"]}}</span>
								</div>
							</div>
							<div v-if="rdHrShow" style="margin-top: 10px;">
								<div style="display: flex;border-top: 1px solid #E4E4E4;line-height: 30px;">
									<span style="flex: 1;text-align: center;" v-for="(item,index) in dllqData.endHR['Radiator Parameters'][0]">{{index}}</span>
								</div>
								<div style="display: flex;" v-for="item in dllqData.endHR['Radiator Parameters'] ">
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["(Optional)\nLuquid Re Number"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Heat Transfer Rate(W)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Sample"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Liquid Mass\nFlow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Inlet Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Pressure\nDrop(Pa)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Air Mass \nFlow Rate(kg/s)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Liquid Temp.(C)"]}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item["Luquid Pressure\nDrop(Pa)"]}}</span>
								</div>
							</div>
							<div v-if="pqShow" style="margin-top: 10px;">
								<div style="display: flex;border-top: 1px solid #E4E4E4;line-height: 30px;">
									<span style="flex: 1;text-align: center;" v-for="(item,index) in dllqData.endPQ[0]">{{index}}</span>
								</div>
								<div style="display: flex;" v-for="item in dllqData.endPQ">
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.cac}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.condenser}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.fan}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.feaf}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.ltr}}</span>
									<span style="flex: 1;border-top: 1px solid #E4E4E4;line-height: 30px;text-align: center;">{{item.radiator}}</span>
								</div>
							</div>
						</div>
						<div class="material_formList" v-if="airShow">
							<el-table ref="multipleTable" :data="airFormList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="40">
								</el-table-column>
								<el-table-column type="index" label="no." min-width="50">
								</el-table-column>
								<el-table-column prop="temperature" label="Temperature [℃]" min-width="120">
								</el-table-column>
								<el-table-column prop="density" label="Density[kg/m³]" min-width="120">
								</el-table-column>
								<el-table-column prop="viscosity" label="viscosity []" min-width="120">
								</el-table-column>
								<el-table-column prop="name" label="操作" min-width="120">
									<template slot-scope="scope">
										<el-button size="mini" @click="modifyListItem(scope.$index, scope.row)">编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<Spin size="large" fix v-if="spinShow"></Spin>
					</div>
				</el-card>
				<div class="block" style="margin-top: 20px;">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
					    :total="pageCount">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="添加" :visible.sync="dialogCarpettempAdd" class="modifyDialog">
			<div>
				<Form ref="formValiDt" :model="addListItemDt" :rules="ruleDt" :label-width="160">
					<FormItem label="Material" prop="Material">
						<Input v-model="addListItemDt.Material"></Input>
					</FormItem>
					<FormItem label="Conductivity" prop="Conductivity">
						<Input v-model="addListItemDt.Conductivity" number>
						<span slot="append">[w/m²*k]</span>
						</Input>
					</FormItem>
					<FormItem label="Specific heat" prop="Specificheat">
						<Input v-model="addListItemDt.Specificheat" number>
						<span slot="append">[kg/m³]</span>
						</Input>
					</FormItem>
					<FormItem label="Density" prop="Density">
						<Input v-model="addListItemDt.Density" number>
						<span slot="append">[J/kg*k]</span>
						</Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCarpettempAdd = false">取 消</el-button>
				<el-button type="success" @click="_addCarpettempListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogAirAdd" class="modifyDialog">
			<div>
				<Form ref="formValAir" :model="addListItemAir" :rules="ruleAir" :label-width="160">
					<FormItem label="Temperature" prop="temperature">
						<Input v-model="addListItemAir.temperature" number>
						<span slot="append">[w/m²*k]</span>
						</Input>
					</FormItem>
					<FormItem label="Density" prop="density">
						<Input v-model="addListItemAir.density" number>
						<span slot="append">[kg/m³]</span>
						</Input>
					</FormItem>
					<FormItem label="viscosity" prop="viscosity">
						<Input v-model="addListItemAir.viscosity" number></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAirAdd = false">取 消</el-button>
				<el-button type="success" @click="_addAirListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogBpAdd" class="modifyDialog">
			<div>
				<Form ref="formValiBp" :model="addListItemBp" :rules="ruleBp" :label-width="160">
					<FormItem label="vpps_1" prop="vpps1">
						<Input v-model="addListItemBp.vpps1"></Input>
					</FormItem>
					<FormItem label="vpps_2" prop="vpps2">
						<Input v-model="addListItemBp.vpps2"></Input>
					</FormItem>
					<FormItem label="Parts" prop="parts">
						<Input v-model="addListItemBp.parts"></Input>
					</FormItem>
					<FormItem label="D1" prop="p_1">
						<Input v-model="addListItemBp.p_1" number></Input>
					</FormItem>
					<FormItem label="D2" prop="p_2">
						<Input v-model="addListItemBp.p_2" number></Input>
					</FormItem>
					<FormItem label="D3" prop="p_3">
						<Input v-model="addListItemBp.p_3" number></Input>
					</FormItem>
					<FormItem label="Distance" prop="distance">
						<Input v-model="addListItemBp.distance"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogBpAdd = false">取 消</el-button>
				<el-button type="success" @click="_addBpListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="modifyDialog">
			<div>
				<div class="sec" v-for="(item,index) in addListItemSlot">
					<span>{{index}}</span>
					<el-input style="display: inline-block; width: 300px;" v-model="addListItemSlot[index]"></el-input>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="success" @click="_addListItemSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="dialogModify" class="modifyDialog">
			<div v-if="materialShow ">
				<Form ref="formValiMateril" :model="currentModify" :rules="ruleMaterial" :label-width="160">
					<FormItem label="200" prop="200">
						<Input v-model="currentModify[200]" number></Input>
					</FormItem>
					<FormItem label="250" prop="250">
						<Input v-model="currentModify[250]" number></Input>
					</FormItem>
					<FormItem label="300" prop="300">
						<Input v-model="currentModify[300]" number></Input>
					</FormItem>
					<FormItem label="350" prop="350">
						<Input v-model="currentModify[350]" number></Input>
					</FormItem>
					<FormItem label="400" prop="400">
						<Input v-model="currentModify[400]" number></Input>
					</FormItem>
					<FormItem label="450" prop="450">
						<Input v-model="currentModify[450]" number></Input>
					</FormItem>
					<FormItem label="500" prop="500">
						<Input v-model="currentModify[500]" number></Input>
					</FormItem>
					<FormItem label="550" prop="550">
						<Input v-model="currentModify[550]" number></Input>
					</FormItem>
					<FormItem label="600" prop="600">
						<Input v-model="currentModify[600]" number></Input>
					</FormItem>
					<FormItem label="650" prop="650">
						<Input v-model="currentModify[650]" number></Input>
					</FormItem>
					<FormItem label="700" prop="700">
						<Input v-model="currentModify[700]" number></Input>
					</FormItem>
					<FormItem label="750" prop="750">
						<Input v-model="currentModify[750]" number></Input>
					</FormItem>
				</Form>
			</div>
			<div v-if="bpShow">
				<div class="sec">
					<Form ref="formValiBp" :model="currentModify" :rules="ruleBp" :label-width="160">
						<FormItem label="vpps_1" prop="vpps1">
							<Input v-model="currentModify.vpps1"></Input>
						</FormItem>
						<FormItem label="vpps_2" prop="vpps2">
							<Input v-model="currentModify.vpps2"></Input>
						</FormItem>
						<FormItem label="Parts" prop="parts">
							<Input v-model="currentModify.parts"></Input>
						</FormItem>
						<FormItem label="D1" prop="p_1">
							<Input v-model="currentModify.p_1" number></Input>
						</FormItem>
						<FormItem label="D2" prop="p_2">
							<Input v-model="currentModify.p_2" number></Input>
						</FormItem>
						<FormItem label="D3" prop="p_3">
							<Input v-model="currentModify.p_3" number></Input>
						</FormItem>
						<FormItem label="Distance" prop="distance">
							<Input v-model="currentModify.distance"></Input>
						</FormItem>
					</Form>
				</div>
			</div>
			<div v-if="carpettempShow ">
				<div class="sec">
					<Form ref="formValiDt" :model="currentModify" :rules="ruleDt" :label-width="160">
						<FormItem label="Material" prop="material">
							<Input v-model="currentModify.material"></Input>
						</FormItem>
						<FormItem label="Conductivity" prop="conductivity">
							<Input v-model="currentModify.conductivity" number>
							<span slot="append">[w/m²*k]</span>
							</Input>
						</FormItem>
						<FormItem label="Specific heat" prop="specificHeat">
							<Input v-model="currentModify.specificHeat" number>
							<span slot="append">[kg/m³]</span>
							</Input>
						</FormItem>
						<FormItem label="Density" prop="density">
							<Input v-model="currentModify.density" number>
							<span style="width: 50px;" slot="append">[J/kg*k]</span>
							</Input>
						</FormItem>
					</Form>
				</div>
			</div>
			<div v-if="airShow">
				<div class="sec">
					<Form ref="formValiAir" :model="currentModify" :rules="ruleAir" :label-width="160">
						<FormItem label="Temperature" prop="temperature">
							<Input v-model="currentModify.temperature" number>
							<span slot="append">[w/m²*k]</span>
							</Input>
						</FormItem>
						<FormItem label="Density" prop="density">
							<Input v-model="currentModify.density" number>
							<span slot="append">[kg/m³]</span>
							</Input>
						</FormItem>
						<FormItem label="viscosity" prop="viscosity">
							<Input v-model="currentModify.viscosity" number>
							</Input>
						</FormItem>
					</Form>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogModify = false">取 消</el-button>
				<el-button type="success" @click="_modifySubmit()" v-if="qiShow">确定</el-button>
				<el-button type="success" @click="_modifyBpSubmit()" v-if="bpShow">确定</el-button>
				<el-button type="success" @click="_modifyMaterialSubmit()" v-if="materialShow">确定</el-button>
				<el-button type="success" @click="_modifyCarpettempSubmit()" v-if="carpettempShow">确定</el-button>
				<el-button type="success" @click="_modifyAirSubmit()" v-if="airShow">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogDllqImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/carModel/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" accept=".xls,.xlsx" :file-list="fileList" :on-error="handleFileError" :on-preview="handlePreview"
			    :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogDllqImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogBpImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/bpData/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" accept=".xls,.xlsx" :file-list="fileList" :on-error="handleFileError" :on-preview="handlePreview"
			    :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogBpImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogAirImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/air/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" accept=".xls,.xlsx" :file-list="fileList" :on-error="handleFileError" :on-preview="handlePreview"
			    :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAirImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogCarpettempImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/carpettemp/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" accept=".xls,.xlsx" :file-list="fileList" :on-error="handleFileError" :on-preview="handlePreview"
			    :on-remove="handleRemove" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCarpettempImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入文件" :visible.sync="dialogMaterialImportFile" class="modifyDialog">
			<el-upload ref="upload" class="upload-demo" drag action="http://39.107.243.101:7070/material/upload" :on-success="handleFileSuccess"
			    :auto-upload="false" accept=".xls,.xlsx" :file-list="fileList" :on-error="handleFileError" :on-preview="handlePreview"
			    :on-remove="handleRemove">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogMaterialImportFile = false">取 消</el-button>
				<el-button type="success" @click="submitUpload">上传</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			const validate_Density = (rule, value, callback) => {
				console.log(value, 1)
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {

					if (value < 0) {
						callback(new Error('Please enter a numeric value'));
					} else {
						callback();
					}
				}
			};
			const validate_200 = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {

					if (value < 0) {
						callback(new Error('Please enter a numeric value'));
					} else {
						callback();
					}
				}
			};
			const validate_p_1 = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				if (typeof (value) !== 'number') {
					callback(new Error('Please enter a numeric value'));
				} else {

					if (value < 0) {
						callback(new Error('Please enter a numeric value'));
					} else {
						callback();
					}
				}
			};
			const validate_distance = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Age cannot be empty'));
				}
				let newValue = value.split(',')
				let a = 0
				newValue.forEach((item) => {
					if (isNaN(item)) {
						return callback(new Error('Age cannot be empty'));
						++a;
					}
				})
				if (a === 0) {
					callback();
				}
			};
			return {
				navInd: '4-3',
				qiShow: true,
				bpShow: false,
				materialShow: false,
				carpettempShow: false,
				dllqShow: false,
				dialogBpAdd: false,
				dialogAirAdd: false,
				airShow: false,
				dialogMaterialImportFile: false,
				dialogFormVisible: false,
				dialogModify: false,
				dialogBpImportFile: false,
				dialogDllqImportFile: false,
				dialogCarpettempAdd: false,
				dialogCarpettempImportFile: false,
				dialogAirImportFile: false,
				spinShow: false,
				fileList: [],
				bpFormList: [],
				airFormList: [],
				materialTypes: [],
				carpettempFormList: [],
				multipleSelection: [],
				addListItemBp: {
					'distance': '',
					'p_1': '',
					'p_2': '',
					'p_3': '',
					'parts': '',
					'vpps1': '',
					'vpps2': '',
				},
				pscArrText: [],
				pscArrSim: [],
				pscArrVts: [],
				dllqData: {},
				ruleMaterial: {
					200: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					250: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					300: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					350: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					400: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					450: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					500: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					550: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					600: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					650: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					700: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
					750: [{
						required: true,
						validator: validate_200,
						trigger: 'change'
					}],
				},
				ruleBp: {
					vpps1: [{
						required: true,
						trigger: 'change'
					}],
					vpps2: [{
						required: true,
						trigger: 'change'
					}],
					parts: [{
						required: true,
						trigger: 'change'
					}],
					p_1: [{
						required: true,
						validator: validate_p_1,
						trigger: 'change'
					}],
					p_2: [{
						required: true,
						validator: validate_p_1,
						trigger: 'change'
					}],
					p_3: [{
						required: true,
						validator: validate_p_1,
						trigger: 'change'
					}],
					distance: [{
						required: true,
						validator: validate_distance,
						trigger: 'blur'
					}],
				},
				addListItemDt: {
					'Material': '',
					'Conductivity': '',
					'Specific heat': '',
					'Density': '',
				},
				addListItemAir: {
					'density': '',
					'temperature': '',
					'viscosity': ''
				},
				ruleAir: {
					density: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					temperature: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					viscosity: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
				},
				ruleDt: {
					Density: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					density: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					Conductivity: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					conductivity: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					Specificheat: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					specificHeat: [{
						required: true,
						validator: validate_Density,
						trigger: 'change'
					}],
					material: [{
						required: true,
						trigger: 'change'
					}],
					Material: [{
						required: true,
						trigger: 'change'
					}],
				},
				options: [{
						value: '底盘排气系统',
						label: '底盘排气系统',
						children: [{
							value: 'CellZone',
							label: 'CellZone',
						}, {
							value: 'Prous',
							label: 'Prous',
						}, {
							value: 'MassFlowInlet',
							label: 'MassFlowInlet',
						}, {
							value: 'PressureOutlet',
							label: 'PressureOutlet',
						}, {
							value: 'CoupledWall',
							label: 'CoupledWall',
						}, {
							value: 'ConvectionWall',
							label: 'ConvectionWall',
						}, {
							value: 'Interior',
							label: 'Interior',
						}]
					},
					{
						value: '底盘进气系统',
						label: '底盘进气系统',
						children: [{
							value: 'CellZone_jq',
							label: 'CellZone',
						}, {
							value: 'Prous_jq',
							label: 'Prous',
						}, {
							value: 'PressureInlet',
							label: 'PressureInlet',
						}, {
							value: 'VelocityInlet',
							label: 'VelocityInlet',
						}, {
							value: 'Interior_jq',
							label: 'Interior',
						}]
					},
					{
						value: '零件温度预测系统',
						label: '零件温度预测系统',
						children: [{
							value: 'BP数据',
							label: 'BP数据',
						}, {
							value: '材料温测数据',
							label: '材料温测数据',
							children: []
						}, ],
					},
					{
						value: '人体接触温度评估系统',
						label: '人体接触温度评估系统',
						children: [{
							value: '地毯材料属性',
							label: '地毯材料属性',
						}]
					},
					{
						value: '动力冷却性能数据',
						label: '动力冷却性能数据',
						children: [{
							value: '动力冷却性能数据',
							label: '动力冷却性能数据	',
						}, {
							value: '空气属性数据',
							label: '空气属性数据',
						}]
					}

				],
				selectedOptions: ["底盘排气系统", "CellZone"],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				paiqiType: 'CellZone',
				formList: [],
				currentModify: [],
				selectValues: [
					"零件温度预测系统",
					"材料温测数据",
					"plastic",
					"H5-T88"
				],
				formListTitle: {},
				addListItemSlot: {},
				currentPage: 1,
				pageCount: 0,
				pageSize: 10,
				vehicleValue: '',
				sjbValue: 'PSC',
				vehicleArr: [],
				pro: {
					valueOne: '',
					valueTwo: '',
					valueThree: '',
					valueFour: '',
					valueFive: '',
					valueSix: '',
					valueSeven: '',
					valueEight: '',
				},
				sjbArr: ['PSC', 'FEAF', 'CRFM_Configuraion', 'Condenser_HR', 'CRFM_PQ', 'CAC_HR', 'LTR_HR', 'Radiator_HR'],
				pscShow: false,
				feafShow: false,
				crfmShow: false,
				conHrShow: false,
				cacHrShow: false,
				ltrHrShow: false,
				rdHrShow: false,
				pqShow: false,
				intakeObj: {
					one: {},
					two: {},
					three: {}
				}

			}
		},
		filters: {
			modifyFilter: function (value) {
				switch (value) {
					case 'p_1':
						return 'D1'
						break;
					case 'p_2':
						return 'D2'
						break;
					case 'p_3':
						return 'D3'
						break;
					case 'distance':
						return 'Distance'
						break;
					case 'vpps1':
						return 'vpps_1'
						break;
					case 'vpps2':
						return 'vpps_2'
						break;
					case 'conductivity':
						return 'Conductivity'
						break;
					case 'specificHeat':
						return 'Specific heat'
						break;
					case 'material':
						return 'Material'
						break;
					case 'density':
						return 'Density'
						break;
					default:
						{
							return value
						}
				}
			},
			materialToCH: function (value) {
				switch (value) {
					case 'id':
						return 'ID'
						break;
					case 'material':
						return '材料'
						break;
					case 'zoneName':
						return '名称'
						break;
					case 'zoneType':
						return '类型'
						break;
					case 'viscRes':
						return 'Viscous Resistance'
						break;
					case 'inertialRes':
						return 'Inertial Resistance'
						break;
					case 'normalRefSurface':
						return '方向参考面'
						break;
					case 'backFlowHydraulicDiameter':
						return 'Hydraulic Diameter'
						break;
					case 'gaugePressure':
						return 'Gauge Pressure'
						break;
					case 'backFlowTurbulentIntensity':
						return 'Turbulent Intensity'
						break;
					case 'backFlowTemperature':
						return 'Backflow Temperature'
						break;
					case 'shellConduction':
						return '激活Shell Conduction'
						break;
					case 'thickness':
						return 'Wall Thickness'
						break;
					case 'heatTransCoef':
						return 'Heart Transfer Coefficient'
						break;
					case 'freeSteamTemp':
						return 'Free Steam Temperature'
						break;
					case 'massFlowRate':
						return 'Mass Flow Rate'
						break;
					case 'hydraulicDiameter':
						return 'Hydraulic Diameter'
						break;
					case 'turbulentIntensity':
						return 'Turbulent Intensity'
						break;
					default:
						{
							return value
						}
				}
			}
		},
		mounted() {
			this._getMaterilTypes()
			this.typeChange(this.paiqiType)
		},
		methods: {
			vehicleChange(value) {
				this.vehicleValue = value
				this.pro.valueOne = this.vehicleValue.split("_")[0]
				this.pro.valueTwo = this.vehicleValue.split("_")[1]
				this.pro.valueThree = this.vehicleValue.split("_")[2]
				this.pro.valueFour = this.vehicleValue.split("_")[3]
				this.pro.valueFive = this.vehicleValue.split("_")[4]
				this.pro.valueSix = this.vehicleValue.split("_")[5]
				this.pro.valueSeven = this.vehicleValue.split("_")[6]
			},
			_getMaterilTypes() {
				this.options[2].children[1].children = []
				this.axios({
					method: 'get',
					url: `/patac_ras/material`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					this.materialTypes = res.data.data.content
					let nObj = {
						value: '',
						label: ''
					}
					let sObj = {
						value: '',
						label: ''
					}
					res.data.data.content.forEach((item) => {
						nObj = {
							value: item.name,
							label: item.name
						}
						nObj.children = []
						item.sheet.forEach((val) => {
							sObj = {
								value: val,
								label: val
							}
							nObj.children.push(sObj)
						})
						this.options[2].children[1].children.push(nObj)
					})
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleFileError(err) {
				if (this.carpettempShow) {
					let startCode = err.toString().lastIndexOf(`msg`)
					let endCode = err.toString().lastIndexOf(`条`)
					this.$notify.error({
						title: '错误',
						message: err.toString().slice(startCode, endCode)
					});

				} else {
					let startCode = err.toString().lastIndexOf(`页签`)
					let endCode = err.toString().lastIndexOf(`。`)
					this.$notify.error({
						title: '错误',
						message: err.toString().slice(startCode, endCode)
					});
				}
			},
			handleFileSuccess(response, file, fileList) {
				if (response.code === 0) {
					this.$notify.success({
						title: '成功',
						message: '上传成功'
					});
					this.currentPage = 1
					this.spinShow = true
					this._getMaterilTypes()
					if (this.bpShow) {
						this.dialogBpImportFile = false
						this._getBpData()
					} else if (this.materialShow) {
						this.dialogMaterialImportFile = false
						this._getMaterialData()
					} else if (this.carpettempShow) {
						this.dialogCarpettempImportFile = false
						this._getCarpettempData()
					} else if (this.airShow) {
						this.dialogAirImportFile = false
						this._getAirData()
					} else if (this.dllqShow) {
						this.dialogDllqImportFile = false
						this._getDllqData()
					}
				} else {
					this.$notify.error({
						title: '错误',
						message: '上传失败'
					});
				}
			},
			_addItem() {
				if (this.carpettempShow) {
					this.dialogCarpettempAdd = true
					this.addListItemSlot = {
						material: '',
						conductivity: '',
						specificHeat: '',
						density: ''
					}
				} else if (this.bpShow) {
					this.dialogBpAdd = true
				} else if (this.qiShow) {
					this.dialogFormVisible = true
				} else if (this.airShow) {
					this.dialogAirAdd = true
				}
			},
			_getCarpettempData() {
				this.carpettempFormList = []
				this.axios({
					method: 'get',
					url: `/patac_ras/carpettemp`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					this.pageCount = res.data.data.totalElements
					let _data = res.data.data.content
					this.carpettempFormList = _data
					this.formListTitle = {
						material: '',
						conductivity: '',
						specificHeat: '',
						density: ''
					}
					for (let i in res.data.data.content[0]) {
						if (i !== 'createTime') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
					this.spinShow = false
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			_getMaterialData() {
				this.materialShow = true
				this.qiShow = false
				this.bpShow = false
				this.formList = []
				this.formListTitle = {
					"200": null,
					"250": null,
					"300": null,
					"350": null,
					"400": null,
					"450": null,
					"500": null,
					"550": null,
					"600": null,
					"650": null,
					"700": null,
					"750": null,
				}
				this.axios({
					method: 'get',
					url: `/patac_ras/tppData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize,
						material: this.selectValues[2],
						hData: this.selectValues[3].slice(1, this.selectValues[3].indexOf("_")),
						tair: this.selectValues[3].slice(this.selectValues[3].indexOf("T") + 1)
					},
				}).then((res) => {
					this.pageCount = res.data.data.totalElements
					let _data = res.data.data.content
					if (res.data.code === 0) {
						this.formList = _data
					}
					this.addListItemSlot = {}
					for (let i in _data[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
					this.spinShow = false
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			_getBpData() {
				this.bpShow = true
				this.materialShow = false
				this.qiShow = false
				this.bpFormList = []
				this.formListTitle = {
					id: "",
					VPPS1: "",
					VPPS2: "",
					Parts: "",
					P1: "",
					P2: "",
					P3: "",
					Distance: ""
				}
				this.axios({
					method: 'get',
					url: `/patac_ras/bpData`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					this.pageCount = res.data.data.totalElements
					let _data = res.data.data.content
					if (res.data.code === 0) {
						for (let i in _data) {
							let nObj = {
								id: "",
								vpps1: "",
								vpps2: "",
								parts: "",
								p_1: "",
								p_2: "",
								p_3: "",
								distance: ""
							}
							nObj.id = _data[i].id
							nObj.vpps1 = _data[i].vpps1
							nObj.vpps2 = _data[i].vpps2
							nObj.parts = _data[i].parts
							nObj.p_1 = _data[i].p_1
							nObj.p_2 = _data[i].p_2
							nObj.p_3 = _data[i].p_3
							nObj.distance = _data[i].distance
							this.bpFormList.push(nObj)
						}
					}
					this.addListItemSlot = {}
					for (let i in this.bpFormList[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
					this.spinShow = false
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			dllqSearch() {
				this.spinShow = true
				this.dllqShow = true
				this.pscArrText = []
				this.pscArrSim = []
				this.pscArrVts = []
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel/sheet`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						excelName: this.vehicleValue,
						sheet: this.sjbValue
					}
				}).then((res) => {
					this.dllqData = res.data.data
					console.log(this.dllqData)
					if (this.sjbValue === 'PSC') {
						let pscArr = this.dllqData.psc
						for (let i in pscArr) {
							for (let o in pscArr[i][0]) {
								if (o === 'con' || o === 'exc' || o === 'ext') {
									this.pscArrText.push(pscArr[i][0][o])
								}
							}
							for (let o in pscArr[i][1]) {
								if (o === 'con' || o === 'exc' || o === 'ext') {
									this.pscArrSim.push(pscArr[i][1][o])
								}
							}
							for (let o in pscArr[i][2]) {
								if (o === 'con' || o === 'exc' || o === 'ext') {
									this.pscArrVts.push(pscArr[i][2][o])
								}
							}
						}
					} else if (this.sjbValue === 'FEAF') {
						for (let i in res.data.data.intake) {
							if (i === "Openning Area & Fan") {
								this.$set(this.intakeObj, "one", res.data.data.intake[i])
							} else if (i === "FEAF Shutter Open") {
								this.$set(this.intakeObj, "two", res.data.data.intake[i])
							} else if (i === "FEAF Shutter Closed") {
								this.$set(this.intakeObj, "three", res.data.data.intake[i])
							}
						}
					}
				})
				this.pscShow = false
				this.feafShow = false
				this.crfmShow = false
				this.conHrShow = false
				this.cacHrShow = false
				this.ltrHrShow = false
				this.rdHrShow = false
				this.pqShow = false
				setTimeout(() => {
					if (this.sjbValue === "PSC") {
						this.pscShow = true
					} else if (this.sjbValue === "FEAF") {
						this.feafShow = true
					} else if (this.sjbValue === "CRFM_Configuraion") {
						this.crfmShow = true
					} else if (this.sjbValue === "Condenser_HR") {
						this.conHrShow = true
					} else if (this.sjbValue === "CRFM_PQ") {
						this.pqShow = true
					} else if (this.sjbValue === "CAC_HR") {
						this.cacHrShow = true
					} else if (this.sjbValue === "LTR_HR") {
						this.ltrHrShow = true
					} else if (this.sjbValue === "Radiator_HR") {
						this.rdHrShow = true
					}
					this.spinShow = false
				}, 1000)
			},
			_getDllqData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/carModel/all/excel`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					if (res.data.code === 0) {
						this.spinShow = false
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
			_getAirData() {
				this.axios({
					method: 'get',
					url: `/patac_ras/air`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage - 1,
						size: this.pageSize
					}
				}).then((res) => {
					this.formListTitle = {
						id: "",
						density: "",
						temperature: "",
						viscosity: "",
					}
					this.pageCount = res.data.data.totalElements
					this.airFormList = res.data.data.content
					for (let i in this.airFormList[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
					this.spinShow = false
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			importFile() {
				this.fileList = []
				this.dialogMaterialImportFile = false
				this.dialogBpImportFile = false
				this.dialogCarpettempImportFile = false
				if (this.bpShow) {
					this.dialogBpImportFile = true
				} else if (this.materialShow) {
					this.dialogMaterialImportFile = true
				} else if (this.carpettempShow) {
					this.dialogCarpettempImportFile = true
				} else if (this.airShow) {
					this.dialogAirImportFile = true
				} else if (this.dllqShow) {
					this.dialogDllqImportFile = true
				}
			},
			exportFile() {
				this.$confirm('确定导出文件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					if (this.bpShow) {
						window.location = "http://39.107.243.101:7070/bpData/excel?filename=TPP_BpData"
					} else if (this.materialShow) {
						window.location = `http://39.107.243.101:7070/material/excel?filename=${this.selectedOptions[2]}`
					} else if (this.carpettempShow) {
						window.location = `http://39.107.243.101:7070/carpettemp/excel`
					} else if (this.airShow) {
						window.location = `http://39.107.243.101:7070/air/excel`
					} else if (this.dllqShow) {
						window.location = `http://39.107.243.101:7070/carModel/excel?filename=` + this.vehicleValue
					}
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			},
			_deleteItem() {
				let idArr = []
				this.multipleSelection.forEach((item) => {
					idArr.push(item.id)
				})
				if (this.materialShow) {
					let materialId = ''
					for (let i in this.materialTypes) {
						if (this.materialTypes[i].name === this.currentType[2]) {
							materialId = this.materialTypes[i].id
						}
					}
					this.$confirm(`是否删除材料${this.currentType[2]}?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'info'
					}).then(() => {
						this.axios({
							method: 'delete',
							url: `/patac_ras/material/${materialId}`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
						}).then((res) => {
							if (res.data.code === 0) {
								this.$notify.success({
									title: '成功',
									message: '删除成功',
									duration: 1000
								});
								this._getMaterilTypes()
							}

						}).catch((err) => {
							this.$notify.error({
								title: '错误',
								message: err.response.data.msg,
								duration: 2500
							});
							return;
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				if (this.qiShow) {
					if(idArr.length === 0){
						this.$notify.error({
							title: '错误',
							message: '请选中信息',
							duration: 1000
						});
						return;
					}
					this.$confirm('是否删除选中信息?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'info'
					}).then(() => {

						this.axios({
							method: 'delete',
							url: `./api/${localStorage.paiqiType}`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: idArr
						}).then((res) => {
							if (res.status === 200) {
								this.spinShow = true
								this.$notify.success({
									title: '成功',
									message: '删除成功',
									duration: 1000
								});
							}
							this._getPaiqiData()
						}).catch((err) => {
							this.$notify.error({
								title: '错误',
								message: err.response.data.message,
								duration: 2500
							});
							return;
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				if (this.bpShow) {
					if(idArr.length === 0){
						this.$notify.error({
							title: '错误',
							message: '请选中信息',
							duration: 1000
						});
						return;
					}
					this.$confirm('是否删除选中信息?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'info'
					}).then(() => {
						this.axios({
							method: 'delete',
							url: `/patac_ras/bpData`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: idArr
						}).then((res) => {
							if (res.data.code === 0) {
								this.spinShow = true
								this.$notify.success({
									title: '成功',
									message: '删除成功',
									duration: 1000
								});
							}
							this._getBpData()
						}).catch((err) => {
							this.$notify.error({
								title: '错误',
								message: err.response.data.message,
								duration: 2500
							});
							return;
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				if (this.carpettempShow) {
					if(idArr.length === 0){
						this.$notify.error({
							title: '错误',
							message: '请选中信息',
							duration: 1000
						});
						return;
					}
					this.$confirm('是否删除选中信息?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.axios({
							method: 'delete',
							url: `/patac_ras/carpettemp`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: idArr
						}).then((res) => {
							if (res.data.code === 0) {
								this.spinShow = true
								this._getCarpettempData()
							}
						}).catch((err) => {
							this.$notify.error({
								title: '错误',
								message: err.response.data.msg,
								duration: 2500
							});
							return;
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				if (this.airShow) {
					if(idArr.length === 0){
						this.$notify.error({
							title: '错误',
							message: '请选中信息',
							duration: 1000
						});
						return;
					}
					this.$confirm('是否删除选中信息?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.axios({
							method: 'delete',
							url: `/patac_ras/air`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: idArr
						}).then((res) => {
							if (res.data.code === 0) {
								this.$notify.error({
									title: '成功',
									message: "删除成功",
									duration: 2500
								});
								this.spinShow = true
								this._getAirData()
							}
						}).catch((err) => {
							this.$notify.error({
								title: '错误',
								message: err.response.data.message,
								duration: 2500
							});
							return;
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			_addAirListItemSubmit() {
				this.$refs.formValAir.validate((valid) => {
					if (valid) {
						this.axios({
							method: 'post',
							url: `/patac_ras/air`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.addListItemAir
						}).then((res) => {
							this.addListItemAir = {
								'density': '',
								'temperature': '',
								'viscosity': ''
							}
							this.spinShow = true
							this._getAirData()
							this.dialogAirAdd = false
							this.$notify.success({
								title: '成功',
								message: '添加成功',
								duration: 1000
							});
						}).catch((error) => {
							this.addListItemAir = {
								'density': '',
								'temperature': '',
								'viscosity': ''
							}
							this._getAirData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_addCarpettempListItemSubmit() {
				this.$refs.formValiDt.validate((valid) => {
					if (valid) {
						let realLength = 0
						let len = this.addListItemDt.Material.length
						let charCode = -1
						for (let i = 0; i < len; i++) {
							charCode = this.addListItemDt.Material.charCodeAt(i);
							if (charCode >= 0 && charCode <= 128)
								realLength += 1;
							else
								realLength += 2;
						}
						if (realLength >= 32) {
							this.$notify.error({
								title: '错误',
								message: "材料名称过长,请小于32个字符",
								duration: 2500
							});
							return;
						}
						this.axios({
							method: 'post',
							url: `/patac_ras/carpettemp`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.addListItemDt
						}).then((res) => {
							this.spinShow = true
							this._getCarpettempData()
							this.dialogCarpettempAdd = false
							this.$notify.success({
								title: '成功',
								message: '添加成功',
								duration: 1000
							});
						}).catch((error) => {
							this._getCarpettempData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_addBpListItemSubmit() {
				this.$refs.formValiBp.validate((valid) => {
					if (valid) {
						this.axios({
							method: 'post',
							url: `/patac_ras/bpData`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.addListItemBp
						}).then((res) => {
							if (res.status === 200) {
								this.spinShow = true
								this._getBpData()
								this.dialogBpAdd = false
								this.$notify.success({
									title: '成功',
									message: '添加成功',
									duration: 1000
								});
							}
						}).catch((error) => {
							this._getBpData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_addListItemSubmit() {
				this.axios({
					method: 'post',
					url: `./api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: this.addListItemSlot
				}).then((res) => {
					if (res.status === 200) {
						this.spinShow = true
						this._getPaiqiData()
						this.dialogFormVisible = false
						this.$notify.success({
							title: '成功',
							message: '添加成功',
							duration: 1000
						});
					}
				}).catch((error) => {
					this._getPaiqiData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.msg,
						duration: 2500
					});
				});

			},
			addListItem() {
				this.dialogFormVisible = true
			},
			_modifySubmit() {
				for (let i in this.currentModify) {
					if (!this.currentModify[i]) {
						this.$notify.error({
							title: '错误',
							message: "请将表单填写完整",
							duration: 2500
						});
						return;
					}
				}
				let anaModify = this.currentModify
				this.axios({
					method: 'put',
					url: `./api/${localStorage.paiqiType}/${anaModify.id}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					data: anaModify
				}).then((res) => {
					if (res.status === 200) {
						this.spinShow = true
						this.$notify.success({
							title: '成功',
							message: '修改成功',
							duration: 1000
						});
						this._getPaiqiData()
						this.dialogModify = false
					}
				}).catch((error) => {
					this._getPaiqiData()
					this.$notify.error({
						title: '错误',
						message: error.response.data.msg,
						duration: 2500
					});
				});
			},
			_modifyAirSubmit() {
				this.$refs.formValiAir.validate((valid) => {
					if (valid) {
						this.axios({
							method: 'put',
							url: `/patac_ras/air`,
							headers: {
								'Content-type': 'application/json'
							},
							data: this.currentModify
						}).then((res) => {
							this.spinShow = true
							this._getAirData()
							this.dialogModify = false
							this.$notify.success({
								title: '成功',
								message: '修改成功',
								duration: 1000
							});
						}).catch((error) => {
							console.log(error.response)
							this._getAirData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_modifyCarpettempSubmit() {
				this.$refs.formValiDt.validate((valid) => {
					if (valid) {
						let realLength = 0
						let len = this.currentModify.material.length
						let charCode = -1
						for (let i = 0; i < len; i++) {
							charCode = this.currentModify.material.charCodeAt(i);
							if (charCode >= 0 && charCode <= 128)
								realLength += 1;
							else
								realLength += 2;
						}
						if (realLength >= 32) {
							this.$notify.error({
								title: '错误',
								message: "材料名称过长,请小于32个字符",
								duration: 2500
							});
							return;
						}
						this.axios({
							method: 'put',
							url: `/patac_ras/carpettemp`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.currentModify
						}).then((res) => {
							this.spinShow = true
							this._getCarpettempData()
							this.dialogModify = false
							this.$notify.success({
								title: '成功',
								message: '修改成功',
								duration: 1000
							});
						}).catch((error) => {
							this._getCarpettempData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_modifyMaterialSubmit() {
				this.$refs.formValiMateril.validate((valid) => {
					if (valid) {
						let anaModify = this.currentModify
						this.axios({
							method: 'put',
							url: `/patac_ras/tppData/${anaModify.id}`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: anaModify
						}).then((res) => {
							if (res.data.code === 0) {
								this.spinShow = true
								this.$notify.success({
									title: '成功',
									message: '修改成功',
									duration: 1000
								});
							}
							this._getMaterialData()
							this.dialogModify = false
						}).catch((error) => {
							this._getMaterialData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})
			},
			_modifyBpSubmit() {
				this.$refs.formValiBp.validate((valid) => {
					if (valid) {
						this.axios({
							method: 'put',
							url: `/patac_ras/bpData`,
							headers: {
								'Content-type': 'application/json;charset=UTF-8'
							},
							data: this.currentModify
						}).then((res) => {
							if (res.status === 200) {
								this.spinShow = true
								this._getBpData()
								this.dialogModify = false
								this.$notify.success({
									title: '成功',
									message: '添加成功',
									duration: 1000
								});
							}
						}).catch((error) => {
							this._getBpData()
							this.$notify.error({
								title: '错误',
								message: error.response.data.msg,
								duration: 2500
							});
						});
					} else {
						this.$Message.error('表单填写有误');
					}
				})

				for (let i in this.currentModify) {
					if (!this.currentModify[i]) {
						this.$notify.error({
							title: '错误',
							message: "请将表单填写完整",
							duration: 2500
						});
						return;
					}
				}
			},
			modifyListItem(index, item) {
				this.dialogModify = true
				this.currentModify = Object.assign({}, item);
				console.log(this.currentModify)
			},
			handleCurrentChange(val) {
				this.spinShow = true
				this.currentPage = val
				if (this.bpShow) {
					this._getBpData()
				} else if (this.qiShow) {
					this._getPaiqiData()
				} else if (this.materialShow) {
					this._getMaterialData()
				} else if (this.airShow) {
					this._getAirData()
				} else if (this.carpettempShow) {
					this._getCarpettempData()
				}
			},
			typeChange(values) {
				this.currentType = values
				this.spinShow = true
				this.qiShow = false
				this.bpShow = false
				this.materialShow = false
				this.carpettempShow = false
				this.dllqShow = false
				this.airShow = false
				this.multipleSelection = []
				let value = ''
				this.currentPage = 1
				if (typeof (values) !== 'string') {
					if (values[1] === "BP数据") {
						this._getBpData()
						this.bpshw = true
						return;
					}
					if (values.length === 4) {
						this.selectValues = values
						this._getMaterialData()
						this.materialShow = true
						return;
					}
					if (values[1] === "地毯材料属性") {
						this._getCarpettempData()
						this.carpettempShow = true
						return;
					}
					if (values[1] === '动力冷却性能数据') {
						this.pageCount = 0
						this._getDllqData()
						this.dllqShow = true
						return;
					}
					if (values[1] === '空气属性数据') {
						this._getAirData()
						this.airShow = true
						return;
					}
					if (values[0] === '底盘排气系统' || values[0] === '底盘进气系统') {
						value = values[1]
						this.qiShow = true
					}
				} else {
					value = values
					this.qiShow = true
				}
				switch (value) {
					case 'CellZone':
						this.paiqiType = value
						localStorage.paiqiType = "cell_zone"
						this._getPaiqiData()
						break;
					case 'cell_zone':
						this.paiqiType = value
						localStorage.paiqiType = "cell_zone"
						this._getPaiqiData()
						break;
					case 'Prous':
						this.paiqiType = value
						localStorage.paiqiType = "porous"
						this._getPaiqiData()
						break;
					case 'porous':
						this.paiqiType = value
						localStorage.paiqiType = "porous"
						this._getPaiqiData()
						break;
					case 'MassFlowInlet':
						this.paiqiType = value
						localStorage.paiqiType = "mass_flow_inlet"
						this._getPaiqiData()
						break;
					case 'mass_flow_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "mass_flow_inlet"
						this._getPaiqiData()
						break;
					case 'PressureOutlet':
						this.paiqiType = value
						localStorage.paiqiType = "pressure_outlet"
						this._getPaiqiData()
						break;
					case 'pressure_outlet':
						this.paiqiType = value
						localStorage.paiqiType = "pressure_outlet"
						this._getPaiqiData()
						break;
					case 'CoupledWall':
						this.paiqiType = value
						localStorage.paiqiType = "coupled_wall"
						this._getPaiqiData()
						break;
					case 'coupled_wall':
						this.paiqiType = value
						localStorage.paiqiType = "coupled_wall"
						this._getPaiqiData()
						break;
					case 'ConvectionWall':
						this.paiqiType = value
						localStorage.paiqiType = "convection_wall"
						this._getPaiqiData()
						break;
					case 'convection_wall':
						this.paiqiType = value
						localStorage.paiqiType = "convection_wall"
						this._getPaiqiData()
						break;
					case 'Interior':
						this.paiqiType = value
						localStorage.paiqiType = "interior"
						this._getPaiqiData()
						break;
					case 'interior':
						this.paiqiType = value
						localStorage.paiqiType = "interior"
						this._getPaiqiData()
						break;
					case 'intake/pressure_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/pressure_inlet"
						this._getPaiqiData()
						break;
					case 'PressureInlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/pressure_inlet"
						this._getPaiqiData()
						break;
					case 'VelocityInlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/velocity_inlet"
						this._getPaiqiData()
						break;
					case 'intake/velocity_inlet':
						this.paiqiType = value
						localStorage.paiqiType = "intake/velocity_inlet"
						this._getPaiqiData()
						break;
					case 'CellZone_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/cell_zone"
						this._getPaiqiData()
						break;
					case 'intake/cell_zone':
						this.paiqiType = value
						localStorage.paiqiType = "intake/cell_zone"
						this._getPaiqiData()
						break;
					case 'Prous_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/porous"
						this._getPaiqiData()
						break;
					case 'intake/porous':
						this.paiqiType = value
						localStorage.paiqiType = "intake/porous"
						this._getPaiqiData()
						break;
					case 'Interior_jq':
						this.paiqiType = value
						localStorage.paiqiType = "intake/interior"
						this._getPaiqiData()
						break;
					case 'intake/interior':
						this.paiqiType = value
						localStorage.paiqiType = "intake/interior"
						this._getPaiqiData()
						break;
				}
			},
			_getPaiqiData() {
				this.formList = []
				this.formListTitle = {}
				this.axios({
					method: 'get',
					url: `./api/${localStorage.paiqiType}`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					},
					params: {
						page: this.currentPage,
						size: this.pageSize
					}
				}).then((res) => {
					this.pageCount = res.data.count
					res.data.items.forEach((xx) => {
						let nobj = {}
						if (xx.id) {
							this.$set(nobj, 'id', xx.id)
						}
						if (xx.material) {
							this.$set(nobj, 'material', xx.material)
						}
						if (xx.zoneName) {
							this.$set(nobj, 'zoneName', xx.zoneName)
						}
						if (xx.zoneType) {
							this.$set(nobj, 'zoneType', xx.zoneType)
						}
						if (xx.normalRefSurface) {
							this.$set(nobj, 'normalRefSurface', xx.normalRefSurface)
						}
						if (xx.viscRes) {
							this.$set(nobj, 'viscRes', xx.viscRes)
						}
						if (xx.inertialRes) {
							this.$set(nobj, 'inertialRes', xx.inertialRes)
						}
						if (xx.temperature) {
							this.$set(nobj, 'temperature', xx.temperature)
						}
						if (xx.massFlowRate) {
							this.$set(nobj, 'massFlowRate', xx.massFlowRate)
						}
						if (xx.hydraulicDiameter) {
							this.$set(nobj, 'hydraulicDiameter', xx.hydraulicDiameter)
						}
						if (xx.turbulentIntensity) {
							this.$set(nobj, 'turbulentIntensity', xx.turbulentIntensity)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowTemperature', xx.backFlowTemperature)
						}
						if (xx.backFlowTurbulentIntensity) {
							this.$set(nobj, 'backFlowTurbulentIntensity', xx.backFlowTurbulentIntensity)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.backFlowTemperature) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.thickness) {
							this.$set(nobj, 'thickness', xx.thickness)
						}
						if (xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						if (xx.heatTransCoef) {
							this.$set(nobj, 'heatTransCoef', xx.heatTransCoef)
						}
						if (xx.freeSteamTemp) {
							this.$set(nobj, 'freeSteamTemp', xx.freeSteamTemp)
						}
						if (xx.shellConduction) {
							this.$set(nobj, 'shellConduction', xx.shellConduction)
						}
						if (xx.backFlowTurbulentIntensity) {
							this.$set(nobj, 'backFlowTurbulentIntensity', xx.backFlowTurbulentIntensity)
						}
						if (xx.backFlowHydraulicDiameter) {
							this.$set(nobj, 'backFlowHydraulicDiameter', xx.backFlowHydraulicDiameter)
						}
						if (xx.backFlowVelocityMagnitude) {
							this.$set(nobj, 'backFlowVelocityMagnitude', xx.backFlowVelocityMagnitude)
						}
						if (localStorage.paiqiType == 'intake/velocity_inlet') {

						} else {
							if (xx.gaugePressure || xx.gaugePressure == 0) {
								this.$set(nobj, 'gaugePressure', xx.gaugePressure)
							}
						}
						this.formList.push(nobj)
						this.formListTitle = this.formList[0]
					})
					this.addListItemSlot = {}
					for (let i in this.formList[0]) {
						if (i !== 'id') {
							this.$set(this.addListItemSlot, i, null)
						}
					}
					this.spinShow = false
				}).catch((err) => {
					this.$notify.error({
						title: '错误',
						message: err.response.data.msg,
						duration: 2500
					});
					return;
				})
			}
		}

	}
</script>

<style lang="scss" scoped="scoped">
	/deep/ .ivu-form-item {
		margin-bottom: 20px;
	}

	/deep/ .ivu-form-item-error-tip {
		display: none;
	}

	/deep/ .el-cascader-menu__item {
		display: block !important;
		padding: 8px 30px !important;
	}

	/deep/ .el-cascader-menu__item--extensible:after {
		right: 5px;
	}

	/deep/ .el-upload {
		width: 100%;
	}

	/deep/ .el-upload-dragger {
		width: 90%;
		margin: 0 auto;
	}

	/deep/ .el-card__header {
		background: #eff0dc;
		padding: 6px 20px !important;
	}

	/deep/ .ivu-select-single .ivu-select-selection,
	.ivu-input-wrapper,
	.ivu-select {
		width: 300px;
	}

	.resultTableThree {
		margin-top: 10px;
		.threeList {
			div {
				margin-left: 10px;
				line-height: 30px;
				border: 1px solid #E4E4E4;
				display: inline-block;
				span {
					display: inline-block;
					border-right: 1px solid #E4E4E4;
					text-align: center;
					width: 60px;
					&:first-child {
						width: 200px;
					}
				}
			}
		}
	}

	.resultTableTwo {
		margin-top: 10px;
		border: 1px solid rgb(220, 220, 220);
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
		margin-top: 10px;
		border: 1px solid rgb(220, 220, 220);
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

	.default {
		min-width: 1000px;
		display: flex;
		.tab {
			flex: 0 230px;
			background: rgb(44, 47, 62);
		}
		li {
			display: block;
		}
		.right {
			flex: 1;
			padding: 20px;
			.formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
						&:first-child {
							flex: 0 50px;
							position: relative;
						}
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						&:first-child {
							flex: 0 50px;
						}
					}
				}
			}
			.selectList {
				display: inline-block;
				.sec {
					display: inline-block;
					margin-top: 10px;
					margin-left: 10px;
					span {
						display: inline-block;
						width: 70px;
						text-align: right;
					}
				}
			}
			.carpettemp_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.material_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.bp_formList {
				.listTitle {
					display: flex;
					span {
						flex: 1;
						text-align: left;
						color: rgb(147, 147, 147);
						font-weight: 700;
						border-bottom: 1px solid rgb(235, 238, 245);
						padding-bottom: 10px;
						line-height: 20px;
						&:first-child {
							flex: 0 50px;
							position: relative;
						}
						&:nth-child(2) {
							flex: 0 100px;
						}
						&:nth-child(3) {
							flex: 0 100px;
						}
						&:nth-child(4) {
							flex: 0 60px;
						}
						&:nth-child(5) {
							flex: 0 60px;
						}
						&:nth-child(6) {
							flex: 0 60px;
						}
						&:nth-child(7) {
							flex: 0 60px;
						}
						&:nth-child(9) {
							text-align: center;
						}
					}
				}
				.list {
					display: flex;
					border-bottom: 1px solid rgb(235, 238, 245);
					.el-button {
						padding: 4px;
					}
					span {
						font-size: 14px;
						flex: 1;
						padding: 10px 0;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						&:first-child {
							flex: 0 50px;
						}
						&:nth-child(2) {
							flex: 0 100px;
						}
						&:nth-child(3) {
							flex: 0 100px;
						}
						&:nth-child(4) {
							flex: 0 60px;
						}
						&:nth-child(5) {
							flex: 0 60px;
						}
						&:nth-child(6) {
							flex: 0 60px;
						}
						&:nth-child(7) {
							flex: 0 60px;
						}
						&:nth-child(9) {
							text-align: center;
						}
					}
				}
			}
		}
		.modifyDialog {
			/deep/ .el-dialog__title {
				float: left;
				font-weight: 700;
				font-size: 16px;
			}
			div {
				.sec {
					margin-bottom: 15px;
					text-align: left;
					>span {
						min-width: 140px;
						display: inline-block;
						text-align: right;
						margin-right: 10px;
					}
					/deep/ .el-input {
						height: 34px;
					}
					/deep/ .el-input__inner {
						height: 34px;
					}
				}
			}
		}
	}
</style>
