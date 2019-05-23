<template>
	<div>
		<div id="search">
			<div class="search-title">搜索</div>
			<el-form :inline="true" class="demo-form-inline">
				<el-input v-model="search" placeholder="请输入..." @keyup.enter.native="searchEnterFun"></el-input>
				<router-link :to="{name:'SearchBlog',query:{searchData:search}}" @click="onSubmit">
					<el-button type="primary">搜索</el-button>
				</router-link>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Search",
		data() {
			return {
				search: "",
			}
		},
		methods: {
			onSubmit() {},
			searchEnterFun: function(e) {
				// var keyCode = window.event? e.keyCode:e.which;
				if (e.keyCode == 13) {
					// console.log("2")
					// this.onSubmit()
				}

			}

		}
	}
</script>

<style scoped>
	#search {
		padding: 30px 0 0 0;
	}

	.search-title {
		border-bottom: 1px #ccc solid;
		font-size: 18px;
		line-height: 30px;
		margin: 0 0 10px 0;
	}

	#search .el-input {
		width: calc(100% - 70px);
	}

	#search .el-button {
		float: right;
	}
</style>
