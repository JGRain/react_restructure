import React from 'react'
import ReactDom from 'react-dom'
let root = document.getElementById('root')

/**
 * 属性是外部传入的，不能更改，类组件和函数组件都有属性
 * 状态是内部产生的，可以改 状态只能用在类组件
 * 唯一能给this.state赋值的地方就是构造函数，只能初始值，其他地方要想改变状态只能使用setState()方法
 * 每当你调用setState方法时候都会引起组件的刷新，组件会重新调用render方法，得到新的虚拟dom,进行dom更新
 *
 * **/

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = { number: 0 }
	}
	handerClick = () => {
		this.setState({
			number: this.state.number + 1,
		})
		this.setState({
			number: this.state.number + 1,
		})
	}
	render() {
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={this.handerClick}>+</button>
			</div>
		)
	}
}

ReactDom.render(<Counter name="123" />, root)
