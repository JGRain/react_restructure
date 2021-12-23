import Component from './Component'
/**
 *
 * @param {*} type 元素的类型 可能是一个字符串（原生组件），也可能是一个组件（函数）
 * @param {*} config 配置对象，一般来说就是属性对象
 * @param {*} children  第一个儿子
 */
function createdElement(type, config, children) {
	let ref
	if (config) {
		delete config._owner
		delete config._store
		ref = config.ref
		delete config.ref
	}
	let props = { ...config }
	if (arguments.length > 3) {
		children = Array.prototype.splice.call(arguments, 2)
	}
	// children可能是数组（多余1个儿子），也可能是
	props.children = children
	return {
		// react元素 也就是虚拟dom type是元素类型，props是元素的属性 vdom
		type,
		props,
		ref,
	}
}
function createRef() {
	return { current: null }
}
let React = {
	createRef,
	createdElement,
	Component,
}
export default React
