import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import Blog from '../components/blog/Blog'
import BlogList from '../components/blog/BlogList'
import SearchBlog from '../components/blog/SearchBlog'
import BlogView from '../components/blog/BlogView'
import Admin from '../components/admin/Admin'
import Subscriber from '../components/admin/Subscriber'
import Classification from '../components/admin/Classification'
import ClassificationAdd from '../components/admin/ClassificationAdd'
import ClassificationEdit from '../components/admin/ClassificationEdit'
import Content from '../components/admin/Content'
import ContentAdd from '../components/admin/ContentAdd'
import ContentEdit from '../components/admin/ContentEdit'
import Personal from '../components/personalCenter/Personal'

Vue.use(Router)

// Router.beforeEach((to,from,next)=>{
// 	
// })

export default new Router({
	mode: 'history',
  routes: [
		{
			path:"/",
			redirect:"/blog/bloglist"
		},
		{
			path:"/blog",
			name: 'Blog',
			component: Blog,
			children:[
				{
					path: '/blog/bloglist',
					name: 'BlogList',
					component: BlogList
				}
			]
		},
		{
		  path: '/searchBlog',
		  name: 'SearchBlog',
		  component: SearchBlog
		},
		{
		  path: '/blog/view',
		  name: 'BlogView',
		  component: BlogView
		},
		{
		  path: '/admin',
		  name: 'Admin',
		  component: Admin,
			children:[
				{
					path: '/admin/subscriber',
					name: 'Subscriber',
					component: Subscriber
				},
				{
					path: '/admin/classification',
					name: 'Classification',
					component: Classification,
				},
				{
					path: '/admin/classificationAdd',
					name: 'ClassificationAdd',
					component: ClassificationAdd
				},
				{
					path: '/admin/classificationEdit',
					name: 'ClassificationEdit',
					component: ClassificationEdit
				},
				{
					path: '/admin/content',
					name: 'Content',
					component: Content
				},
				{
					path: '/admin/contentAdd',
					name: 'ContentAdd',
					component: ContentAdd
				},
				{
					path: '/admin/contentEdit',
					name: 'ContentEdit',
					component: ContentEdit
				}
			]
		},
		{
		  path: '/personal',
		  name: 'Personal',
		  component: Personal
		}
  ]
})
