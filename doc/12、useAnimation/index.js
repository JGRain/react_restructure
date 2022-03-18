import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
/**
 * 如何使用hooks做动画
 *
 */
function useAnimation(baseClassName) {
	let [className, setClassName] = useState(baseClassName)
	let [stage, setStage] = useState('initial')
	function start() {
		setStage('bigger')
		// setClassName(`${baseClassName} circle-bigger`)
	}
	useEffect(() => {
		if (stage === 'bigger') {
			setClassName(`${baseClassName} ${baseClassName}-bigger`)
			setTimeout(() => {
				setStage('initial')
			}, 500)
		} else {
			setClassName(`${baseClassName}`)
			setTimeout(() => {
				setStage('bigger')
			}, 500)
		}
	}, [stage])
	return [className, start]
}
function App() {
	let [className, start] = useAnimation('circle')
	return (
		<div>
			<button onClick={start}>开始动画</button>
			<div className={className}></div>
		</div>
	)
}
function render() {
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
