import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')

/**
 * 1.如何绑定事件
 * 2.如何实现组件更新
 * 3.如何实现组件的异步更新
 *
 * **/

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = { number: 0 }
	}
	// event 是事件对象，但他并不是DOM原生的，而是react封装的
	handerClick = (event) => {
		// console.log(event)
		// event.persist() // 把这个event进行持久化
		// setTimeout(() => {
		// 	console.log(event)
		// })
		this.setState({
			number: this.state.number + 1,
		})
		console.log(this.state.number)
		this.setState({
			number: this.state.number + 1,
		})

		console.log(this.state.number)

		// setTimeout(() => {

		// 	this.setState({
		// 		number: this.state.number + 1,
		// 	})
		// 	console.log(this.state.number)
		// 	this.setState({
		// 		number: this.state.number + 1,
		// 	})
		// 	console.log(this.state.number)
		// })
	}
	clickDiv() {
		console.log('clickDiv')
	}
	render() {
		return (
			<div onClick={this.clickDiv}>
				<p>{this.state.number}</p>
				<button onClick={this.handerClick}>+</button>
			</div>
		)
	}
}

ReactDom.render(<Counter />, root)
