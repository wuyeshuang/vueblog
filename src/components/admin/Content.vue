<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="category.name" label="分类名称">
			</el-table-column>
			<el-table-column prop="title" label="内容标题">
			</el-table-column>
			<el-table-column prop="user.username" label="作者">
			</el-table-column>
			<el-table-column prop="addTime" label="添加时间" width="200">
			</el-table-column>
			<el-table-column prop="views" label="阅读量" width="80">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<router-link :to="{name:'ContentEdit',query:{ContentId:ContentId}}">
						<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					</router-link>
					<el-button @click="handleClick2(scope.row),refresh()" type="text" size="small">删除</el-button>
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
		name: "Content",
		data() {
			return {
				tableData: [],
				count: null,
				page: null,
				ContentId:""
			}
		},
		inject: ['reload'],
		methods: {
			getContent() {
				this.$axios.get("/admin/content",{params:{
					page:this.page
				}})
					.then(result => {
						this.count=Math.ceil(result.data.count / 5)*10
						this.tableData = result.data.contents
						// console.log(this.tableData)
					})
			},
			handleCurrentChange(val) {
				this.page=`${val}`
				this.getContent()
			},
			handleClick(row) {
				this.ContentId=row._id
			},
			handleClick2(row) {
				this.$axios.get("/admin/content/deleta",{params:{
					id:row._id
				}})
				.then(result=>{
					console.log(result)
					if(result.data.msgcode==0){
						this.$message({
							showClose: true,
							message: '删除失败',
							type: 'error'
						})
					}else if(result.data.msgcode==1){
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						})
					}
				})
			},
			refresh() {
				this.reload()
			}
		},
		created() {
			this.getContent()
		}
	}
</script>

<style scoped>
</style>
