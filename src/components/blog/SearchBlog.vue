<template>
	<div>
		<el-row :gutter="40">
			<el-col :span="18">
				<div id="count">共查询到<span>{{count}}</span>篇记录</div>
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
				<div class="no-time"><img src="../../assets/images/zw.png" alt=""></div>
				<!-- <router-view></router-view> -->
			</el-col>
			<el-col :span="6">
				<Calendar/>
				<Search/>
				<NewBlog/>
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import qs from 'qs'
	import Calendar from "../calendar/Calendar"
	import Search from "../search/Search"
	import NewBlog from "./NewBlog"
	export default {
		name: 'Blog',
		data() {
			return {
				searchData:"",
				contents:[],
				count:0
			}
		},
		components:{
			Calendar,
			Search,
			NewBlog
		},
		methods: {
			search_data(){
				this.searchData=this.$route.query.searchData
				if(this.$route.query.searchData==""){
					alert("搜索条件不能为空")
					this.$router.replace("/")
					return 
				}
				else{
					this.$axios.get("/search",{params:{
						search:this.$route.query.searchData
					}})
					.then(ret=>{
						this.contents=ret.data.result
						this.count=ret.data.result.length
						if(ret.data.result.length==0){
							$(".no-time").show()
						}else{
							$(".no-time").hide()
						}
					}).catch(error=>{
							console.log(error)
					})
				}
			}
	  },
		created(){
			this.search_data()
		},
		watch:{
		  // 如果路由有变化，会再次执行该方法
		  "$route": "search_data"
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
	#count{ margin: 0 0 20px 0; font-size: 20px; color: #333; font-weight: bold;}
	#count span{ display: inline-block; color: #409EFF;}
	.no-time{ display: none;}
</style>
