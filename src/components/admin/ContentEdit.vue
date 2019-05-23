<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
<!-- 			<el-form-item label="分类:">
				<el-select v-model="form.categorys" placeholder="请选择分类" value-key="_id">
					<el-option v-for="category in category" :key="category._id" :label="category.name" :value="category._id"></el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item label="标题:">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="简介:">
				<el-input v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item label="内容:">
				<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
				 @change="onEditorChange($event)">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即添加</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	import quillConfig from '../../quill-config.js'
	import qs from 'qs'
	export default {
		name: "ContentEdit",
		data() {
			return {
				 quillOption: quillConfig,
				
				 labelPosition:"top",
				 form: {
				 	categorys:"",
				 	title:"",
				 	description:""
         },
				
				content: null,
				editorOption: {},
				// uploadUrl: process.env.BASE_API + "/system/editfile/upload",//文件上传接口
				category:[]
			}
		},
		methods: {
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			
			},
			onSubmit() {
        var userInfo=this.$cookies.get('userInfo')._id
				this.$axios.post("/admin/content/edit",qs.stringify({
					// categorys: this.form.categorys,
					id:this.$route.query.ContentId,
					title: this.form.title,
					description: this.form.description,
					content: this.content,
					// user: userInfo
				}))
				.then(result=>{
					if(result.data.msgcode==1){
						this.$message({
							showClose: true,
							message: '修改成功',
							type: 'success'
						})
						this.$router.replace("/admin/content")
					}
				})
      }

		},
		created() {
			this.$axios.get("/admin/content/edit",{params:{
				id:this.$route.query.ContentId
			}})
			.then(result=>{
				// console.log(result.data.content)
				this.form.title=result.data.content.title
				this.form.description=result.data.content.description
				this.content=result.data.content.content
			})
		}
	}
</script>

<style scoped>
	
</style>
