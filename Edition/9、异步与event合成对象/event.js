import { updateQueue } from './Component';
/**
 * 给哪个DOM元素绑定哪种类型的事件
 * @param {*} dom 给目标dom绑定事件
 * @param {*} eventType  事件类型
 * @param {*} listener 事件处理函数
 */

/**
 *
 * 合成事件的作用
 * 1、可以实现批量更新
 * 2、可以实现事件对象的缓存和回收
 *
 *
 */
export function addEvent(dom, eventType, listener) {
  // 给DOm增加一个store
  let store = dom.store || (dom.store = {});
  store[eventType] = listener;
  // document.addEventListener(eventType.slice(2), dispatchEvent, false);
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}
/**
 *
 * @param {*} event 原生的dom对象
 */
let syntheticEvent = {};
function dispatchEvent(event) {
  let { target, type } = event; // type = click target 事件源 button dom
  let eventType = `on${type}`; // onclick
  updateQueue.isBatchingUpdate = true;
  let { store } = target;
  let listener = store && store[eventType];
  if (listener) {
    let syntheticEvent = createSynthetickEvent(event);
    listener.call(target, syntheticEvent);
    for (let key in syntheticEvent) {
      syntheticEvent[key] = null;
    }
  }
  updateQueue.betchUpdate();
}
function createSynthetickEvent(nativeEvent) {
  for (const key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  return syntheticEvent;
}
