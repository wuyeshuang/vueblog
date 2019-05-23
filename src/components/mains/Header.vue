<template>
	<div>
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="6">
						<a href="/" id="logo">
							<img src="../../assets/images/logo.png" alt=""/>
						</a>
					</el-col>
					<el-col :span="6" :offset="12" class="bar-btn">
						<span class="username" v-if="this.infoname">你好：<a href="#">{{ userInfo.username }}</a></span>
						<el-button type="primary" v-if="!this.btshow" id="lore" @click="dialogVisible = true">登录 / 注册</el-button>
						<el-button type="primary" v-if="this.btshow" id="logout" @click="logout">退出登录</el-button>
					</el-col>
				</el-row>
			</el-header>
		</el-container>
		
		<el-dialog
			title="登录/注册"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<div>
				
				<el-tabs type="border-card">
					
					<el-tab-pane label="登录">				
						<el-form ref="form" :model="form" label-width="80px" id="login">
							<el-form-item label="用户名">
								<el-input v-model="form.name" placeholder="请输入用户名" name="username"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input type="password" v-model="form.pass" placeholder="请输入密码" name="password"></el-input>
							</el-form-item>
							<el-form-item label="">
								<div class="rt">
								 <el-checkbox>一周内自动登录</el-checkbox>
							  </div>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onLogin">登录</el-button>
							</el-form-item>
						</el-form>
					</el-tab-pane>
					
					<el-tab-pane label="注册">	
						<el-form ref="form" :model="form" label-width="80px" id="register">
							<el-form-item label="用户名">
								<el-input v-model="form.username" placeholder="请输入用户名" name="username"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input type="password" v-model="form.password" placeholder="请输入密码" name="password"></el-input>
							</el-form-item>
							<el-form-item label="确认密码">
								<el-input type="password" v-model="form.repassword" placeholder="请再次输入密码" name="repassword"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onRegister">注册</el-button>
							</el-form-item>
						</el-form>
					</el-tab-pane>
				</el-tabs>
				
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: 'Header',
		data() {
			return {
				dialogVisible: false,
				form: {
					checked:false,
          username: '',
          password: '',
          repassword: '',
					isAdmin:false
        },
				userInfo:{
					username:""
				},
				infoname:false,
				btshow:false
			}
		},
		methods: {
      handleClose(done) {
         done();
      },
			onLogin() {
				var url="/api/user/login"
				var cookiesTime=null
				var userjm={}
				this.$axios.post(url,qs.stringify({
					username: $("#login").find("input").eq(0).val(),
					password: $("#login").find("input").eq(1).val()
				}))
				.then(res=>{
					if($(".rt .el-checkbox").hasClass("is-checked")){
						cookiesTime=7*24*60*60
					}
					if(res.data.res_code=="1"){
						this.$message.error('请输入用户名')
						setTimeout(function(){
							$("#login").find("input").eq(0).focus()
						},500)
					}else if(res.data.res_code=="2"){
						this.$message.error('请输入密码')
						setTimeout(function(){
							$("#login").find("input").eq(1).focus()
						},500)
					}else if(res.data.res_code=="3"){
						this.$message.error('用户名或密码错误')
					}else if(res.data.res_code=="0"){
						this.$message({
							message: '登录成功',
							type: 'success'
						})
						setTimeout(function(){
							$(".el-dialog__close").click()
							location.reload()
						},1000)
						userjm._id=res.data.userInfo._id
						userjm.user_photo=res.data.userInfo.user_photo
						userjm.username=res.data.userInfo.username
						userjm.isAdmin=res.data.userInfo.isAdmin
						this.$cookies.set('userInfo',userjm,cookiesTime)
					}
				})
				 .catch(error=>{
				 	console.log(error)
				 })
      },
			onRegister() {
				var url="/api/user/register"
				this.$axios.post(url,qs.stringify({
					username: $("#register").find("input").eq(0).val(),
					password: $("#register").find("input").eq(1).val(),
					repassword: $("#register").find("input").eq(2).val(),
				}))
				.then(res=>{
					if(res.data.res_code=="1"){
						this.$message.error('请输入用户名')
						setTimeout(function(){
							$("#login").find("input").eq(0).focus()
						},500)
					}
 					else if(res.data.res_code=="2"){
 						this.$message.error('请输入密码')
 						setTimeout(function(){
 							$("#login").find("input").eq(1).focus()
 						},500)
 					}else if(res.data.res_code=="3"){
						this.$message.error('两次输入的密码不一致')
					}else if(res.data.res_code=="5"){
						this.$message.error('用户名已经存在')
					}else if(res.data.res_code=="0"){
						this.$message({
							message: '注册成功',
							type: 'success'
						})
						setTimeout(function(){
							$(".el-tabs__nav").children("div").eq(0).click()
							username: $("#login").find("input").eq(0).val()==$("#register").find("input").eq(0).val()
							username: $("#login").find("input").eq(1).val()==""
							
						},1000)
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			logout(){
				this.$cookies.remove('userInfo')		
				this.$router.replace("/")
				alert("成功退出登录")
				location.reload()
			},
			isAdmin(){
				this.$emit("isAdmin",this.isAdmin);
			}
    },
		created(){
		},
		mounted(){
			var userInfo=this.$cookies.get('userInfo')
			if(userInfo!=null){
				this.userInfo=userInfo
				this.infoname=!this.infoname
				this.btshow=!this.btshow
			}
		}
		
	}
</script>

<style scoped>
.el-header{ color: #333; height: auto !important; padding: 15px 5px;}
#logo{ display: inline-block;}
#logo img{ height: 80px;}
.bar-btn{ padding: 20px 0 0 0; text-align: right;}
.el-tabs--border-card{ box-shadow: initial !important;}
.username{ display: inline-block;}
.username>a{ display: inline-block; text-decoration: underline !important; color: #333; padding: 0 3px;}
</style>
