import React from 'react'
import ReactDOM from 'react-dom'

const CounterContext = React.createContext()
let hookStates = []
let hookIndex = 0

function useContext(context) {
	return context._currentValue
}

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
	const { state, dispatch } = useContext(CounterContext)
	const [count, setCount] = useState(0)
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

function App() {
	let [state, dispatch] = useReducer(reducer, initialState, init)
	let value = { state, dispatch }
	return (
		<CounterContext.Provider value={value}>
			<Counter />
		</CounterContext.Provider>
	)
}
function render() {
	hookIndex = 0
	ReactDOM.render(<App />, document.getElementById('root'))
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
