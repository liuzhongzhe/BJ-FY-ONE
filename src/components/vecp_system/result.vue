<template>
	
	</template>
	
	<script>
		
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
				.compareOneExt{
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
