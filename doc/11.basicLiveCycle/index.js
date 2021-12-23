import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')

class Counter extends React.Component {
	static defaultProps = { name: 'zhufeng' } // 默认属性
	constructor(props) {
		super(props)
		this.state = {
			number: 0,
		}
		console.log('counter 1.set up props and state')
	}
	componentWillMount() {
		console.log('counter 2.componentWillMount')
	}
	handleClick = (event) => {
		this.setState({
			number: this.state.number + 1,
		})
	}
	render() {
		console.log('counter 3.render')
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
	componentDidMount() {
		console.log('counter 4.componentDidMount')
	}
	shouldComponentUpdate(nexProps, nexState) {
		console.log('counter 5.shouldComponentUpdate')
		return nexState.number % 2 === 0 // 如果是偶数就更新  奇数不更新
	}
	componentWillUpdate() {
		console.log('counter 6.componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('counter 7.componentDidUpdate')
	}
}

ReactDom.render(<Counter />, root)

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
