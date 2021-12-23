import { updateQueue } from './Component'
/**
 *  给哪个dom元素绑定哪种类型的事件
 * @param {*} dom 给哪个DOm元素绑定时间Button 真实dom元素
 * @param {*} eventType 事件类型onclick
 * @param {*} listener 事件处理函数handleClick
 */

/**
 * 为什么需要合成事件
 * 1、可以实现批量更新
 * 2、可以实现事件对象的缓存和回收
 * 3、
 * **/
export function addEvent(dom, eventType, listener) {
	// 给dom增加一个syore属性，值是一个对象
	let store = dom.store || (dom.store = {})
	store[eventType] = listener // store.onclick = handleClick
	// document.addEventListener('click')
	// document.addEventListener(eventType.slice(2), dispatchEvent, false)
	if (!document[eventType]) {
		document[eventType] = dispatchEvent // doucument.onclick = dispatchEvent
	} else {
	}
}
let syntheticEvent = {}
function dispatchEvent(event) {
	// event是原生的dom事件对象
	let { target, type } = event // type=click target 事件源button dom
	let eventType = `on${type}` // onclick
	updateQueue.isBatchingUpdate = true
	let syntheticEvent = createSyntheticEvent(event)

	while (target) {
		let { store } = target
		let listener = store && store[eventType]
		listener && listener.call(target, syntheticEvent)
		target = target.parentNode
	}
	for (const key in syntheticEvent) {
		syntheticEvent[key] = null
	}
	updateQueue.batchUpdate()
}

function createSyntheticEvent(event) {
	for (const key in event) {
		syntheticEvent[key] = event[key]
	}
	return syntheticEvent
}
