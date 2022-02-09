import React from 'react'
import ReactDOM from 'react-dom'
/**
 * hooks都是函数
 * 以use开头
 * 类组加需要创建实例 性能差
 * 1、每次组件渲染都是一个独立的闭包
 * 函数式更新
 */

let lastState
function useState(initalState) {
	lastState =
		lastState || typeof initalState === 'function' ? initalState() : initalState
	function setState(newState) {
		if (typeof newState === 'function') {
			lastState = newState(lastState)
		} else {
			lastState = newState
		}
		render()
	}
	return [lastState, setState]
}
let lastRef
function useRef() {
	lastRef = lastRef || { current: null }
	return lastRef
}

function Counter() {
	let [number, setNumber] = useState(0)
	let numberRef = useRef()

	function alertNumber() {
		setTimeout(() => {
			setNumber((number) => number + 1) // number永远指定当时的渲染时的number，而不会指定最新的number值
		}, 1000)
	}
	return (
		<div>
			<p>{number}</p>
			<button
				onClick={() => {
					setNumber(number + 1)
					numberRef.current = number + 1
				}}
			>
				{' '}
				+
			</button>
			<button onClick={alertNumber}>alertNumber</button>
		</div>
	)
}
function render() {
	ReactDOM.render(<Counter />, document.getElementById('root'))
}
render()
