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
 *把虚拟dom转换成真实dom
 * @param {*} vdom null 数字 字符串 React元素
 */
export function createDom(vdom) {
	debugger
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
	if (classInstance.componentWillMount) {
		classInstance.componentWillMount()
	}
	let renderVdom = classInstance.render() // <h1>hellow,zhufeng</h1>
	const dom = createDom(renderVdom)
	// 让类组件实例上挂一个dom指向类组件的实例的真实dom，setState会用到
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
function updateProps(dom, newProps) {
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
export default { render }
