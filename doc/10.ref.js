import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')

/**
 *如果我们想在react获取到真实dom元素的话
 *1.ref如果我们给input增加ref属性，值是一个字符串，this.refs.a=次input转真实dom之后真实dom元素 废弃
 * **/

class Sum extends React.Component {
	constructor(props) {
		super(props)
		this.a = React.createRef()
		this.b = React.createRef()
		this.result = React.createRef()
	}
	add = (event) => {
		let aValue = this.a.current.valuex
		let bValue = this.b.current.value
		this.result.current.value = +aValue + +bValue
	}
	render() {
		return (
			<div>
				<input ref={this.a} />+<input ref={this.b} />
				<button onClick={this.add}>=</button>
				<input ref={this.result} />
			</div>
		)
	}
}

ReactDom.render(<Sum />, root)
