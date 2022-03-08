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

function FunctionChild(props, ref) {
	// 当这个虚拟的input组件再挂在到页面中之后会给ref.current=真实dom
	// 我希望可以空值上级组建的操作
	let inputRef = React.useRef()
	useImperativeHandle(ref, () => ({
		focus() {
			inputRef.current.focus()
		},
	}))
	return <input ref={inputRef} />
}

class ClassChild extends React.Component {
	render() {
		return <input />
	}
}
function useImperativeHandle(ref, fatcory) {
	ref.current = fatcory()
}
function forwardRef(FunctionChild) {
	return class extends React.Component {
		render() {
      console.log(this)
      // element { type,props,ref,key}
      // ref是一个特殊属性，不能直接转用,是一个内部保持的变量
			return FunctionChild(this.props, this.props.ref2)
		}
	}
}

const ForwardFunctionChild = forwardRef(FunctionChild)
function Parent() {
	let [number, setnumber] = useState(1)
	let classChildRef = useRef()
	let childRef = useRef()
	const getFocus = () => {
		childRef.current.focus()
	}
	return (
		<div>
			<ForwardFunctionChild ref2={childRef} />
			<ClassChild ref={classChildRef} />
			<p>number:{number}</p>
			<button
				onClick={() => {
					setnumber(number + 1)
				}}
			>
				+
			</button>
			<button onClick={getFocus}>获得焦点</button>
			<button onClick={getFocus}>获得焦点2</button>
		</div>
	)
}
function render() {
	hookIndex = 0
	ReactDOM.render(
		<>
			<Parent />
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
