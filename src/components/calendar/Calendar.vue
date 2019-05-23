<template>
	<ele-calendar :render-content="renderContent" :data="datedef" :prop="prop"></ele-calendar>
</template>

<script>
	import eleCalendar from 'ele-calendar'
	import 'ele-calendar/dist/vue-calendar.css'
	export default {
		data() {
			return {
				datedef: [{
						"date": "2018-06-30",
						"content": null,
						"cid": null
					},
					{
						"date": "2018-06-26",
						"content": null,
						"cid": null
					},
				],
				prop: 'date' //对应日期字段名
			}
		},
		components: {
			eleCalendar
		},
		methods: {
			renderContent(h, parmas) {
				const loop = data => {
					return (
						data.defvalue.value ? ( < div > < div > {
								data.defvalue.text
							} < /div>  <
							span > 备选项 < /span></div > ) : < div > {
							data.defvalue.text
						} < /div>
					)
				}
				return ( <
					div style = "min-height:60px;" > {
						loop(parmas)
					} <
					/div>
				)
			}
		}
	}
</script>


<style scoped>

</style>
