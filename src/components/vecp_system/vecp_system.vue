<template>
	<div class="vecp_system">
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>整车发动机冷却性能数据查询系统</span>
				</div>
				<div class="button">
					<span>车型平台</span>
					<i-button type="primary">查询</i-button>
					<i-button type="success">加入对比</i-button>
				</div>
				<div class="selectList" style="margin-top: 10px;">
					<div>
						<span>车型数据：</span>
						<el-select v-model="vehicleValue" filterable placeholder="请选择" @change="vehicleChange">
							<el-option v-for="(item,index) in vehicleArr" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型平台：</span>
						<el-select v-model="pro.valueOne">
							<el-option value="E2-2" label="E2-2"></el-option>
							<el-option value="D2XX" label="D2XX"></el-option>
							<el-option value="GEM" label="GEM"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型名称：</span>
						<el-select v-model="pro.valueTwo">
							<el-option value="ELLB-2" label="ELLB-2"></el-option>
							<el-option value="D2UB" label="D2UB"></el-option>
							<el-option value="D2SB" label="D2SB"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>车型年份：</span>
						<el-select v-model="pro.valueThree">
							<el-option value="MY17" label="MY17"></el-option>
							<el-option value="MY16" label="MY16"></el-option>
							<el-option value="MY15" label="MY15"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>发动机：</span>
						<el-select v-model="pro.valueFour">
							<el-option value="L2B" label="L2B"></el-option>
							<el-option value="L3T" label="L3T"></el-option>
							<el-option value="L3Z" label="L3Z"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>变速箱：</span>
						<el-select v-model="pro.valueFive">
							<el-option value="CVT" label="CVT"></el-option>
							<el-option value="DCT" label="DCT"></el-option>
							<el-option value="M01" label="M01"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>驱动形式：</span>
						<el-select v-model="pro.valueSix">
							<el-option value="AWD" label="AWD"></el-option>
							<el-option value="FWD" label="FWD"></el-option>
							<el-option value="RWD" label="RWD"></el-option>
						</el-select>
					</div>
					<div class="sec">
						<span>左/右驾：</span>
						<el-select v-model="pro.valueSeven">
							<el-option value="LHD" label="LHD"></el-option>
							<el-option value="RHD" label="RHD"></el-option>
						</el-select>
					</div>
				</div>
				<el-tabs value="name1" style="margin-top: 30px;">
					<el-tab-pane label="查询显示结果" name="name1">
						<div class="title">
							<span>动力冷却性能结果</span>
						</div>
						<div class="resultTable">
							<div class="topTitle">
								<div></div>
								<div>
									<div class="top">
										<span>发动机水温</span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>发动机油温</span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>变速箱油温</span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>风扇出风温度 </span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>CAC出口温度</span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
								<div>
									<div class="top">
										<span>LTR水温</span>
									</div>
									<div>
										<span>Con.</span>
										<span>Exc.</span>
										<span>Ext.</span>
									</div>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="border-left: none;">试验结果</span>
								</div>
								<div>
									<span>115</span>
									<span>124</span>
									<span>131</span>
								</div>
								<div>
									<span>140</span>
									<span>150</span>
									<span>160</span>
								</div>
								<div>
									<span>132</span>
									<span>132</span>
									<span>140</span>
								</div>
								<div>
									<span>87</span>
									<span>100</span>
									<span></span>
								</div>
								<div>
									<span>64</span>
									<span>74</span>
									<span></span>
								</div>
								<div>
									<span>NA</span>
									<span>NA</span>
									<span></span>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="border-left: none;">虚拟结果</span>
								</div>
								<div>
									<span>116</span>
									<span>125</span>
									<span>132</span>
								</div>
								<div>
									<span>141</span>
									<span>151</span>
									<span>161</span>
								</div>
								<div>
									<span>133</span>
									<span>133</span>
									<span>141</span>
								</div>
								<div>
									<span>88</span>
									<span>100</span>
									<span></span>
								</div>
								<div>
									<span>63</span>
									<span>73</span>
									<span></span>
								</div>
								<div>
									<span>na</span>
									<span>na</span>
									<span></span>
								</div>
							</div>
							<div class="tableList">
								<div>
									<span style="border-left: none;">VTS要求</span>
								</div>
								<div>
									<span>2011</span>
									<span>12</span>
									<span>13</span>
								</div>
								<div>
									<span>14</span>
									<span>15</span>
									<span>16</span>
								</div>
								<div>
									<span>17</span>
									<span>18</span>
									<span>19</span>
								</div>
								<div>
									<span>88</span>
									<span>100</span>
									<span></span>
								</div>
								<div>
									<span>65</span>
									<span>75</span>
									<span></span>
								</div>
								<div>
									<span>na</span>
									<span>n1</span>
									<span></span>
								</div>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;">
							<span>前端开口和进风量结果</span>
						</div>
						<div class="resultTableTwo">
							<div class="twoTitle">
								<div>Openging(cm2)</div>
								<div>Shutter Open(CMM)</div>
								<div>Shutter Close(CMM)</div>
							</div>
							<div class="twoList">
								<div>
									<span>总体开口面积</span>
									<span>1.0</span>
								</div>
								<div>
									<span>Idle,Fan On</span>
									<span>2.0</span>
									<span>50kph,Fan On</span>
									<span>3.0</span>
								</div>
								<div>
									<span>90kph</span>
									<span>4.0</span>
								</div>
							</div>
							<div class="twoList">
								<div>
									<span>正投影面积</span>
									<span>11.0</span>
								</div>
								<div>
									<span>50kph,Fan On</span>
									<span>5.0</span>
									<span>Vmax</span>
									<span>6.0</span>
								</div>
								<div>
									<span>120kph</span>
									<span>7.0</span>
								</div>
							</div>
							<div class="twoList">
								<div>
									<span>风扇功率</span>
									<span>12.0</span>
								</div>
								<div>
									<span>Idle,Fan On</span>
									<span>8.0</span>
									<span>50kph,Fan On</span>
									<span>9.0</span>
								</div>
								<div>
									<span>90kph</span>
									<span>10.0</span>
								</div>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;">
							<span>前端冷却模块结果</span>
							<el-select style="width: 150px;">
								<el-option>Condenser</el-option>
								<el-option>CAC</el-option>
								<el-option>Radiator</el-option>
								<el-option>LTR</el-option>
							</el-select>
						</div>
						<div class="resultTableThree">
							<div class="threeList">
								<div>
									<span>Length</span>
									<span>657.0</span>
								</div>
								<div>
									<span>No. of Tubes</span>
									<span>45</span>
								</div>
								<div>
									<span>Flow in Front View</span>
									<span>NA</span>
								</div>
								<div>
									<span>Primary Inlet Temp</span>
									<span>NA</span>
								</div>
								<div>
									<span>Air Temp</span>
									<span class="ELSELECT">
										<el-select style="height: 20px;" @change="changeSelectResultTableThree" v-model="pro.valueEight">
											<el-option value="20" label="20"></el-option>
											<el-option value="30" label="30"></el-option>
											<el-option value="50" label="50"></el-option>
										</el-select>
									</span>
								</div>
							</div>
							<div class="threeList">
								<div>
									<span>Height</span>
									<span>329.8</span>
								</div>
								<div>
									<span>No. of Passes</span>
									<span>2</span>
								</div>
								<div>
									<span>Recirculated Flow</span>
									<span>NA</span>
								</div>
								<div>
									<span>Auxiliary Inlet Temp</span>
									<span>NA</span>
								</div>
								<div>
									<span>Air Density</span>
									<span>{{pro.valueTen}}</span>
								</div>
							</div>
							<div class="threeList">
								<div>
									<span>Thickness</span>
									<span>12.0</span>
								</div>
								<div>
									<span>No. of Raws</span>
									<span>NA</span>
								</div>
								<div>
									<span>Cp</span>
									<span>NA</span>
								</div>
								<div>
									<span>Du</span>
									<span>NA</span>
								</div>
								<div>
									<span>Air Viscosity</span>
									<span>{{pro.valueNine}}</span>
								</div>
							</div>
						</div>
						<div class="resultTableFive">
							<div class="fiveTitle">
								<span>前端冷却模块CDS数据</span>
								<span>0.027777778</span>
								<span>0.444444444</span>
								<span>0.061111111</span>
								<span>0.077777778</span>
								<span>0.024648787</span>
							</div>
							<div class="fiveList">
								<span>0.05</span>
								<span>0.444444444</span>
								<span>0.061111111</span>
								<span>0.077777778</span>
								<span>0.024648787</span>
								<span>0.024648787</span>
							</div>
							<div class="fiveList">
								<span>0.05</span>
								<span>0.444444444</span>
								<span>0.061111111</span>
								<span>0.077777778</span>
								<span>0.024648787</span>
								<span>0.024648787</span>
							</div>
							<div class="fiveList">
								<span>0.05</span>
								<span>0.444444444</span>
								<span>0.061111111</span>
								<span>0.077777778</span>
								<span>0.024648787</span>
								<span>0.024648787</span>
							</div>
							<div class="fiveList">
								<span>0.05</span>
								<span>0.444444444</span>
								<span>0.061111111</span>
								<span>0.077777778</span>
								<span>0.024648787</span>
								<span>0.024648787</span>
							</div>
						</div>
						<div class="title" style="margin-top: 30px;">
							<span>风扇冷却模块结果</span>
						</div>

						<div style="display: inline-block; vertical-align:top;" class="resultTableFour">
							<div class="sec">
								<span>Fan Type</span>
								<span>Single</span>
							</div>
							<div class="sec">
								<span>Outer Radius</span>
								<span>215</span>
							</div>
							<div class="sec">
								<span>Inner Radius</span>
								<span>99</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.A</span>
								<span>1.0</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.B</span>
								<span>6.0</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.C</span>
								<span>2.0</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.D</span>
								<span>3.0</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.E</span>
								<span>4.0</span>
							</div>
							<div class="sec">
								<span>Fan Coffe.F</span>
								<span>5.0</span>
							</div>
						</div>
						<div id="myChart" style="display: inline-block;position: relative;bottom: 20px;left: 20px;">
						</div>
					</el-tab-pane>
					<el-tab-pane label="对比显示结果" name="name2">
						<div style="background: #68ab82;line-height: 38px;color: #000;display: block;">
							<span style="width: 130px;display: inline-block;text-align: left;text-indent: 2px;border: none;text-align: center;">对比项</span>
							<span style="width: 130px;display: inline-block;border: none;text-align: center;">conpareOne
								<el-button type="danger" icon="el-icon-close" circle style="margin-left: 2px;"></el-button>
							</span>
							<span style="width: 130px;display: inline-block;border: none;text-align: center;">conpareTwo
								<el-button type="danger" icon="el-icon-close" circle style="margin-left: 2px;"></el-button>
							</span>
						</div>
						<div class="title">
							<img v-show="dllqxnShow" @click="dllqxnShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!dllqxnShow" @click="dllqxnShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>动力冷却性能结果</span>
						</div>
						<div class="compareTableOne" v-if="dllqxnShow">
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 0px;">
								<img v-show="dllqxnItemOneShow" @click="dllqxnItemOneShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemOneShow" @click="dllqxnItemOneShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> 发动机水温
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
								<div class="compareOneCon">
									<span>115</span>
									<span>124</span>
									<span>131</span>
								</div>
								<div class="compareOneCon">
									<span>116</span>
									<span>128</span>
									<span>132</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>155</span>
									<span>167</span>
									<span>141</span>
								</div>
								<div class="compareOneCon">
									<span>131</span>
									<span>108</span>
									<span>144</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>135</span>
									<span>124</span>
									<span>167</span>
								</div>
								<div class="compareOneCon">
									<span>175</span>
									<span>114</span>
									<span>121</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
								<img v-show="dllqxnItemTwoShow" @click="dllqxnItemTwoShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemTwoShow" @click="dllqxnItemTwoShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> 发动机油温
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
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 2px;">
								<img v-show="dllqxnItemThreeShow" @click="dllqxnItemThreeShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemThreeShow" @click="dllqxnItemThreeShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> 变速箱油温
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
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075">
								<img v-show="dllqxnItemFourShow" @click="dllqxnItemFourShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemFourShow" @click="dllqxnItemFourShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> 风扇出风温度
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
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
							</div>
							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075">
								<img v-show="dllqxnItemFiveShow" @click="dllqxnItemFiveShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemFiveShow" @click="dllqxnItemFiveShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> CAC出口温度
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
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
							</div>

							<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;text-indent: 2px;">
								<img v-show="dllqxnItemSixShow" @click="dllqxnItemSixShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!dllqxnItemSixShow" @click="dllqxnItemSixShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> LTR水温
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
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Exc.</span>
								</div>
								<div class="compareOneExc">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div>
									<span style="line-height: 25px;display: block;text-indent: 1em; width: 100%; background:#d4d4aa;">Ext.</span>
								</div>
								<div class="compareOneExt">
									<span>试验结果</span>
									<span>虚拟结果</span>
									<span>VTS要求</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
								</div>
								<div class="compareOneCon">
									<span>aa</span>
									<span>bb</span>
									<span>cc</span>
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
								<img v-show="qdkkjflItemOneShow" @click="qdkkjflItemOneShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemOneShow" @click="qdkkjflItemOneShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Openging(cm2)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemOneShow">
								<div>
									<span>总开口面积</span>
									<span>正投影面积</span>
									<span>风扇功率</span>
								</div>
								<div>
									<span>1.0</span>
									<span>2.0</span>
									<span>3.0</span>
								</div>
								<div>
									<span>1.1</span>
									<span>2.2</span>
									<span>3.6</span>
								</div>
							</div>
							<span>
								<img v-show="qdkkjflItemTwoShow" @click="qdkkjflItemTwoShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemTwoShow" @click="qdkkjflItemTwoShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Shutter oPEN(CMM)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemTwoShow">
								<div>
									<span>Idle,Fan On</span>
									<span>50kph,Fan On</span>
									<span>60kph,Fan On</span>
									<span>155kph,Fan On</span>
									<span>Vmax</span>
								</div>
								<div>
									<span>4.0</span>
									<span>5.0</span>
									<span>6.0</span>
									<span>7.0</span>
									<span>8.0</span>
								</div>
								<div>
									<span>4.1</span>
									<span>5.6</span>
									<span>6.7</span>
									<span>7.5</span>
									<span>8.6</span>
								</div>
							</div>
							<span>
								<img v-show="qdkkjflItemThreeShow" @click="qdkkjflItemThreeShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
								<img v-show="!qdkkjflItemThreeShow" @click="qdkkjflItemThreeShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Shutter oPEN(CMM) Shutter Close(CMM)
							</span>
							<div class="compareTableTwoList" v-if="qdkkjflItemThreeShow">
								<div>
									<span>90kph</span>
									<span>120kph</span>
									<span>Vmax</span>
								</div>
								<div>
									<span>9.0</span>
									<span>10.0</span>
									<span>11.0</span>
								</div>
								<div>
									<span>9.5</span>
									<span>10.7</span>
									<span>11.3</span>
								</div>
							</div>
						</div>
						<div class="title">
							<img v-show="qdlqmkShow" @click="qdlqmkShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<img v-show="!qdlqmkShow" @click="qdlqmkShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
							<span>前端冷却模块结果</span>
						</div>
						<div class="compareTableThree" v-if="qdlqmkShow">
							<div style="display: block;" ref="xxx" @click="xxx">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemOneShow" @click="qdlqmkItemOneShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemOneShow" @click="qdlqmkItemOneShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Condenser
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
										<el-select style="width: 70px;" @change="changeSelectResultTableThree" placeholder="">
											<el-option value="20" label="20"></el-option>
											<el-option value="30" label="30"></el-option>
											<el-option value="50" label="50"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<span>652.0</span>
									<span>321.2</span>
									<span>12.0</span>
									<span>NA</span>
									<span>NA</span>
									<span>45</span>
									<span>3.2</span>
									<span>5.3</span>
									<span>Cp</span>
									<span>9.3</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>3.9</span>
								</div>
								<div>
									<span>782.6</span>
									<span>452.3</span>
									<span>13.1</span>
									<span>NA</span>
									<span>NA</span>
									<span>37</span>
									<span>7.8</span>
									<span>6.7</span>
									<span>Cp</span>
									<span>7.5</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>7.1</span>
								</div>
							</div>

							<div style="display: block;" ref="xxx" @click="xxx">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemTwoShow" @click="qdlqmkItemTwoShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemTwoShow" @click="qdlqmkItemTwoShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> CAC
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
										<el-select style="width: 70px;" @change="changeSelectResultTableThree" placeholder="">
											<el-option value="20" label="20"></el-option>
											<el-option value="30" label="30"></el-option>
											<el-option value="50" label="50"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<span>652.0</span>
									<span>321.2</span>
									<span>12.0</span>
									<span>NA</span>
									<span>NA</span>
									<span>45</span>
									<span>3.2</span>
									<span>5.3</span>
									<span>Cp</span>
									<span>9.3</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>3.9</span>
								</div>
								<div>
									<span>782.6</span>
									<span>452.3</span>
									<span>13.1</span>
									<span>NA</span>
									<span>NA</span>
									<span>37</span>
									<span>7.8</span>
									<span>6.7</span>
									<span>Cp</span>
									<span>7.5</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>7.1</span>
								</div>
							</div>

							<div style="display: block;" ref="xxx" @click="xxx">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemThreeShow" @click="qdlqmkItemThreeShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemThreeShow" @click="qdlqmkItemThreeShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Condenser CAC Radiator LTR</span>
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
										<el-select style="width: 70px;" @change="changeSelectResultTableThree" placeholder="">
											<el-option value="20" label="20"></el-option>
											<el-option value="30" label="30"></el-option>
											<el-option value="50" label="50"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<span>652.0</span>
									<span>321.2</span>
									<span>12.0</span>
									<span>NA</span>
									<span>NA</span>
									<span>45</span>
									<span>3.2</span>
									<span>5.3</span>
									<span>Cp</span>
									<span>9.3</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>3.9</span>
								</div>
								<div>
									<span>782.6</span>
									<span>452.3</span>
									<span>13.1</span>
									<span>NA</span>
									<span>NA</span>
									<span>37</span>
									<span>7.8</span>
									<span>6.7</span>
									<span>Cp</span>
									<span>7.5</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>7.1</span>
								</div>
							</div>

							<div style="display: block;" ref="xxx" @click="xxx">
								<span style="line-height: 34px;display: block; width: 100%; background:#c1a075;">
									<img v-show="qdlqmkItemFourShow" @click="qdlqmkItemFourShow=false" src="../../../static/reduce2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;">
									<img v-show="!qdlqmkItemFourShow" @click="qdlqmkItemFourShow=true" src="../../../static/plus2.png" width="15px" style="cursor: pointer;position: relative;top: 2px;"> Condenser CAC Radiator LTR</span>
							</div>
							<div v-if="qdlqmkItemFourShow">
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
										<el-select style="width: 70px;" @change="changeSelectResultTableThree" placeholder="">
											<el-option value="20" label="20"></el-option>
											<el-option value="30" label="30"></el-option>
											<el-option value="50" label="50"></el-option>
										</el-select>
									</span>
									<span>Air Density</span>
									<span>Air Viscosity</span>
									<span>Cp</span>
									<span>Du</span>
								</div>
								<div>
									<span>652.0</span>
									<span>321.2</span>
									<span>12.0</span>
									<span>NA</span>
									<span>NA</span>
									<span>45</span>
									<span>3.2</span>
									<span>5.3</span>
									<span>Cp</span>
									<span>9.3</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>3.9</span>
								</div>
								<div>
									<span>782.6</span>
									<span>452.3</span>
									<span>13.1</span>
									<span>NA</span>
									<span>NA</span>
									<span>37</span>
									<span>7.8</span>
									<span>6.7</span>
									<span>Cp</span>
									<span>7.5</span>
									<span>NA</span>
									<span>{{pro.valueNine}}</span>
									<span>{{pro.valueTen}}</span>
									<span>NA</span>
									<span>7.1</span>
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
							<div>
								<span>99</span>
								<span>1.0</span>
								<span>1.0</span>
								<span>2.0</span>
								<span>3.0</span>
								<span>4.0</span>
								<span>5.0</span>
								<span>6.0</span>
								<span>7.0</span>
							</div>
							<div>
								<span>1.3</span>
								<span>1.5</span>
								<span>1.5</span>
								<span>2.1</span>
								<span>3.7</span>
								<span>5.7</span>
								<span>5.7</span>
								<span>6.7</span>
								<span>7.3</span>
							</div>
							<i-button @click="drawLineTwo" style="display: block;margin-top: 10px;" type="primary">查看曲线图</i-button>
							<div style="display: block;width: 600px;height:400px;" id="myChartTwo">
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
				vehicleValue:'',
				vehicleArr:[],
				navInd: '2',
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
				fslqmkShow: true
			}
		},
		mounted() {
			//             document.getElementById("tab").style.minHeight = window.innerHeight + 'px'
			//             this.drawLine()
			this._getData()
		},
		methods: {
			_getData() {
				this.axios({
					method: 'get',
					// url: `/patac_ras/carModel/all/excel`,
					url: `/patac_ras/carModel/all`,
					headers: {
						'Content-type': 'application/json;charset=UTF-8'
					}
				}).then((res) => {
					console.log(res)
// 					if (res.data.code === 0) {
// 						this.vehicleArr = res.data.data
// 					}
				})

			},
			vehicleChange(value){
				console.log(value)
			},
			xxx() {
				console.log(this.$refs.xxx)
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
						name: 'm/s'
					},
					yAxis: {
						type: 'value',
						name: "压力(Pa)"
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
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
				let myChart = this.$echarts.init(document.getElementById('myChartTwo'))
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
					series: [{
							name: 'one',
							type: 'line',
							smooth: true,
							stack: '总量',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: 'two',
							type: 'line',
							smooth: true,
							stack: '总量',
							data: [220, 182, 191, 234, 290, 330, 310]
						}
					]
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
						span {
							width: 130px;
							display: block;
							text-align: left;
							line-height: 30px;
							border-right: 1px solid #E4E4E4;
							border-bottom: 1px solid #E4E4E4;
							text-indent: 2px;
						}
					}
				}
			}
			.compareTableFour {
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
					display: inline-block;
					span {
						display: block;
						border-right: 1px solid #E4E4E4;
						border-bottom: 1px solid #E4E4E4;
						width: 130px;
						line-height: 30px;
						text-align: center;
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
