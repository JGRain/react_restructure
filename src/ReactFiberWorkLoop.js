import { beginWork } from './ReactFiberBeginWork'
let workInProress = null

// 每一个fiber都是一个工作单元
function performUnitWork(unitOfWork) {
	let current = unitOfWork.alternate
	return beginWork(current, unitOfWork)
}
function workloop() {
	while (workInProress !== null) {
		workInProress = performUnitWork(workInProress)
	}
}

// 正常来说我们需要根节点向下侯建，Counter
export function render(fiber) {
	workInProress = fiber
	workloop()
}
