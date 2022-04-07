let style = { color: 'green', border: '1px solid red', margin: '5px' }
let A = {
	type: 'div',
	key: 'A',
	props: {
		style,
		children: [
			{ type: 'div', key: 'B1', props: { style, children: [] } },
			{ type: 'div', key: 'B2', props: { style, children: [] } },
		],
	},
}

// 开始我们的工作循环
// 表示一个工作单元，表示正在处理中的fiber
let workInPogress
const PlaceMent = 'PlaceMent'
const TAG_ROOT = 'TAG_ROOT'
const TAG_HOST = 'TAG_HOST' // 原生dom节点
let root = document.getElementById('root')

// Fiber 是一个普通的js对象
let rootFiber = {
	tag: TAG_ROOT, // Fiber的类型
	key: 'ROOT', // 唯一标签
	stateNode: root, // Fiber对应的真实DOM节点
	props: {
		children: [A],
	},
}

function workLoop() {
	while (workInPogress) {
		workInPogress = performUnitOfWork(workInPogress) //执行完
	}
	console.log(rootFiber)
	commitRoot(rootFiber)
}
function commitRoot(rootFiber) {
	let currentEffect = rootFiber.firstEffect
	while (currentEffect) {
		let flags = currentEffect.flags
		switch (flags) {
			case PlaceMent:
				commitPlacement(currentEffect)
				break
		}
		currentEffect = currentEffect.nextEffect
	}
}
function commitPlacement(currentEffect) {
	let parent = currentEffect.return.stateNode
	parent.appendChild(currentEffect.stateNode)
}
function performUnitOfWork(workInPogress) {
	beginWork(workInPogress) // 构建子fiber树，父fiber的child = 大儿子.sibling=二儿子.sibling=三儿子
	// 如果创建完Fiber链表后，如果有大儿子，有太子
	if (workInPogress.child) {
		return workInPogress.child // 则返回处理太子，构建太子的儿子们
	}
	// 如果没有儿子，接着构建弟弟
	while (workInPogress) {
		// 也有可能是最小儿子完成了，它也会找其父完成
		completeUnitOfwork(workInPogress) // 如果没有儿子，自己就结束了
		if (workInPogress.sibling) {
			return workInPogress.sibling
		}
		// 如果弟弟也没有 找叔叔  // 什么时候到头
		workInPogress = workInPogress.return
		// 如果没有父亲，就全部结束了
	}
}
/**
 *Fiber在结束的时候要创建真实DOM元素
 *
 * @param {*} workInPogress
 */
function completeUnitOfwork(workInPogress) {
	console.log('completeUnitOfWork', workInPogress.key)
	let stateNode
	switch (workInPogress.tag) {
		case TAG_HOST:
			stateNode = createStateNode(workInPogress)
			break

		default:
			break
	}
	// 在完成工作的时候，顺便
	makeEffectList(workInPogress)
}
/**
 * EffectList 副作用链
 * 并不是包含所有的节点，而是包括有副作用的fiber节点
 * 对于初次渲染而言，所有节点都是包含
 *
 */
function makeEffectList(completeWork) {
	let returnFiber = completeWork.return
	if (returnFiber) {
		if (!returnFiber.firstEffect) {
			returnFiber.firstEffect = completeWork.firstEffect
		}
		if (completeWork.lastEffect) {
			if (returnFiber.lastEffect) {
				returnFiber.lastEffect.nextEffect = completeWork.firstEffect
			}
			returnFiber.lastEffect = completeWork.lastEffect
		}
		if (completeWork.flags) {
			if (returnFiber.lastEffect) {
				returnFiber.lastEffect.nextEffect = completeWork
			} else {
				returnFiber.firstEffect = completeWork
			}
			returnFiber.lastEffect = completeWork
		}
	}
}

function createStateNode(fiber) {
	if (fiber.tag === TAG_HOST) {
		let stateNode = document.createElement(fiber.type)
		fiber.stateNode = stateNode
	}
	return fiber.stateNode
}
/**
 *根据当前的Fiber和虚拟dom构建Fiber树
 *
 * @param {*} workInPogress
 */
function beginWork(workInPogress) {
	console.log('beginWork', workInPogress.key)
	let nextChildren = workInPogress.props.children
	// 会根据父Fiber和所有儿子虚拟DOm儿子构建出子fiber树，只有一层
	// 先让父亲把儿子一个个生出来，然后说孙子的事
	return reconcileChildren(workInPogress, nextChildren)
}
/**
 *
 * 根据父Fiber和子虚拟dom数组，构建当前returnFiber的子Fiber树
 * @param {*} returnFiber
 * @param {*} nexChildren
 * @returns
 */
function reconcileChildren(returnFiber, nexChildren) {
	let previousNewFiber // 上一个Fiber儿子
	let firstChildFiber = null // 当前returnFibler的大儿子
	for (let nexIndex = 0; nexIndex < nexChildren.length; nexIndex++) {
		let newFiber = createFiber(nexChildren[nexIndex])
		newFiber.flags = PlaceMent
		newFiber.return = returnFiber
		if (!previousNewFiber) {
			// 如果大儿子还没赋值，那说明大儿子，给赋上
			firstChildFiber = newFiber
		} else {
			previousNewFiber.sibling = newFiber
		}
		previousNewFiber = newFiber
	}
	returnFiber.child = firstChildFiber
	return firstChildFiber // 构建玩子fiber后会返回大儿子
}

function createFiber(element) {
	return {
		tag: TAG_HOST, // 原生DOM节点
		type: element.type, // 具体div p span
		key: element.key, // 唯一标识
		props: element.props, // 属性对象
	}
}
// 当前正在执行的工作单元
workInPogress = rootFiber
workLoop()
// 开始
