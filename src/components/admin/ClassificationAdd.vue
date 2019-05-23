<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="分类名称">
				<el-input v-model="form.classification"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即添加</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: 'ClassificationAdd',
		data() {
      return {
        form: {
          classification: ''
        }
				
      }
    },
    methods: {
			
      onSubmit() {
        this.$axios.post("/admin/category/add",qs.stringify({
					name:this.form.classification
				}))
				.then(result=>{
					if(result.data.msgcode==0){
						this.form.classification==""
						this.$message({
							showClose: true,
						  message: '分类名称已经存在',
						  type: 'warning'
						})
					}else{
						this.$message({
							showClose: true,
						  message: '分类保存成功',
						  type: 'success'
						})
						this.$router.replace("/admin/classification")
					}
				})
      }
			
    }
	}
</script>

<style scoped>
</style>
