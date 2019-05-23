<template>
	<div>


		<el-row class="tac" :gutter="40">
			<el-col :span="6">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1">
								<router-link to="/admin/subscriber">用户总览</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>分类管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="2-1">
								<router-link to="/admin/classification">分类首页</router-link>
							</el-menu-item>
							<el-menu-item index="2-2">
								<router-link to="/admin/classificationAdd">添加分类</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>内容管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1">
								<router-link to="/admin/content">内容首页</router-link>
							</el-menu-item>
							<el-menu-item index="3-2">
								<router-link to="/admin/contentAdd">添加内容</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="18">
				<router-view v-if="isRouterAlive"></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Admin',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			if($cookies.get('userInfo')&&$cookies.get('userInfo').isAdmin==true){
				next()
			}else{
				alert("抱歉，你还不是管理员")
				to.path=="/"
				// location.reload()
				}
		},
	}
</script>

<style scoped>
	.el-menu {
		border-top: solid 1px #e6e6e6;
		border-right: none;
	}

	.el-menu>li {
		border-left: solid 1px #e6e6e6;
		border-right: solid 1px #e6e6e6;
		border-bottom: solid 1px #e6e6e6;
		box-sizing: border-box;
	}

	.el-menu>li>ul>li {
		border: none;
		min-width: initial !important;
		padding: 0 !important;
	}

	.el-menu>li>ul>li>a {
		display: block;
		padding: 0 0 0 60px;
	}
</style>
