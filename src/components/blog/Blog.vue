<template>
	<div>
		<el-row :gutter="40">
			<el-col :span="18">
				<ul class="categoryul">
					<li>
						<router-link to="/blog/bloglist">全部</router-link>
					</li>
					<li v-for="categories in categories" :key="categories._id">
						<router-link :to="{name:'BlogList',query:{categories:categories._id}}">{{ categories.name }}</router-link>
					</li>
				</ul>
				<router-view></router-view>
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
	import Calendar from "../calendar/Calendar"
	import Search from "../search/Search"
	import NewBlog from "./NewBlog"
	export default {
		name: 'Blog',
		data() {
			return {
				categories:[]
			}
		},
		components:{
			Calendar,
			Search,
			NewBlog
		},
		methods: {

	  },
		created(){
			this.$axios.get("/")
			.then(ret=>{
				this.categories=ret.data.categories
				// console.log(this.categories)
			}).catch(error=>{
					console.log(error)
				})
		}
	}
</script>

<style scoped>
	.categoryul{ overflow: hidden; margin: 0 0 30px 0 !important; border-bottom: 1px rgb(64, 158, 255) solid;}
	.categoryul>li{ float: left; margin: 0 30px 0 0;}
	.categoryul>li>a{ line-height: 40px; display: inline-block;}
	.router-link-exact-active{ color: rgba(64, 158, 255); border-bottom: 2px rgba(64, 158, 255) solid;}
</style>
