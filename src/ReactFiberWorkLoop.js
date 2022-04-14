import { beginWork } from './ReactFiberBeginWork'
let workInProress = null

// 每一个fiber都是一个工作单元
function performUnitWork(unitOfWork) {
	let current = unitOfWork.alternate
	return beginWork(current, unitOfWork)
}
export function workLoop() {
	while (workInProress !== null) {
		workInProress = performUnitWork(workInProress)
	}
}

// 正常来说我们需要根节点向下侯建，Counter
export function render(fiber) {
	workInProress = fiber
	workLoop()
}

/**
 * 我们这里简化了一些逻辑
 *  在源码里此处要从当前fiber向找到根节点在进行更新
 *  老的counterFiber向上找到跟几点fiberRoot-》然后再一级一级向下执行rennder再次渲染counterFiber
 * @param {*} fiber
 */
export function schrduleUpdateOnFiber(oldFiber) { // current Fiber
	let newFiber = {
		...oldFiber,
		alyernate: oldFiber,
	}
	workInProress = newFiber
	workLoop()
}
