import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {
	state = { number: 0 }
	componentDidMount() {
		document.title = `你点击了${this.state.numer}次`
	}
	componentDidUpdate() {
		document.title = `你点击了${this.state.numer}次`
	}
	render() {
		return (
			<div>
				<p>{this.state.number}</p>
				<button
					onClick={() => {
						this.setState({ number: this.state.number + 1 })
					}}
				>
					number+
				</button>
			</div>
		)
	}
}

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

function useEffect(callback, deps) {
	// 会重新渲染
	if (hookStates[hookIndex]) {
		let { lastDps, destroy } = hookStates[hookIndex]
		let same = deps.every((item, index) => item === lastDps[index])
		if (same) {
			hookIndex++
		} else {
			if (destroy) destroy()
			let state = { lastDps: deps }
			hookStates[hookIndex++] = state
			setTimeout(() => {
				let destroy = callback()
				state.destroy = destroy
			})
		}
	} else {
		// let lastDeps = hookStates[hookIndex] //先获取上一次的一览数组
		let state = { lastDps: deps }
		hookStates[hookIndex++] = state
		setTimeout(() => {
			let destroy = callback()
			state.destroy = destroy
		}) // 永宏任务实现，保证callback是在本次页面渲染结束之后执行的
	}
}
function FunctionCOunter() {
	console.log('functionCounter render')
	let [number, setNumber] = useState(0)
	// useEffect 里函数会在每次挂在之后以及每次更新之后都会候执行
	useEffect(() => {
		// document.title = `你点击了${number}次`
		console.log('开启的定时器')
		let timer = setInterval(() => {
			setNumber(number + 1)
		}, 1000)
		return () => {
			// destoryFunction 清除副作用
			console.log('销毁老的定时器')
			clearInterval(timer)
		}
	}, [number]) // 【】表示依赖项永远不会变，所以回调函数置灰执行一次

	return (
		<div>
			<p>{number}</p>
			<button
				onClick={() => {
					setNumber(number + 1)
				}}
			>
				number+
			</button>
		</div>
	)
}
function render() {
	hookIndex = 0
	ReactDOM.render(
		<>
			<Counter />
			<br />
			<FunctionCOunter />
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
