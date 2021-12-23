import React from 'react'
import ReactDom from 'react-dom'
let root = document.getElementById('root')

class Counter extends React.Component {
	static defaultProps = { name: 'zhufeng' } // 默认属性
	constructor(props) {
		super(props)
		this.state = {
			number: 0,
		}
		console.log('父组件 1.set up props and state')
	}
	componentWillMount() {
		console.log('父组件 2.componentWillMount')
	}
	handleClick = (event) => {
		this.setState({
			number: this.state.number + 1,
		})
	}
	render() {
		console.log('父组件 3.render')
		return (
			<div>
				<p>{this.state.number}</p>
				{this.state.number === 4 ? null : (
					<ChildCounter count={this.state.number} />
				)}
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
	componentDidMount() {
		console.log('父组件 4.componentDidMount')
	}
	shouldComponentUpdate(nexProps, nexState) {
		console.log('父组件 5.shouldComponentUpdate')
		return nexState.number % 2 === 0 // 如果是偶数就更新  奇数不更新
	}
	componentWillUpdate() {
		console.log('父组件 6.componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('父组件 7.componentDidUpdate')
	}
}

class ChildCounter extends React.Component {
	componentWillMount() {
		console.log('子组件 1.componentWillMount')
	}
	render() {
		console.log('子组件 2.render')
		return (
			<div>
				<p>{this.props.count}</p>
			</div>
		)
	}
	componentDidMount() {
		console.log('子组件 3.componentDidMount')
	}
	componentWillUpdate() {
		console.log('子组件 4.componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('子组件 5.componentDidUpdate')
	}
	componentWillReceiveProps() {
		console.log('子组件 6.componentWillReceiveProps')
	}
	componentWillUnmount() {
		console.log('子组件 7.componentWillUnmount')
	}
}
// element 是一个虚拟dom或者是一个react元素
let element = <Counter />

class Demo extends React.Component {
	constructor() {
		super()
		this.state = { number: 0 }
	}
	render() {
		let element
		if (this.state.number > 1) {
			element = null
		} else {
			element = <span>{this.state.number}</span>
		}
		return element
	}
}
ReactDom.render(element, root)

/**
counter 1.set up props and state
counter 2.componentWillMount
counter 3.render
counter 4.componentDidMount
counter 5.shouldComponentUpdate
counter 5.shouldComponentUpdate
counter 6.componentWillUpdate
counter 3.render
counter 7.componentDidUpdate
 * **/
