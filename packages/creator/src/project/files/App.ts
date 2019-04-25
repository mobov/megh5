/* eslint-disable */
export default `
<style lang="scss">
	@import "~@mobov/scss-helper/import";
	html, body {
	  padding: 0;
	  margin: 0;
		min-height: 100vh;
		min-width: 100vw;
	}

	[data-client-type="mobile"] #app {
		min-height: 100vh;
		min-width: 100vw;
	}
	[data-client-type="pc"] body {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	[data-client-type="pc"] #app {
		overflow-x: hidden;
		overflow-y: auto;
		@include no-scroll-bar;
		margin: 0 auto;
	}
	.previewer {
		padding: 2rem;
	.previewer-screen {
		height: 736px;
		width: 320px;
		border-radius: 12px;
		box-shadow: 0 0 0 14px #090a0d, 0 0 0 17px #9fa3a8, 0 0 34px 17px rgba(0,0,0,0.2);
		margin: 0;
		overflow: hidden;
		position: relative;
		z-index: 1;
	}
	.previewer-screen-main {
			font-size: 10px;
			height: inherit;
			width: inherit;
			max-width: inherit;
			min-width: inherit;
			@include scroller();
			@include no-scroll-bar();
		}
	}
</style>
<script>
	import ProjectData from './megh5.json'
	import { Client, isMobile, getUrlParam }  from '@mobov/es-helper'
	const $root = document.querySelector('html')
	const ScreenWidth = $root.offsetWidth || $root.clientWidth

	let $ratio = 1

	Client.init(getUrlParam('lang'))

	if (Client.type === 'mobile') {
		$ratio = ScreenWidth / ProjectData.Device.width
	}

	function compiler (h, PNode) {
		const result = []

		if (PNode !== undefined) {
			PNode.forEach(node => {

					if (node.nodeData.props) {

						Object.keys(node.nodeData.props).forEach(prop => {
							if (['height', 'width', 'x', 'y'].includes(prop)) {
								node.nodeData.props[prop] *= $ratio
							}
							if (typeof node.nodeData.props[prop] === 'string' && node.nodeData.props[prop].indexOf('@/assets') === 0) {
								const asset = node.nodeData.props[prop].replace('@/assets/', '')
								node.nodeData.props[prop] = require (\`@/assets/$\{asset}\`)
							}
						})
					}
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
				},
				style: Client.type === 'pc' ? {
					maxHeight: \`\$\{ProjectData.Device.height}px\`,
					maxWidth: \`\$\{ProjectData.Device.width}px\`
				} : {}
			}, compiler(h, ProjectData.UiNodes))
		}
	}
</script>
`
