<template>
	<div>
		<el-table :data="suscrierData" stripe >
			<el-table-column prop="_id" label="id" width="250">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="password" label="密码">
			</el-table-column>
			<el-table-column prop="isAdmin" label="管理员">
			</el-table-column>
		</el-table>
		<el-pagination
		  @current-change="handleCurrentChange"
			background
			layout="prev, pager, next"
			:total="this.count" style="margin: 30px 0 0 0;">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'Subscriber',
		data() {
			return {
				suscrierData: [
					{
            _id: '',
            username: '',
            password: '',
						isAdmin: ''
          }
				],
				count: null,
				page: null
			}
		},
		methods: {
			getSubscriber(){
				this.$axios.get("/admin/user",{params:{
					page:this.page
				}})
				.then(ret=>{
					for(var i in ret.data.users){
						if(ret.data.users[i].isAdmin){
							ret.data.users[i].isAdmin="是"
						}else{
							ret.data.users[i].isAdmin="否"
						}
					}
					this.suscrierData=ret.data.users	
					this.count=Math.ceil(ret.data.count / 5)*10	
				}).catch(error=>{
					console.log(error)
				})
			},
			handleCurrentChange(val) {
				this.page=`${val}`
				this.getSubscriber()
			}
		},
		created(){
			this.getSubscriber()
		}
	}
</script>

<style scoped>


</style>
