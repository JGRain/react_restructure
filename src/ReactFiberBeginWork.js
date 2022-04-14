import {
	FunctionComponent,
	HostComponent,
	IndeterminateComponent,
} from './ReactWorkTags'
import { renderWithHooks } from './ReactFiberHooks'
/**
 *
 * @param {*} current  上一个Fiber 初次挂在时候是一个null
 * @param {*} unitOfWork 这一次正在构建中的Fiber
 */
export function beginWork(current, workInProgress) {
	if (current) {
		switch (workInProgress.tag) {
			case FunctionComponent: // 函数组件
				return updateFunctionComponent(
					current,
					workInProgress,
					workInProgress.type
				)

			default:
				break
		}
	} else {
		switch (workInProgress.tag) {
			case IndeterminateComponent:
				return mountIndeterminateComponent(
					current,
					workInProgress,
					workInProgress.type
				)

			default:
				break
		}
	}
}
function updateFunctionComponent(current, workInProgress, Component) {
	const newChildren = renderWithHooks(current, workInProgress, Component)
	console.log('children', newChildren)
	window.counter = newChildren
	// 根据儿子的或者上面返回的虚拟DOm侯建fiber子树
	reconcileChildren(current, workInProgress, newChildren)
	return null
}
function mountIndeterminateComponent(current, workInProgress, Component) {
	const children = renderWithHooks(current, workInProgress, Component)
	console.log('children', children)
	window.counter = children
	workInProgress.tag = FunctionComponent
	// 根据儿子的或者上面返回的虚拟DOm侯建fiber子树
	reconcileChildren(current, workInProgress, children)
	return null
}
/**
 * 就是根据组件返回的虚拟dom构建子Fiber链条的过程
 * @param {*} current
 * @param {*} workInProgress
 * @param {*} children
 */
function reconcileChildren(current, workInProgress, children) {
	let prevFiber
	let child
	for (let index = 0; index < children.length; index++) {
		let fiber = {
			tag: children[index].tag,
			type: children[index].type,
		}
		if (index === 0) {
			workInProgress.child = fiber // 第一个fiber 大儿子
		} else {
			prevFiber.sibling = fiber // 大儿子的sibling指向二儿子.sibling 指向三儿子
		}
		prevFiber = fiber
	}
	let childFiber = {
		tag: HostComponent,
		type: children.type,
	}
	workInProgress.child = childFiber
}
