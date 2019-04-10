/* eslint-disable */
export default `
<style>
html, body {
  padding: 0;
  margin: 0;
}
</style>
<script>
	import ProjectData from './megh5.json'

	function compiler (h, PNode) {
		const result = []

		if (PNode !== undefined) {
			PNode.forEach(node  => {
					result.push(h(node.name, node.nodeData, node.children ? compiler(h, node.children) : []))
			})

			return result
		}
	}

	export default {
		name: 'app',
		render (h) {

			return h('div', {
				attrs: {
					id: 'app'
				}
			}, compiler(h, ProjectData.UiNodes))
		}
	}
</script>
`
