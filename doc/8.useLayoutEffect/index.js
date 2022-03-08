import React from 'react'
import ReactDOM from 'react-dom'

let hookStates = []
let hookIndex = 0

function useLayoutEffect(callback, deps) {
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
			queueMicrotask(() => {
				let destroy = callback()
				state.destroy = destroy
			})
		}
	} else {
		// let lastDeps = hookStates[hookIndex] //先获取上一次的一览数组
		let state = { lastDps: deps }
    hookStates[hookIndex++] = state
    // 添加一个微任务
    // Promise.resolve().then(()=>{})
		queueMicrotask(() => {
			let destroy = callback()
			state.destroy = destroy
		}) // 永宏任务实现，保证callback是在本次页面渲染结束之后执行的
	}
}
const Animation = () => {
	let divRef = React.useRef()
	useLayoutEffect(() => {
		divRef.current.style.transform = 'translate(500px)'
		divRef.current.style.transition = 'all 500ms'
	})
	let style = {
		width: '100px',
		height: '100px',
		background: 'red',
	}
	return <div style={style} ref={divRef}></div>
}
function render() {
	hookIndex = 0
	ReactDOM.render(
		<>
			<Animation />
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
