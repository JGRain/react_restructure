import React, { useState } from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
	state = { list: new Array(10).fill(0) }
	onClick = () => {
		this.setState({ list: [...this.state.list, 1] })
	}
	render() {
		return (
			<ul>
				<input />
				<button onClick={this.onClick}>add</button>
				{this.state.list.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		)
	}
}
// 同步的写法
ReactDOM.render(<App />, document.getElementById('root'))
// 同步的写法
// ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />)
