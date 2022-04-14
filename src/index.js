import React from 'react'
import ReactDOM from 'react-dom'
import {
	ClassComponent,
	HostRoot,
	HostComponent,
	IndeterminateComponent,
} from './ReactWorkTags'
import { render } from './ReactFiberWorkLoop.js'
import { useReducer, useState } from './ReactFiberHooks'
// redux 接受老状态和动作，返回新状态
const reducer = (state, action) => {
	if (action.type === 'add') {
		return state + 1
	} else {
		return state
	}
}
function Counter() {
	const [number, setNumber] = useState(0)
	return (
		<div
			onClick={() => {
				setNumber(number + 1)
			}}
		>
			{number}
		</div>
	)
}
debugger
let workInProress = {
	tag: IndeterminateComponent, //Fiber类型 函数组件再初次渲染的时候对应的类型是 IndeterminateComponent
	type: Counter, // 此组件的具体类型
	alternate: null, //上一个渲染的fiber
}
render(workInProress)

// ReactDOM.render(<Counter />, document.getElementById('root'))

/****
 * 开两个服务
 *
 *
 **/
