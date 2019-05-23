import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import $ from 'jquery'
import VueCookies from 'vue-cookies'
import 'babel-polyfill'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Axios.defaults.baseURL = 'http://127.0.0.1:8088'
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios的默认值

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// vue-quill-editor富文本编辑器

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.HOST = '/api'

Vue.use(ElementUI)
Vue.use(VueCookies)

// router.beforeEach((to,from,next)=>{
//   next();
// })

new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	render: (createElement) => {
		return createElement(App);
	}
})
