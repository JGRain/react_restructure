import React from 'react'
import ReactDOM from 'react-dom'

import Scroll from './ScrollLoadSimple'

// import './App.css'

const domNum = 20

const App = () => {
	return (
		<div className="app">
			{Array.from({ length: domNum }, (text, index) => (
				<Scroll text={`第${index + 1}个元素`} key={index} />
			))}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
