import { REACT_ELEMENt_TYPE } from './ReactSymbol'
/**
 *
 * @param {*} type
 * @param {*} config
 * @param {*} children
 */
var RESERVED_PROPS = {
	key: true,
	ref: true,
	__self: true,
	__source: true,
}
export function createElement(type, config, children) {
	const props = {}
	let key = null
	if (config !== null) {
		key = config.key
	}
	for (const propsName of config) {
		if (!RESERVED_PROPS.hasOWnproperty(propsName)) {
			props[propsName] = config[propsName]
		}
	}
	const childrenLength = arguments.length - 2
	if (childrenLength === 1) {
		props.children = children
	} else if (childrenLength > 1) {
		const childArray = Array(childrenLength)
		for (let index = 0; index < childrenLength; index++) {
			childArray[index] = arguments[index + 2]
		}
  }
  // React.createElement 方法返回的是一个普通的js对象，它可以描述元素的样子，它就是所谓的虚拟DOM
  // 虚拟是跨平台 跟平台无关
	const element = {
		$$Typeof: REACT_ELEMENt_TYPE,
		type,
		key,
		props,
	}
	return element
}

// ReactNode 表示一个可以渲染的值 null|string|number|React元素
