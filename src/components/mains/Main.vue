<template>
	<div>
		
		<el-menu
			:default-active="activeIndex2"
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#409EFF"
			text-color="#fff"
			active-text-color="#ffd04b">
			<el-container>
				<el-menu-item index="1"><router-link to="/" @click="sx">首页</router-link></el-menu-item>
				<el-menu-item index="2"><router-link to="/personal" @click="sx">个人中心</router-link></el-menu-item>
				<el-menu-item index="3"><router-link to="/admin" @click="sx">后台管理</router-link></el-menu-item>
			</el-container>
		</el-menu>
<!-- 		<div class="content">
			<el-container>
				<el-row :gutter="40">
					<el-col :span="16">						
					</el-col>
					<el-col :span="8">
					</el-col>
				</el-row>
			</el-container>
		</div> -->
		<div class="content">
			<router-view></router-view>		
		</div> 
	</div>
</template>

<script>
	import Blog from "../blog/Blog"
	export default {
		name: 'Main',
		// provide (){
		//    return {reload:this.reload}
		// },
		inject: ['reload'],
		data() {
			return {
				// isRouterAlive:true,
				activeIndex2: '',
				isAdmin:false
			}
		},
		refresh() {
			this.reload()
		},
		methods: {
			handleSelect(key, keyPath) {},
			// reload (){
   //     this.isRouterAlive = false
   //     this.$nextTick(()=>{
   //        this.isRouterAlive = true
   //     })
			// }
			sx(){
				this.refresh()
			}
    },
		components:{
			Blog
		},
 		created(){
			if(this.$route.path.indexOf("/blog")=="0"){
				this.activeIndex2="1"
			}else if(this.$route.path.indexOf("/personal")=="0"){
				this.activeIndex2="2"
			}else if(this.$route.path.indexOf("/admin")=="0"){
				this.activeIndex2="3"
			}
 		},
		mounted(){
			if(this.$cookies.get('userInfo')){
				var userInfo=this.$cookies.get('userInfo')
				this.isAdmin=userInfo.isAdmin
			}
		}
	}
</script>

<style scoped>
.el-row{ width: 100%;}
.el-main {background-color: rgba(233, 238, 243, 0.3);color: #333;}
.el-menu-demo .is-active{ color: #fff !important; background: rgba(51, 126, 204) !important;}
.content{ min-height: 500px; padding: 20px 0; width: 1200px; margin: 0 auto;}
.el-menu-demo a{ color: #fff}
.el-menu-item{ padding: 0;}
.el-menu-item>a{ display: block; padding: 0 20px;}
</style>
