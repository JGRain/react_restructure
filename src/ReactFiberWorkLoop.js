import { ClassComponent, HostRoot, HostComponent } from './ReactWorkTags'
import { SyncLane } from './ReactFiberLane'
import { ConcurrentMode, NoMode } from './ReactTypeOfMode'
let SyncLanePriority = 12
let NoLanePriority = 0
let syncQueue = []
let Nocontext = 0
let Batchcontext = 1
let executionContext = Nocontext // 执行环境默认值是非批量
export function scheduleUpdateOnFiber(fiber) {
	const root = markUpdateLaneFromFiberToRoot(fiber)
	// 开始创建一个任务，从更节点开始进行更新
	ensureRootIsScheduled(root)
	// 如果当前的执行上下文为非批量模式并且Modeb不是并发的话
	if (
		executionContext === Nocontext &&
		(fiber.mode & ConcurrentMode) === NoMode
	) {
		flushSyncCallbackQueue()
	}
}
// ReactDOM。unstable_batchedUpdate
export function batchUpdates(fn) {
	let prevExecutionContext = executionContext
	executionContext |= Batchcontext
	fn()
	executionContext = prevExecutionContext
}
function ensureRootIsScheduled(root) {
	debugger
	let nextLanes = SyncLane //1
	let newCallbackPriority = SyncLanePriority // 按理说应该等于最高级别赛道的优先级
	let existingCallbackPriority = root.callbackPriority //当前根节点上正在更新的优先级
	if (existingCallbackPriority === newCallbackPriority) {
		// 也是在并发模式，及时在setTimeout里也是批量的原因
		return // 如果这个新的更新和当前根节点的已经调度的更新相等，那就直接返回，复用上一次的更新，不在创建新的更新
	}
	scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))

	queueMicrotask(flushSyncCallbackQueue)

	root.callbackPriority = newCallbackPriority
}
function flushSyncCallbackQueue() {
	syncQueue.forEach((cb) => cb())
	syncQueue.length = 0
}
// 其实就把performSyncWorkOnRoot函数添加一个队列里，等待执行
function scheduleSyncCallback(callback) {
	syncQueue.push(callback)
}
// 这个其实就是我们真正的渲染任务了，比较老的节点和新的节点，得到domdiff结果 更新DOM 都是这个方法里进行的
function performSyncWorkOnRoot(workInProgress) {
	let root = workInProgress
	console.log('开始执行调合任务')
	while (workInProgress) {
		if (workInProgress.tag === ClassComponent) {
			let inst = workInProgress.stateNode
			inst.state = processUpdateQueue(inst, workInProgress)
			inst.render() // 得到新状态后，就可以调用render方法得到新的虚拟dom,进行domdiff 更新dom
		}
		workInProgress = workInProgress.child
	}
	commitRoot(root)
}
function commitRoot(root) {
	root.callbackPriority = NoLanePriority
}
// 根据老的状态和我们的更新队列计算新状态
function processUpdateQueue(inst, fiber) {
	return fiber.updateQueue.reduce((state, { payload }) => {
		if (typeof payload === 'function') {
			payload = payload(state)
		}
		return { ...state, ...payload }
	}, inst.state)
}
function markUpdateLaneFromFiberToRoot(fiber) {
	let parent = fiber.return
	while (parent) {
		fiber = parent
		parent = parent.return
	}
	if (fiber.tag === HostRoot) {
		return fiber
	}
	return null
}
