<template>
	
	<div>
		<el-row :gutter="40">
			<el-col :span="18">
				
				<div class="content-title">
					{{content.title}}
				</div>
				<div class="content-bar">
					<div class="content-time">{{content.addTime}}</div>
					<div class="content-author">发表人:<a href="javascript:;">{{user.username}}</a></div>
					<div class="content-view">阅读数:<span>{{content.views}}</span></div>
				</div>
				<div class="content-body ql-container ql-snow">
					<div class="ql-editor" v-html="content.content"></div>
				</div>
				
				<a href="javascript:history.back(-1)" class="goback">返回上一页</a>
				<p class="loginTip" v-if="!isLogin">请在登录后发表评论</p>
				<div class="mycomment" v-if="isLogin">
					<form>
						<textarea name="mycomment" v-model="mycomment" id="" cols="" rows=""></textarea>
						<input type="submit" value="发表评论" @click="sendcomment" />
					</form>
				</div>
				<ul class="comments">
					<li v-for="comment in comments">
						<div class="comtop">
							<span class="comimg"><img :src="'http://127.0.0.1:8088'+comment.user_link.user_photo" alt=""></span>
							<div class="comright">
								<span class="comtit"><span>{{comment.user_link.username}}</span>:</span>
								<span class="comt">{{comment.comments[0].content}}</span>
								<span class="comtime">({{comment.comments[0].postTime}})</span>
							</div>
						</div>
					</li>
				</ul>
				
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
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import qs from "qs"
	export default {
		name: 'BlogView',
		data() {
			return {
				category: null,
				content: {},
				user: {},
				comments: [],
				isLogin: false,
				mycomment: "",
				loading: true
			}
		},
		components:{
			Calendar,
			Search,
			NewBlog
		},
		methods: {
			sendcomment() {
				this.$axios.post("/api/comment/post", qs.stringify({
						contentid: this.$cookies.get('userInfo')._id,
						username: this.$cookies.get('userInfo').username,
						contentInfo: this.$route.query.contents,
						content: this.mycomment
					}))
					.then(ret => {
						return true
					}).catch(error => {
						console.log(error)
					})
				location.reload()
			},
			fetch(){
				this.$axios.get("/view", {
						params: {
							category: this.$route.query.contents,
						}
					})
					.then(ret => {
						this.content = ret.data.content
						this.user = ret.data.content.user
						this.comments = ret.data.ret
					})
			}
		},
		created() {
			if (this.$cookies.get('userInfo')) {
				this.isLogin = !this.isLogin
			}
			this.fetch()
		},
		mounted() {
			this.loading = false
		},
		watch:{
		  // 如果路由有变化，会再次执行该方法
		  "$route": "fetch"
		}
	}
</script>

<style scoped>
	.content-title {
		font-size: 24px;
		color: #333;
		line-height: 40px;
		font-weight: bold;
	}

	.content-bar {
		overflow: hidden;
		padding: 10px 0;
		margin: 0 0 20px 0;
	}

	.content-time {
		font-size: 12px;
		color: #666;
		float: left;
	}

	.content-author {
		font-size: 12px;
		color: #666;
		float: left;
		margin: 0 20px;
	}

	.content-author a {
		display: inline-block;
		color: #78a5f1;
		margin: 0 0 0 3px;
	}

	.content-view {
		font-size: 12px;
		color: #666;
		float: left;
	}

	.content-view span {
		display: inline-block;
		margin: 0 0 0 3px;
		color: #ff0000;
	}

	.goback {
		display: inline-block;
		margin: 30px 0 20px 0;
		font-size: 14px;
		color: #333;
	}

	.content-body {
		min-height: 200px;
		border: none !important;
	}
	.content-body img{ max-width: 100% !important;}
	.comments>li {
		padding: 5px 0;
		border-bottom: 1px rgba(153, 153, 153, 0.3) solid;
	}

	.comtop {
		overflow: hidden;
	}

	.comimg {
		width: 25px;
		height: 25px;
		float: left;
		margin: 0 5px 0 0;
		border-radius: 50%;
		overflow: hidden;
	}

	.comright {
		width: calc(100% - 30px);
		float: right;
	}

	.comimg img {
		width: 100%;
	}

	.comtit {
		display: inline;
		font-size: 14px;
		line-height: 25px;
		color: #666;
	}

	.comt {
		display: inline;
		font-size: 14px;
		color: #666;
		line-height: 25px;
		margin: 0 3px;
	}

	.comtime {
		display: inline;
		font-size: 12px;
		line-height: 25px;
		color: #666;
	}

	.mycomment {
		overflow: hidden;
		width: 100%;
		padding: 20px 0;
	}

	.mycomment textarea {
		width: 100%;
		border-radius: 5px;
		border: 1px rgba(153, 153, 153, 0.3) solid;
		box-sizing: border-box;
		transition: all 0.5s ease-out;
		height: 72px;
		line-height: 24px;
		padding: 0 5px;
		outline: none;
		resize: none;
	}

	.mycomment textarea:hover {
		border-color: rgba(64, 158, 255);
	}

	.mycomment textarea:focus {
		border-color: rgba(64, 158, 255);
	}

	.mycomment input {
		width: 120px;
		height: 40px;
		line-height: 40px;
		float: right;
		transition: all 0.5s ease-out;
		text-align: center;
		color: #fff;
		background: rgba(64, 158, 255);
		border-radius: 5px;
		margin: 10px 0 0 0;
		cursor: pointer;
	}

	.mycomment input:hover {
		background: rgba(51, 126, 204);
	}

	.loginTip {
		color: #333;
		font-weight: bold;
		margin: 0 0 10px 0;
	}
</style>
