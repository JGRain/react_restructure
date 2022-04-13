import React from 'react'
import { Component } from './ReactBaseClasses'

export class Counter extends Component {
	state = { number: 0 }
	handleClick = (event) => {
		// this.setState({ number: this.state.number + 1 }, () => {
		// 	console.log('state1 callback', this.state.number)
		// })
		// console.log('state1', this.state.number)
		// this.setState({ number: this.state.number + 1 }, () => {
		// 	console.log('state2 callback', this.state.number)
		// })
		// console.log('state2', this.state.number)
		setTimeout(() => {
			// 在同步模式下，如果setTimeout是同步的，需要在unstable_batchedUpdates执行异步
			// 在并发模式下，在setTimeout天然就是异步的

			// ReactDom.unstable_batchedUpdates(() => {
			this.setState({ number: this.state.number + 1 })
			console.log('state1', this.state.number)
			this.setState({ number: this.state.number + 1 })
			console.log('state2', this.state.number)
			// })
		}, 0)
	}
	render() {
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}
