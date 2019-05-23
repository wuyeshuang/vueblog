<template>
	<div id="app">
		<Header />
		<Main  v-if="isRouterAlive"/>
		<Footer />
	</div>
</template>

<script>
	import Header from "./components/mains/Header"
	import Main from "./components/mains/Main"
	import Footer from "./components/mains/Footer"
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(() => {
					this.isRouterAlive = true
				})
			}
		},
		components: {
			Header,
			Main,
			Footer
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style>
	.wrap {
		width: 1200px;
		margin: 0 auto;
	}

	.el-container {
		width: 1200px;
		margin: 0 auto;
	}

	li,
	img,
	input,
	em,
	select {
		list-style: none;
		border: none;
		font-style: normal;
		outline: none;
	}

	a {
		text-decoration: none !important;
		cursor: pointer !important;
		color: #333;
	}
</style>
