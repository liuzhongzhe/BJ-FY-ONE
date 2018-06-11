<template>
	<div class="default">
		<h1 style="text-align: center;line-height: 100px;">XXXXXX</h1>
		<div class="xx" style="display: flex;padding: 20px;">
			<div class="tree" style="flex: 0 200px;">
				<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
			<div class="form" style="flex:1;margin-left: 5px;">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>XXX</span>
						<el-button style="float: right;position: relative;bottom: 10px; margin-left: 10px;height: 38px;line-height: 1px;" type="success" @click="dialogFormVisible = true">导出文件</el-button>
						<el-button style="float: right;position: relative;bottom: 10px;height: 38px;line-height: 1px; " type="primary" @click="dialogFormVisible = true">导入文件</el-button>
					</div>
					<div>
					</div>
					<div class="form">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column label="日期">
								<template slot-scope="scope">
									<i class="el-icon-time"></i>
									<span style="margin-left: 10px">{{ scope.row.date }}</span>
								</template>
							</el-table-column>
							<el-table-column label="姓名">
								<template slot-scope="scope">
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.name }}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="姓名">
								<template slot-scope="scope">
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.name }}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="姓名">
								<template slot-scope="scope">
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.name }}</el-tag>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="姓名">
								<template slot-scope="scope">
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.name }}</el-tag>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</div>
		</div>
		<el-dialog title="上传文件" :visible.sync="dialogFormVisible">
			<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					label: '一级 1',
					children: [{
						label: '二级 1-1',
					}]
				}, {
					label: '一级 2',
					children: [{
						label: '二级 2-1',
					}, {
						label: '二级 2-2',
					}]
				}, {
					label: '一级 3',
					children: [{
						label: '二级 3-1',
					}, {
						label: '二级 3-2',
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				radio7: 1,
				dialogFormVisible: false
			}
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}

	}
</script>

<style>
	.el-tree-node__content{
		height: 28px;
	}
	.el-tree{
		color: #000000;
	}
	.el-tree-node__label{
		font-size: 16px;
	}
	.default {
		min-width: 1000px;
	}
</style>