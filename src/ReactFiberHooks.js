import { findByRole } from '@testing-library/react'

let ReactCurrentDispatcher = { current: null }
let workInprogressHook = null
let currentlyRendderingFiber // 当前正在使用的fiber
const HookDispatcherOnMount = {
	useReducer: mountReducer,
}
export function useReducer(reducer, initialArg) {
	return ReactCurrentDispatcher.current.useReducer(reducer, initialArg)
}
export function renderWithHooks(current, workInProgress, Component) {
	currentlyRendderingFiber = workInProgress
	ReactCurrentDispatcher.current = HookDispatcherOnMount
	let children = Component() // couner组件的渲染方法
	currentlyRendderingFiber = null
	workInprogressHook = null
	return children
}
function mountReducer(reducer, initialArg) {
	// 构建 hooks单项链表
	let hook = mountWorkInprogressHook()
	hook.memoizedState = initialArg
	const queue = (hook.queue = { pending: null }) //更新队列
	const dispatch = dispatchAction.bind(null, currentlyRendderingFiber, queue)
	return [hook.memoizedState, dispatch]
}
function dispatchAction(currentlyRendderingFiber, queue, action) {
	const update = { action, next: null } // 创建一个update对象
	const pending = queue.pending
	if (pending === null) {
		update.next = update // 让自己和自己构建成一个循环链表 环装链表
	} else {
		update.next = pending.next
		pending.next = update
	}
	queue.pending = update
	console.log('queue.pending', queue.pending)
}
function mountWorkInprogressHook() {
	let hook = {
		// 创建一个hook对象
		memoizedState: null,
		queue: null,
		next: null,
	}
	if (workInprogressHook === null) {
		currentlyRendderingFiber.memoizedState = workInprogressHook = hook
	} else {
		currentlyRendderingFiber.next = hook
	}
	return workInprogressHook
}
