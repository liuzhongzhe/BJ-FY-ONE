<template>
	<div class="SED_index">
		<div>
			<div class="content">
				<p>请选择人员身份</p>
				<p></p>Please Choose The Identity</p>
			</div>
			<div class="chooseButton">
				<div class="button" @click="toTable">
					<p>评估者</p>
					<p>evalutor</p>
				</div>
				<div class="button" @click="toTable">
					<p>组织者</p>
					<p>Organizer</p>
				</div>
			</div>
			<div class="error">
				<p>如对评估模式有疑惑，请确认后再进行选择</p>
				<p>if there is any objection to the mode,please confirm it!</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toTable() {
				this.$router.push('/SED_table')
				}
			}
		}
</script>

<style lang="scss" scoped="scoped">
	.SED_index {
		text-align: center;
		font-size: 14px;
		>div {
			>.content {
				margin-top: 60%;
				p {
					line-height: 30px;
				}
			}
			>.chooseButton {
				width: 180px;
				margin: 0 auto;
				p {
					line-height: 20px;
				}
				.button {
					width: 180px;
					border-radius: 20px;
					border: 2px solid #409EFF;
					margin-top: 20px;
				}
			}
			>.error {
				width: 90%;
				position: fixed;
				bottom: 10px;
				left: 5%;
				font-size: 12px;
				p {
					margin-top: 3px;
					color: #6F7071;
				}
			}
		}
	}
</style>