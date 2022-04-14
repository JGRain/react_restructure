import { schrduleUpdateOnFiber } from './ReactFiberWorkLoop'

let ReactCurrentDispatcher = { current: null }
let workInprogressHook = null // 当前的新hook
let currentHook = null // 当前的老hook
let currentlyRendderingFiber // 当前正在使用的fiber
const HookDispatcherOnMount = {
	useReducer: mountReducer,
	useState: mountState,
}
const HookDispatcherOnUpdate = {
	useReducer: updateReducer,
	useState: updateState,
}
function basicStateReducer(state, action) {
	return typeof action === 'function' ? action(state) : action
}
function updateState(initialState) {
	return updateReducer(basicStateReducer, initialState)
}
function mountState(reducer, initialArg) {
	// 构建 hooks单项链表
	let hook = mountWorkInprogressHook() // 获取当前的hook
	hook.memoizedState = initialArg // 0
	const queue = (hook.queue = { pending: null }) //更新队列
	const dispatch = dispatchAction.bind(null, currentlyRendderingFiber, queue)
	return [hook.memoizedState, dispatch]
}
export function updateReducer(reducer, initialArg) {
	let hook = updateWorkInprogressHook() //更新的时候也要构建一个新的hook链表
	let queue = hook.queue // 更新队列
	let current = currentHook
	const pendingQueue = queue.pending // update的环装链表
	if (pendingQueue !== null) {
		// 根据老的状态和更新队列里的更新对象计算新的状态
		let first = pendingQueue.next
		let newState = current.memoizedState // 得到老状态
		let update = first
		do {
			const action = update.action //action 对象{type:'add'}
			newState = reducer(newState, action)
			update = update.next
		} while (update !== null && update !== first)
		queue.pending = null //更新过来可以清空更新幻想链表
		hook.memoizedState = newState // 让新的hook对象的memoizedState等于计算的新状态
	}
	const dispatch = dispatchAction.bind(null, currentlyRendderingFiber, queue)
	return [hook.memoizedState, dispatch]
}
function updateWorkInprogressHook() {
	// 取到当前新hook对应的老hook
	let nextCurrentHook // current老的 workInProgress 新的
	if (currentHook === null) {
		let current = currentlyRendderingFiber.alternate // 老的conterFiber
		nextCurrentHook = current.memoizedState // 老的fiber的memoizedState指向老的hook链表的第一个节点
	} else {
		nextCurrentHook = currentHook.next
	}
	currentHook = nextCurrentHook

	const newHook = {
		memoizedState: currentHook.memoizedState,
		queue: currentHook.queue,
		next: null,
	}

	if (workInprogressHook === null) {
		currentlyRendderingFiber.memoizedState = workInprogressHook = newHook
	} else {
		workInprogressHook.next = newHook
		workInprogressHook = newHook
	}
	return workInprogressHook
}

export function useReducer(reducer, initialArg) {
	return ReactCurrentDispatcher.current.useReducer(reducer, initialArg)
}
export function useState(initialState) {
	return ReactCurrentDispatcher.current.useState(initialState)
}

export function renderWithHooks(current, workInProgress, Component) {
	currentlyRendderingFiber = workInProgress
	currentlyRendderingFiber.memoizedState = null // 在执行组件方法之前，要清空hook链表，因为你肯定要新建新的链表
	// 说明是更新流程
	if (current !== null) {
		ReactCurrentDispatcher.current = HookDispatcherOnUpdate
	} else {
		ReactCurrentDispatcher.current = HookDispatcherOnMount
	}
	let children = Component() // couner组件的渲染方法
	currentlyRendderingFiber = null
	workInprogressHook = null
	currentHook = null
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
	schrduleUpdateOnFiber()
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
