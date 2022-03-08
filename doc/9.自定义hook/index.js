import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

/**
 *React Hook "useState" is called in function "geteNumber" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter.
 *
 * @param {*} init
 * @returns
 */
function useNumber(init) {
	let [number, setNumber] = useState(init || 0)
	let timer = null
	useEffect(() => {
		timer = setInterval(() => {
			setNumber((number) => number + 1)
		}, 2000)
		return () => {
			clearInterval(timer)
		}
	})
	return [number, (num = 1) => setNumber((x) => x + num)]
}
function Timer() {
	let [number, add] = useNumber(1)
	return (
		<div>
			<p>{number}</p>
			<button onClick={() => add(2)}>+</button>
		</div>
	)
}
function Timer2() {
	let [number, add] = useNumber(10)
	return (
		<div>
			<p>{number}</p>
			<button onClick={() => add(10)}>+</button>
		</div>
	)
}
function render() {
	ReactDOM.render(
		<>
			<Timer />
			<Timer2 />
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
