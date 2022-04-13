import React from 'react'
import { NoMode, ConcurrentMode } from './ReactTypeOfMode'
import { ClassComponent, HostRoot, HostComponent } from './ReactWorkTags'
import { Component } from './ReactBaseClasses'
import { batchUpdates } from './ReactFiberWorkLoop'

class Counter extends Component {
	state = { number: 0 }
	handleClick = (event) => {
		this.setState({ number: this.state.number + 1 })
		console.log('state1', this.state.number)
		this.setState({ number: this.state.number + 1 })
		console.log('state2', this.state.number)
		setTimeout(() => {
			// 在同步模式下，如果setTimeout是同步的，需要在unstable_batchedUpdates执行异步
			// 在并发模式下，在setTimeout天然就是异步的

			// ReactDom.unstable_batchedUpdates(() => {
			this.setState({ number: this.state.number + 1 })
			console.log('state1 异步', this.state.number)
			this.setState({ number: this.state.number + 1 })
			console.log('state2 异步', this.state.number)
			// })·
		}, 0)
	}
	render() {
		console.log(this.state)
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}

// ReactDOM.render(<Counter />, document.getElementById('root'))
let counterInstance = new Counter()
let mode = NoMode // 先把模式调成异步模式，或者说并发模式
// 根fiber的模式会影响所有元素
// 每个Fiber会有一个updateQueue代表更新队列，源码里是一个链表
let rootFiber = {
	tag: HostRoot,
	updateQueue: [],
	mode,
}
let counterFiber = {
	tag: ClassComponent,
	updateQueue: [],
	mode,
}
// fiber的stateNode指向类的实例
counterFiber.stateNode = counterInstance
// _reactInternal指向组件对应的fiber
counterInstance._reactInternal = counterFiber
// rootFiber的第一个儿子或者说大儿子是counterFiber
rootFiber.child = counterFiber

counterFiber.return = rootFiber

// 合成事件 React17以后事件是委托给容器了
document.addEventListener('click', (event) => {
	debugger
	let syntheticEvent = { nativeEvent: event } // 根据原生事件创建合成事件
	// 源码里先通过事件，周到事件源，再通过事件源找到对应处理函数
	// counterInstance.handleClick(syntheticEvent)
	batchUpdates(() => counterInstance.handleClick(syntheticEvent))
})

/** *
 * 开发版本还没上市
 * 1\并发模式，setState 会合并 00 11 不管在哪里，更新都会合并，通过更新优先级合并的
 * 是现在稳定版本
 * 2、同步模式下 如果1用了batchUpdates就会批量更新，不用就是同步更新
 * 为什么在事件函数或者声明周期函数中是批量的呢 是因为batchUpdates
 *
 * */
