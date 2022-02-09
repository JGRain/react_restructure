import React from 'react'
import ReactDOM from 'react-dom'

let hookStates = []
let hookIndex = 0

function useState(initalState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initalState
	let currentIndex = hookIndex
	function setState(newState) {
		hookStates[currentIndex] = newState
		render()
	}
	return [hookStates[hookIndex++], setState]
}

function useMemo(factory, deps) {
	if (hookStates[hookIndex]) {
		let [lastMemo, lastDeps] = hookStates[hookIndex]
		let same = deps.every((item, index) => item === lastDeps[index])
		if (same) {
			hookIndex++
			return lastMemo
		} else {
			let newMeno = factory()
			hookStates[hookIndex++] = [newMeno, deps]
			return newMeno
		}
	} else {
		//如果取不到
		let newMeno = factory()
		hookStates[hookIndex++] = [newMeno, deps]
		return newMeno
	}
}

function useCallback(callback, deps) {
	if (hookStates[hookIndex]) {
		let [lastCallback, lastDeps] = hookStates[hookIndex]
		let same = deps.every((item, index) => item === lastDeps[index])
		if (same) {
			hookIndex++
			return lastCallback
		} else {
			hookStates[hookIndex++] = [callback, deps]
			return callback
		}
	} else {
		//如果取不到
		hookStates[hookIndex++] = [callback, deps]
		return callback
	}
}

function memo(OldComponent) {
	return class extends React.PureComponent {
		render() {
			return <OldComponent {...this.props} />
		}
	}
}

/**
 * useCallback
 * useMemo
 *
 *
 */
let Child = ({ data, handleClick }) => {
	console.log('Child render')
	return <button onClick={handleClick}>{data.number}</button>
}

Child = memo(Child)
function App() {
	console.log('App render')
	const [number, setNumber] = useState(0)

	let data = useMemo(
		() => ({
			number,
		}),
		[number]
	)

	let handleClick = useCallback(() => {
		setNumber((x) => x + 1)
	}, [number])

	const [name, setName] = useState('zhufeng')

	return (
		<div>
			<input
				value={name}
				onChange={(e) => {
					setName(e.target.value)
				}}
			/>
			<Child data={data} handleClick={handleClick} />
		</div>
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
