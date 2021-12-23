import { addEvent } from './event'

/**
 * 虚拟dom转换成正式dom，并插入到容器中
 * @param {*} vdom 虚拟dowm
 * @param {*} container 擦入到哪个容器里
 */
function render(vdom, container) {
	const dom = createDom(vdom)

	container.appendChild(dom)
}
/**
 * 把虚拟dom转换成真实dom
 * @param {*} vdom null 数字 字符串 React元素
 */
export function createDom(vdom) {
	// 如果vdom是一个字符串或者数字的话，创建一个文本的dom节点返回
	if (typeof vdom === 'string' || typeof vdom === 'number') {
		return document.createTextNode(vdom)
	}
	if (!vdom) {
		return ''
	}
	// 否则就是一个react元素
	let { type, props, ref } = vdom

	let dom
	if (typeof type === 'function') {
		if (type.isReactComponent) {
			return updateClassComponent(vdom)
		} else {
			return updateFunctionComponent(vdom)
		}
	} else {
		dom = document.createElement(type) // span div
	}
	updateProps(dom, props)
	if (
		typeof props.children === 'string' ||
		typeof props.children === 'number'
	) {
		dom.textContent = props.children
	} else if (typeof props.children == 'object' && props.children.type) {
		// 单个react元素节点
		render(props.children, dom)
	} else if (Array.isArray(props.children)) {
		// 多个子节点
		reconcileChildren(props.children, dom)
	} else {
		// 如果出现其他的意外情况 null就是空串
		dom.textContent = props.children ? props.children.toString() : ''
	}
	if (ref) {
		ref.current = dom
	}
	return dom
}
/**
 * 得到真实dom
 * 1. 创建类组件的实例
 * 2. 调用实例的render方法得到建还要渲染的react元素
 * 3. 把react元素转换成真实dom,挂载到父组件上
 * @param {*} vdom 类组件的虚拟dom react元素
 */
function updateClassComponent(vdom) {
	let { type, props } = vdom
	let classInstance = new type(props) // new Weclome({name:'zhufeng})
	vdom.classInstance = classInstance // 让虚拟dom的classInstance = 类组件实例
	if (classInstance.componentWillMount) {
		classInstance.componentWillMount()
	}
	let renderVdom = classInstance.render() // <h1>hellow,zhufeng</h1>
	const dom = createDom(renderVdom)
	// 让类组件实例上挂一个dom指向类组件的实例的真实dom，setState会用到
	vdom.dom = renderVdom.dom = dom //这个嘞虚拟DOM的dom属性和render方法返回的虚拟dom的dom属性都指向真实dom
	classInstance.oldVdom = renderVdom // 让组件实例的老的Vdom属性指向本次render出来的渲染
	classInstance.dom = dom
	if (classInstance.componentDidMount) {
		classInstance.componentDidMount()
	}
	return dom
}
/**
 * 得到真实dom
 * @param {*} vdom 函数组件的虚拟dom react元素
 * vdom{type:Welcome, props:{name:'zhufeng'}}
 * renderVdom {type:'h1,props:{children}}
 */
function updateFunctionComponent(vdom) {
	let { type, props } = vdom
	let renderVdom = type(props)
	return createDom(renderVdom)
}
/**
 * 把子节点从虚拟dom全部转成正式dom插入到父节点
 * @param {*} childrenVdom 子节点的虚拟dom数组
 * @param {*} parentDom 父节点的真实dom
 */
function reconcileChildren(childrenVdom, parentDom) {
	childrenVdom.forEach((childVdom) => {
		render(childVdom, parentDom)
	})
}

/**
 *  把属性对象中的元素设置到Dom上
 * @param {*} dom DOM元素
 * @param {*} newProps 属性对象
 */
function updateProps(dom, oldProps, newProps) {
	for (let key in newProps) {
		if (key === 'children') continue
		if (key === 'style') {
			let styleObj = newProps[key]
			for (let key in styleObj) dom.style[key] = styleObj[key]
		} else if (key.startsWith('on')) {
			// dom[key.toLocaleLowerCase()] = newProps[key]
			addEvent(dom, key.toLocaleLowerCase(), newProps[key])
		} else {
			dom[key] = newProps[key] // dom.classname = 'title'
		}
	}
}
/**
 * 找到老的虚拟dom与新的虚拟dom的差异，吧相应的差异更新到真实dom上
 * @param {*} parentDom 父的Dom节点
 * @param {*} oldVdom 老的虚拟Dom
 * @param {*} newVdom 新的虚拟Dom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
	// 如果老的是null新的也是null
	if (!oldVdom && !newVdom) {
		return null
		// 如果老的有新的没有，意味着节点被删除了
	} else if (oldVdom && !newVdom) {
		let currentDOM = oldVdom.dom
		parentDOM.removeChild(currentDOM)
		if (oldVdom.classInstance && oldVdom.classInstance.componentwillUnmout) {
			oldVdom.classInstance.componentwillUnmout()
		}
		return null
		// 如果老的没有新的有，就是新建节点
	} else if (!oldVdom && newVdom) {
		let newDOM = createDom(newVdom) //创建一个新的真实dom并且挂载到父节点Dom上
		newVdom.dom = newDOM
		// TODO 这个地方有个问题？一会再来解决这个问题
		parentDOM.appendChild(newDOM)
		return newVdom
	} else {
		// 新老节点都有值
		updateElement(oldVdom, newVdom)
		return newVdom
	}
}
/**
 * dom-diff时候，React为了优化性能有一些假设条件
 * 1、不考虑跨层级移动的情况
 * 进入深度比较
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 */
function updateElement(oldVdom, newVdom) {
	// 如果走到这，以为着我们要复用老的dom节点了
	let currentDOM = (newVdom.dom = oldVdom.dom) // 获取 老的真实DOM
	newVdom.classInstance = oldVdom.classInstance
	if (typeof oldVdom.type === 'string') {
		// 原生的DOM类型
		updateProps(currentDOM, oldVdom.props, newVdom.props)
		updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children)
	} else if (typeof oldVdom.type === 'function') {
		// 那就是一个组件
		updateClassInstance(oldVdom, newVdom)
	}
}
/**
 *
 * @param {*} parentDOM 父的真实DOM
 * @param {*} oldVChildren 老的虚拟DOM儿子们
 * @param {*} newVChildren 新的虚拟DOM儿子们
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
	if (
		(typeof oldVChildren === 'string' || typeof oldVChildren === 'number') &&
		(typeof newVChildren === 'string' || typeof newVChildren === 'number')
	) {
		if (oldVChildren !== newVChildren) {
			parentDOM.textContent = newVChildren
		}
		return
	}
	oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]
	newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren]
	let maxLength = Math.max(oldVChildren.length, newVChildren.length)
	// TODO DOM-DIFF优化
	for (let i = 0; i < maxLength; i++) {
		compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i])
	}
}

/**
 *
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateClassInstance(oldVdom, newVdom) {
	let classInstance = oldVdom.classInstance
	// 当父组件更新的时候，会让子组件更新
	if (classInstance.componentWillReceiveProps) {
		classInstance.componentWillReceiveProps()
	}
	// 把新属性传递给emitUpdate
	classInstance.updater.emitUpdate(newVdom.props)
}
export default { render }
