<template>
	<div>
		<ul class="bloglist">
			<li v-for="contents in contents" :key="contents._id">
				<router-link :to="{name:'BlogView',query:{contents:contents._id}}">
					<div class="clslist">
						<div class="bkbt">{{ contents.title }}</div>
						<div class="bkjj">{{ contents.description }}</div>
						<div class="bkdb">
							<div class="avatar"><img :src="'http://127.0.0.1:8088'+contents.user.user_photo" alt=""></div>
							<div class="author">{{ contents.user.username }}<span>{{ contents.addTime }}</span></div>
							<div class="read">阅读次数(<span>{{ contents.views }}</span>)</div>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<div id="tf1">
			<div class="timg"><img src="../../assets/images/timg.jpg" alt=""></div>
		</div>
		<div id="tf2">
			<el-pagination
				@current-change="handleCurrentChange"
				background
				layout="prev, pager, next"
				:total="this.count">
			</el-pagination>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'Blog',
		data() {
			return {
				contents:[],
				count: null,
				page: null
			}
		},
		methods: {
			fetchDate(){
				this.$axios.get("/",{
					params:{
						category:this.$route.query.categories,
						page:this.page
						}
					})
				.then(ret=>{
					this.contents=ret.data.contents
					this.count=Math.ceil(ret.data.count / 4)*10	
					// console.log(typeof ret.data.contents.length)
					if(ret.data.contents.length == 0){
						$("#tf1").show()
						$("#tf2").hide()
					}else{
						$("#tf1").hide()
						$("#tf2").show()
					}
					
				}).catch(error=>{
					console.log(error)
				})	
			},
			handleCurrentChange(val) {
				this.page=`${val}`
				this.fetchDate()
			},
			
	  },
		created(){
			this.fetchDate()
		},
		watch:{
      // 如果路由有变化，会再次执行该方法
      "$route": "fetchDate"
    }
	}
</script>

<style scoped>
	.bloglist{ border-top: 1px solid rgba(0, 0, 0, 0.08); box-sizing: border-box; margin: 0 0 20px 0;}
	/* min-height: 461px; */
	.bloglist>li{ border-left: 1px solid rgba(0, 0, 0, 0.08); padding: 10px; transition: all 0.2s ease-out; border-bottom: 1px solid rgba(0, 0, 0, 0.08); border-right: 1px solid rgba(0, 0, 0, 0.08); box-sizing: border-box;}
	.bloglist>li:hover{ background: #fafafa;}
	.bkbt{ font-size: 16px; color: #333; height: 30px; line-height: 30px; font-weight: bold; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
	.bkjj{ font-size: 14px; color: #333; height: 28px; line-height: 28px; margin: 3px 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
	.bkdb{ overflow: hidden;}
	.avatar{ float: left; width: 30px; height: 30px; border-radius: 50%; overflow: hidden; margin: 0 5px 0 0;}
	.avatar img{ max-width: 100%;}
	.author{ float: left; font-size: 12px; line-height: 30px; color: #666;}
	.author span{ display: inline-block; color: #999; margin: 0 0 0 5px; font-size: 12px;}
	.read{ float: right; font-size: 12px; line-height: 30px; color: #666; float: right;}
	.read span{ display: inline-block; color: #ff0000;}
	.timg img{ width: 100%;}
</style>
