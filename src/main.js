let style = { color: 'green', border: '1px solid red', margin: '5px' }
let VirtualDOM = {
	type: 'div',
	key: 'A',
	props: {
		style,
		children: [
			'A',
			{ type: 'div', key: 'B1', props: { style, children: 'B1的文本' } },
			{ type: 'div', key: 'B2', props: { style, children: 'B2的文本' } },
		],
	},
}

// 开始我们的工作循环
// 表示一个工作单元，表示正在处理中的fiber
let workInPogress
const TAG_ROOT = 'TAG_ROOT'
let root = document.getElementById('root')
function workLoop() {
	while (workInPogress) {
		workInPogress = performUnitOfWork(workInPogress) //执行完
	}
}
// Fiber 是一个普通的js对象
let rootFiber = {
	tag: TAG_ROOT, // Fiber的类型
	key: 'ROOT', // 唯一标签
	stateNode: root, // Fiber对应的真实DOM节点
}
function performUnitOfWork(workInPogress) {
	console.log(workInPogress.key)
}
workInPogress = rootFiber
workLoop()
