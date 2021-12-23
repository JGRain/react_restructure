import React from 'react'
import ReactDom from 'react-dom'
let root = document.getElementById('root')

/**
 * 当你在事件处理函数中执行setState,组件并不会立即渲染，而是先把更新存起来，等事件处理函数执行完之后在批量更新
 * setState 第一个参数可能是一个对象，对象直接覆盖，也可能是一个函数，函数是基于上一次更新状态计算出下一次状态，
 *
 * 1.在事件处理函数中或生命周期函数中批量更新  异步的
 * 2.在其他地方都是同步更新的，比如说setTimeout
 * 3.要谨慎处理this问题
 *  1.用剪头函数 首选方案
 *  2.如果不实用剪头函数，普通函数的this=underfined,可以在render使用匿名函数
 *  3.使用bind 可以在构造函数中重新this.handleClick,绑死this指针
 *  4.如果要传参数，只能使用匿名函数
 *
 *
 * **/

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = { name: 'zhufeng', number: 0 }
		// this.hansdleClick = this.handleClick.bing(this)
	}
	handerClick = (amount) => {
		this.setState(
			{
				number: this.state.number + amount,
			},
			() => {
				console.log(this.state.number) // 0
			}
		)
		this.setState(
			(state) => ({
				number: state.number + 1,
			}),
			() => {
				console.log(this.state.number) // 0
			}
		)
	}
	render() {
		return (
			<div>
				<p>{this.state.name}</p>
				<p>{this.state.number}</p>
				<button onClick={() => this.handerClick(2)}>+</button>
			</div>
		)
	}
}

ReactDom.render(<Counter name="123" />, root)
