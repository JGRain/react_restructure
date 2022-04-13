import { SyncLane } from './ReactFiberLane'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
let classComponentUpdater = {
	// 把新状态入列，第1参数是组件实例，第二参数是新状态
	enqueueSetState(inst, payload) {
		let fiber = get(inst)
		let eventTime = requestEventTime()
		let lane = requestUpdateLane(fiber) // 计算本次更新优先级
		// eventTime计算超时时间lane计算任务优先级
		let update = createUpdate(eventTime, lane) // 创建新的更新对象
		update.payload = payload
		enqueueUpdate(fiber, update)
		scheduleUpdateOnFiber(fiber) // 调度
	},
}
//
function enqueueUpdate(fiber, update) {
	fiber.updateQueue.push(update) // 源码里是一个链表
}
function createUpdate(eventTime, lane) {
	return {
		eventTime,
		lane,
	}
}
function requestUpdateLane(fiber) {
	// 这个地方应该按照当前事件的优先级判断赛道
	return SyncLane
}
// 任务是有优先级的，优先级高的会打断优先级低的
// 1低优先级任务加一个超时时间 2
function requestEventTime() {
	return performance.now() // 程序从启动导线在的时间，是用来计算任务的过期时间
}
//
function get(inst) {
	return inst._reactInternal
}
export class Component {
	constructor() {
		this.updater = classComponentUpdater
	}

	setState(partialState) {
		// 调用次组件更新器的enqueueSetState入队新状态 参数组件的实例和新状态
		this.updater.enqueueSetState(this, partialState)
	}
}
