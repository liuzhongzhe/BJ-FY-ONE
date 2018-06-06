<template>
	<div class="default">
		<h2 style="line-height: 100px;">默认数据配置</h2>
		<div>
			<span>平台名称：</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="dialogFormVisible = true" style="margin-left: 10px;">导入文件</el-button>
			<el-button type="danger">导出文件</el-button>
		</div>
		<el-dialog title="上传文件" :visible.sync="dialogFormVisible">
			<el-upload
			  class="upload-demo"
			  drag
			  action="https://jsonplaceholder.typicode.com/posts/"
			  multiple>
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
	export default{
		data(){
			return{
				options: [{
					value: '黄金糕',
					label: '黄金糕'
				}, {
					value: '双皮奶',
					label: '双皮奶'
				}, {
					value: '蚵仔煎',
					label: '蚵仔煎'
				}, {
					value: '龙须面',
					label: '龙须面'
				}, {
					value: '北京烤鸭',
					label: '北京烤鸭'
				}],
				value:'',
				dialogFormVisible:false
			}
		},
		methods:{
			
		}
		
	}
</script>

<style>
	.el-upload-dragger{
		width: 440px;
		height: 180px;
	}
	.default{
		min-width: 1000px;
	}
	.default >div{
		width: 1000px;
		margin: 0 auto;
	}
</style>