import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 如何获取 最新的值
 * useRef 会返回一个可变的ref对象，{current}
 * ref对象在整个组件的生命周期内保持不变
 */

let hookStates = []
let hookIndex = 0

function useState(initalState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initalState
	let currentIndex = hookIndex
	function setState(newState) {
		hookStates[currentIndex] =
			typeof newState === 'function'
				? newState(hookStates[currentIndex])
				: newState
		render()
	}
	return [hookStates[hookIndex++], setState]
}

function useRef(current) {
	hookStates[hookIndex] = hookStates[hookIndex] || { current }

	return hookStates[hookIndex++]
}

// 只要此函数组件重新渲染执行完成了，那么里面的状态就是最新的了
function Counter() {
	let [number, setnumber] = useState(1)
	let lastNumber = useRef(number)
	let alternumber = () => {
		setTimeout(() => {
			alert(lastNumber.current)
		}, 3000)
	}
	// 在每次渲染结束后 这时候number是最新的，我就把number赋值
	React.useEffect(() => {
		lastNumber.current = number
	})
	return (
		<div>
			<p>number:{number}</p>
			<button
				onClick={() => {
					setnumber(number + 1)
				}}
			>
				+
			</button>
			<button onClick={alternumber}>alter</button>
		</div>
	)
}
function render() {
	hookIndex = 0
	ReactDOM.render(
		<>
			<Counter />
		</>,
		document.getElementById('root')
	)
}
render()

/**  
 * (alias) useMemo<{
    number: number;
}>(factory: () => {
    number: number;
}, deps: React.DependencyList): {
    number: number;
}
 * 
 * 
 * 
*/
