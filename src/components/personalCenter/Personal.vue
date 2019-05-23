<template>
	<div>
		<my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail"
		 v-model="show" :width="300" :height="300" url="http://127.0.0.1:8088/photo_edit" :params="params" :headers="headers"
		 img-format="png" :withCredentials="withCredentials" :noSquare="noSquare" :noRotate="noRotate"></my-upload>
		<!-- <img :src="imgDataUrl"> -->

		<el-dialog title="资料修改" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px" size="mini">
				<el-form-item label="实名:">
					<el-input v-model="form.realname"></el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-radio-group v-model="form.gender">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄:">
					<el-input v-model="form.age"></el-input>
				</el-form-item>
				<el-form-item label="职位:">
					<el-input v-model="form.industry"></el-input>
				</el-form-item>
				<el-form-item label="简介:">
					<el-input v-model="form.introduce"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即修改</el-button>
				</el-form-item>
			</el-form>
			</span>
		</el-dialog>

		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="个人资料" name="information">
				<div class="userctn">
					<div class="user-photo">
						<span @click="toggleShow"><img :src="'http://127.0.0.1:8088'+user_photo" alt="我的头像" title="修改头像"></span>
						<a href="javascript:;" @click="toggleShow">修改头像</a>
						<div class="edit-zl" @click="dialogVisible = true">资料修改</div>
					</div>
					<div class="user-info">
						<h5>实名：<span>{{form.realname}}</span></h5>
						<h5>性别：<span>{{form.gender}}</span></h5>
						<h5>年龄：<span>{{form.age}}</span></h5>
						<h5>职位：<span>{{form.industry}}</span></h5>
						<h5>简介：<span>{{form.introduce}}</span></h5>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="修改密码">
				<div id="xgpsd">
					<el-form ref="form2" :model="form2" label-width="80px">
						<el-form-item label="密码:">
							<el-input type="password" v-model="form2.password1"></el-input>
						</el-form-item>
						<el-form-item label="新密码:">
							<el-input type="password" v-model="form2.password2"></el-input>
						</el-form-item>
						<el-form-item label="确认密码:">
							<el-input type="password" v-model="form2.password3"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitPassword()">立即修改</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import qs from "qs"
	import 'babel-polyfill'; // es6 shim
	import myUpload from 'vue-image-crop-upload';
	export default {
		name: "Personal",
		data() {
			return {
				activeName: 'information',
				show: false,
				userPhoto: "",
				dialogVisible: false,
				user_photo: "",
				form: {
					realname: '',
					gender: '',
					age: '',
					industry: '',
					introduce: ''
				},
				form2:{
					password1:"",
					password2:"",
					password3:""
				},

				withCredentials: true,
				noSquare: false,
				noRotate: false,
				params: {
					token: '123456798',
					name: 'avatar'
				},
				headers: {
					// smail: '*_~'
				},
				imgDataUrl: ''

			};
		},
		components: {
			'my-upload': myUpload
		},
		inject: ['reload'],
		methods: {
			refresh() {
				this.reload()
			},
			onSubmit() {
				this.$axios.post("/api/basicInfo", qs.stringify({
					_id: this.$cookies.get("userInfo")._id,
					realname: this.form.realname,
					gender: this.form.gender,
					age: this.form.age,
					industry: this.form.industry,
					introduce: this.form.introduce
				})).then(result => {
					if (result.data.msgcode == 1) {
						this.$message({
							showClose: true,
							message: '修改成功',
							type: 'success'
						})
						this.refresh()
					}
				})
			},
			handleClose(done) {
				this.$confirm('是否放弃资料编辑？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleClick(tab, event) {
				// console.log(event)
			},
			toggleShow() {
				this.show = !this.show;
			},
			cropSuccess(imgDataUrl, field) {
				// console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;

			},
			cropUploadSuccess(jsonData, field) {
				// console.log('-------- upload success --------');
				this.user_photo = jsonData.result.user_photo
				this.$message({
					showClose: true,
					message: '头像修改成功',
					type: 'success'
				})
				this.show = !this.show;
				this.refresh()
			},
			cropUploadFail(status, field) {
				// console.log('-------- upload fail --------');
				console.log(status);
			},
			submitPassword(){
				if(this.form2.password2!=this.form2.password3){
					this.$message({
						showClose: true,
						message: '两次密码输入不一致',
						type: 'error'
					})
					return
				}
				 this.$axios.post("/api/changePassword",qs.stringify({
					_id:this.$cookies.get("userInfo")._id,
				 	password1: this.form2.password1,
				 	password2: this.form2.password2,
				 	password3: this.form2.password3
				 })).then(result=>{
					 if(result.data.msgcode==0){
						 this.$message({
						 	showClose: true,
						 	message: '密码错误',
						 	type: 'error'
						 })
					 }else{
						 this.$message({
						 	showClose: true,
						 	message: '修改成功',
						 	type: 'success'
						 })
						 setTimeout(()=>{
						 this.$cookies.remove('userInfo')		
						 this.$router.replace("/")
						 alert("密码已经修改，请使用新密码重新登录")
						 location.reload()},1000)
					 }
				 })
			}
		},
		created() {
			this.$axios.get("/photo_edit", {
					params: {
						_id: this.$cookies.get('userInfo')._id
					}
				})
				.then(result => {
					this.user_photo = result.data.result.user_photo
					this.form.realname = result.data.result.realname
					this.form.gender = result.data.result.gender
					this.form.age = result.data.result.age
					this.form.industry = result.data.result.industry
					this.form.introduce = result.data.result.introduce
				})
				console.log(this.$router)
		},
		mounted() {

		},
		beforeRouteEnter: (to, from, next) => {
			if ($cookies.get('userInfo')) {
				next()
			} else {
				alert("你还没有登录，请先登录")
				to.path == "/"
			}
		}
	};
</script>

<style scoped>
	.userctn {
		display: flex;
		padding: 15px 0 0 0;
	}

	.user-photo {
		width: 100px;
	}

	.user-photo>span {
		display: block;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	.user-photo>span img {
		max-width: 100%;
	}

	.user-photo>a {
		display: block;
		text-align: center;
		transition: all 0.3s ease-out;
	}

	.user-photo>a:hover {
		color: rgba(64, 158, 255);
	}

	.user-info {
		width: calc(100% - 100px);
		padding: 0 0 0 30px;
	}

	.user-info>h5 {
		display: block;
		font-size: 14px;
		line-height: 32px;
		color: #4d4d4d;
	}

	.edit-zl {
		text-align: center;
		color: #333;
		font-size: 16px;
		font-weight: bold;
		margin: 30px 0 0 0;
		font-weight: 100;
		transition: all 0.3s ease-out;
	}

	.edit-zl:hover {
		color: rgb(64, 158, 255);
		cursor: pointer;
	}
	#xgpsd{ width: 350px;}
</style>
