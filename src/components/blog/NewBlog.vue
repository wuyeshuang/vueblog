<template>
	<div class="newblog">
		<div class="newblog-title">最新文章</div>
		<ul class="nbul">
			<li v-for="newblog in newblog" :key="newblog._id">
				
				<!-- <router-link  :to="{name:'BlogView',query:{contents:newblog._id}}"> -->
				<router-link :to="{name:'BlogView',query:{contents:newblog._id}}">
					<!-- /blog/view?contents=5ccfbbc495840c27183b3379 -->
					
					<div class="nb">
						<div class="nbtit">
							{{newblog.title}}
						</div>
						<div class="nbview">阅读量：<span>{{newblog.views}}</span></div>
					</div>
				</router-link>	
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'NewBlog',
		data(){
			return {
				newblog:[]
			}
		},
		methods:{
			fetch2(){
				this.$axios.get("/")
					.then(result=>{
						this.newblog=result.data.contents
					}).catch(error=>{
						console.log(error)
					})
			}
		},
		created(){
			this.fetch2()
		},
		watch:{
		  // 如果路由有变化，会再次执行该方法
		  "$route": "fetch2"
		}
	}
	

	
</script>

<style scoped>
.newblog{ padding: 30px 0;}
.newblog-title{ border-bottom: 1px #ccc solid; font-size: 18px; line-height: 30px; margin: 0 0 10px 0;}
.nb{ overflow: hidden; cursor: pointer; border-bottom: 1px #f1f1f1 solid;}
.nbtit{ float: left; font-size: 12px; line-height: 26px; color: #666; width: calc(100% - 82px); height: 26px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nb:hover .nbtit{ text-decoration: underline;}
.nbview{ float: right; font-size: 12px; line-height: 26px; color: #666; width: 82px; text-align: right; height: 26px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nbview span{ display: inline-block; color: #999;}
</style>
