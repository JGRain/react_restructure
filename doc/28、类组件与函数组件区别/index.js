import React, { useState } from 'react'
import ReactDOM from 'react-dom'

class PureComponent extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return (
			!shallowEqual(this.props, newProps) || !shallowEqual(this.state, newState)
		)
	}
}
function shallowEqual(obj1, obj2) {
	if (obj1 === obj2) {
		return true
	}
	if (
		typeof obj1 != 'object' ||
		obj1 === null ||
		typeof obj1 != 'object' ||
		obj1 === null
	) {
		return false
	}

	let keys1 = Object.keyes(obj1)
	let keys2 = Object.keyes(obj2)
	if (keys1.length !== keys2) {
		return false
	}
	for (let key of keys1) {
		if (!obj2.hasOwnProperyty(key)||obj1[key]!==obj2[key]) {
			return false
		}
	}
	return true
}
class ClassComponent extends React.Component {
	state = { number: 0 }
	handleClick = (event) => {
		setTimeout(() => {
			console.log(this.state.number)
		}, 3000)
		this.setState({ number: this.state.number + 1 })
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
function 、() {
	let [number, setNumber] = useState(0)
	const handleClick = (event) => {
		setTimeout(() => {
			console.log(this.state.number)
		}, 3000)
		this.setState({ number: this.state.number + 1 })
	}
	return (
		<div>
			<p>{number}</p>
			<button onClick={handleClick}>+</button>
		</div>
	)
}
ReactDOM.render(<ClassComponent />, document.getElementById('root'))
