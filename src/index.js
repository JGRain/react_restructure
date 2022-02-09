import React from 'react'
import ReactDOM from 'react-dom'
let hookStates = []
let hookIndex = 0

function useReducer(reducer, initalState, init) {
	hookStates[hookIndex] =
		hookStates[hookIndex] || (init ? init(initalState) : initalState)
	let currentIndex = hookIndex
	function dispatch(actions) {
		hookStates[currentIndex] = reducer
			? reducer(hookStates[currentIndex], actions)
			: actions
		render()
	}
	return [hookStates[hookIndex++], dispatch]
}

// useState 只是一个简化版的useReducer的语法糖
function useState(initalState) {
	// reducer就是一个状态变更的转换函数
	return useReducer(null, initalState)
}

/**
 * 处理器， 状态变更函数
 * 接受一个老状态和一个action（动作），返回一个新状态
 * @param {*} state
 * @param {*} action
 */
function reducer(state, action) {
	switch (action.type) {
		case 'ADD':
			return { number: state.number + 1 }
		case 'MINUS':
			return { number: state.number - 1 }
		default:
			return state
	}
}

let initialState = 0
function init(initialState) {
	return { number: initialState }
}

function Counter() {
	const [count, setCount] = useState(0)
	let [state, dispatch] = useReducer(reducer, initialState, init)
	return (
		<div>
			<p>{state.number}</p>
			<button
				onClick={() => {
					dispatch({ type: 'ADD' })
				}}
			>
				+
			</button>
			<p>{count}</p>

			<button
				onClick={() => {
					setCount(count + 1)
				}}
			>
				+count
			</button>
		</div>
	)
}
function render() {
	hookIndex = 0
	ReactDOM.render(<Counter />, document.getElementById('root'))
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
