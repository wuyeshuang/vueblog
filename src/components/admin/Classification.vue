<template>
	<div>
		<el-table :data="classificationData" border style="width: 100%">
			<el-table-column fixed prop="_id" label="id">
			</el-table-column>
			<el-table-column fixed prop="name" label="分类名称">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row),refresh()" type="text" size="small">删除</el-button>
					<router-link :to="{name:'ClassificationEdit',query:{classification:classificationId}}">
						<el-button type="text" size="small" @click="handleClick2(scope.row)">编辑</el-button>
					</router-link>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change="handleCurrentChange" :total="this.count" background layout="prev, pager, next" style="margin: 30px 0 0 0;">
		</el-pagination>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: 'Classification',
		data() {
			return {
				classificationData: [{
					_id: '',
					name: ''
				}],
				classificationId: "",
				count:null,
				page:null
			}
		},
		inject: ['reload'],
		methods: {
			handleClick2(row) {
				this.classificationId = row._id
			},
			handleClick(row) {
				this.$axios.get("/admin/category/delete", {
						params: {
							id: row._id
						}
					})
					.then(result => {
						if (result.data.msgcode == 0) {
							this.form.classification == ""
							this.$message({
								showClose: true,
								message: '删除失败',
								type: 'error'
							})
						} else {
							this.$message({
								showClose: true,
								message: '删除成功',
								type: 'success'
							})
						}
					})
			},
			getClassification() {
				this.$axios.get("/admin/category",{params:{
					page:this.page
				}})
					.then(result => {
						this.count=Math.ceil(result.data.count / 5)*10	
						this.classificationData = result.data.category
					})
			},
			refresh() {
				this.reload()
			},
			handleCurrentChange(val) {
				this.page=`${val}`
				this.getClassification()
			}
		},
		created() {
			this.getClassification()
		}
	}
</script>

<style scoped>
</style>
