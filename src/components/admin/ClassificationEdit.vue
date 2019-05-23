<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="分类名称">
				<el-input v-model="form.classificationById"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: 'ClassificationEdit',
		data() {
			return {
				form: {
					classificationById: ''
				},
				exit_id: ""
			}
		},
		inject: ['reload'],
		created() {
			this.$axios.get("/admin/category/edit", {
				params: {
					id: this.$route.query.classification
				}
			}).then(result => {
				this.exit_id = result.data.edit_category._id
				this.form.classificationById = result.data.edit_category.name
			})
		},
		methods: {
			onSubmit() {
				this.$axios.post("/admin/category/edit", qs.stringify({
						name: this.form.classificationById,
						exit_id: this.exit_id
					}))
					.then(result => {
						console.log(result)
						if (result.data.msgcode == 0) {
							this.form.classification == ""
							this.$message({
								showClose: true,
								message: '分类名不能为空',
								type: 'warning'
							})
							setTimeout(function(){location.reload()},2000)
						} else if (result.data.msgcode == 1) {
							this.form.classification == ""
							this.$message({
								showClose: true,
								message: '分类已经存在,请重新修改',
								type: 'warning'
							})
						}
						else if (result.data.msgcode == 2) {
							this.$message({
								showClose: true,
							  message: '分类修改成功',
							  type: 'success'
							})
							this.$router.replace("/admin/classification")
						}
					})
			},
			refresh() {
				this.reload()
			},
			updated(){
				console.log("组件已更新")
			}
		}
	}
</script>

<style scoped>
</style>
